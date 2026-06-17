import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "../../redux/api/chatApi";
import { useSocket } from "../../context/SocketContext";
import {
  Send,
  User,
  Loader2,
  ChevronLeft,
  Search,
  Edit,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  ChevronDown,
} from "lucide-react";

export default function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetUserId = searchParams.get("userId");

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const { socket, isConnected } = useSocket();

  const [activeConvId, setActiveConvId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const messagesEndRef = useRef(null);

  // Fetch data
  const {
    data: convData,
    refetch: refetchConvs,
    isLoading: isLoadingConvs,
    error: errorConvs,
  } = useGetConversationsQuery();
  const conversations = convData?.data || [];

  const { data: msgData, isLoading: isLoadingMsgs } = useGetMessagesQuery(
    { conversationId: activeConvId },
    { skip: !activeConvId },
  );

  // Initialize active conversation
  useEffect(() => {
    if (conversations.length > 0 && targetUserId) {
      // Find existing conversation with this user
      const existingConv = conversations.find((c) =>
        c.participants.some((p) => p._id === targetUserId),
      );
      if (existingConv) {
        setActiveConvId(existingConv._id);
      } else {
        // No conversation exists yet, UI will handle temporary state
        setActiveConvId(null);
      }
    }
  }, [conversations, targetUserId]);

  // Load messages into local state for real-time appending
  useEffect(() => {
    if (msgData?.data) {
      setLocalMessages(msgData.data);
      scrollToBottom();
    }
  }, [msgData]);

  // Socket Event Listeners
  useEffect(() => {
    if (!socket) return;

    // Join room when active conversation changes
    if (activeConvId) {
      socket.emit("join-conversation", { conversationId: activeConvId });
      socket.emit("mark-messages-read", { conversationId: activeConvId });
    }

    const handleNewMessage = (payload) => {
      if (payload.success && payload.data) {
        const newMsg = payload.data;
        if (newMsg.conversationId === activeConvId) {
          setLocalMessages((prev) => {
            if (prev.some((m) => m._id === newMsg._id)) return prev;
            return [...prev, newMsg];
          });
          scrollToBottom();
          socket.emit("mark-messages-read", { conversationId: activeConvId });
        }
        refetchConvs();
      }
    };

    const handleMessageSent = (payload) => {
      if (payload.success && payload.data?.data) {
        const newMsg = payload.data.data;

        // If this was the first message ever with this user
        if (!activeConvId) {
          setActiveConvId(newMsg.conversationId);
          // Remove userId from URL to clean up state
          searchParams.delete("userId");
          setSearchParams(searchParams);
        } else if (newMsg.conversationId === activeConvId) {
          setLocalMessages((prev) => {
            if (prev.some((m) => m._id === newMsg._id)) return prev;
            return [...prev, newMsg];
          });
          scrollToBottom();
        }
        refetchConvs();
        setMessageInput("");
      }
    };

    const handleNotification = () => {
      refetchConvs();
    };

    const handleUserTyping = ({ conversationId, userId }) => {
      if (
        conversationId === activeConvId &&
        userId !== (currentUser?.id || currentUser?._id)
      ) {
        setIsTyping(true);
      }
    };

    const handleUserStopTyping = ({ conversationId, userId }) => {
      if (
        conversationId === activeConvId &&
        userId !== (currentUser?.id || currentUser?._id)
      ) {
        setIsTyping(false);
      }
    };

    const handleMessagesRead = ({ conversationId, readByUserId }) => {
      if (
        conversationId === activeConvId &&
        readByUserId !== (currentUser?.id || currentUser?._id)
      ) {
        setLocalMessages((prev) =>
          prev.map((msg) => ({ ...msg, isRead: true })),
        );
      }
    };

    socket.on("new-message", handleNewMessage);
    socket.on("single-message-sent", handleMessageSent);
    socket.on("new-message-notification", handleNotification);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stop-typing", handleUserStopTyping);
    socket.on("messages-marked-read", handleMessagesRead);

    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("single-message-sent", handleMessageSent);
      socket.off("new-message-notification", handleNotification);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stop-typing", handleUserStopTyping);
      socket.off("messages-marked-read", handleMessagesRead);
    };
  }, [
    socket,
    activeConvId,
    refetchConvs,
    searchParams,
    setSearchParams,
    currentUser,
  ]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !socket) return;

    // Determine receiver
    let receiverId = targetUserId;
    if (activeConvId) {
      const activeConv = conversations.find((c) => c._id === activeConvId);
      const otherUser = activeConv?.participants.find(
        (p) => p._id !== (currentUser?.id || currentUser?._id),
      );
      receiverId = otherUser?._id;
    }

    if (!receiverId) return;

    socket.emit("single-chat-send-message", {
      receiverId,
      text: messageInput.trim(),
    });

    // Clear input and emit stop typing
    setMessageInput("");
    socket.emit("stop-typing", {
      conversationId: activeConvId,
      userId: currentUser?.id || currentUser?._id,
    });
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);

    if (socket && activeConvId) {
      socket.emit("typing", {
        conversationId: activeConvId,
        userId: currentUser?.id || currentUser?._id,
      });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stop-typing", {
          conversationId: activeConvId,
          userId: currentUser?.id || currentUser?._id,
        });
      }, 2000);
    }
  };

  // Determine active partner details for header
  let activePartner = null;
  if (activeConvId) {
    const activeConv = conversations.find((c) => c._id === activeConvId);
    activePartner = activeConv?.participants.find(
      (p) => p._id !== (currentUser?.id || currentUser?._id),
    );
  } else if (targetUserId) {
    activePartner = { _id: targetUserId, userName: "New Conversation" };
  }

  return (
    <div className="fixed inset-0 top-[80px] md:top-[104px] flex bg-[#FAF9F5] overflow-hidden z-40 font-sans md:p-6 md:gap-6">
      {/* Sidebar: Floating Cards Layout */}
      <div
        className={`w-full md:w-[320px] flex-col h-full flex-shrink-0 md:gap-4 ${activeConvId ? "hidden md:flex" : "flex"}`}
      >
        {/* Search Card */}
        <div className="bg-white md:rounded-[20px] md:shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-2 border-b border-gray-100 md:border-none">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent py-2.5 pl-12 pr-4 text-[15px] text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* People Card */}
        <div className="bg-white md:rounded-[24px] md:shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] flex-1 overflow-hidden flex flex-col pt-3 md:pt-5">
          <h2 className="text-[18px] font-bold text-gray-900 tracking-tight px-4 md:px-6 mb-2 md:mb-3">
            People
          </h2>

          <div className="flex-1 overflow-y-auto px-1 md:px-2 pb-4">
            {conversations.map((conv) => {
              const partner = conv.participants.find(
                (p) => p._id !== (currentUser?.id || currentUser?._id),
              );
              if (!partner) return null;

              const isUnread =
                conv.unreadCount > 0 &&
                conv.lastMessage?.senderId !==
                  (currentUser?.id || currentUser?._id);
              const isActive = activeConvId === conv._id;

              return (
                <div
                  key={conv._id}
                  onClick={() => {
                    setActiveConvId(conv._id);
                    searchParams.delete("userId");
                    setSearchParams(searchParams);
                  }}
                  className={`relative cursor-pointer transition-colors flex p-3 mx-2 rounded-2xl ${isActive ? "bg-gray-50" : "hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="relative flex-shrink-0">
                      {partner.image ? (
                        <img
                          src={
                            partner.image.startsWith("http")
                              ? partner.image
                              : `https://api.tableli.com${partner.image}`
                          }
                          alt={partner.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg">
                          {partner.userName ? (
                            partner.userName.charAt(0).toUpperCase()
                          ) : (
                            <User size={20} />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-[15px] font-semibold text-gray-900 truncate max-w-[150px] md:max-w-none">
                          {partner.userName || partner.name || "User"}
                        </h4>
                        {conv.lastMessage?.createdAt && (
                          <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">
                            {new Date(conv.lastMessage.createdAt)
                              .toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })
                              .toLowerCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] text-gray-500 truncate pr-2">
                          {conv.lastMessage?.text || "No messages yet"}
                        </p>
                        {isUnread && (
                          <div className="bg-[#4CAF50] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold flex-shrink-0">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoadingConvs && (
              <div className="p-8 text-center text-sm text-gray-400">
                <Loader2 className="animate-spin mx-auto mb-2" size={16} />{" "}
                Loading...
              </div>
            )}
            {errorConvs && (
              <div className="p-8 text-center text-xs text-red-500 break-words">
                Error loading conversations: {JSON.stringify(errorConvs)}
              </div>
            )}
            {!isLoadingConvs && !errorConvs && conversations.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-400">
                No active conversations.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Window Card */}
      <div
        className={`w-full md:flex-1 bg-white md:rounded-[24px] md:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden relative ${!activeConvId ? "hidden md:flex" : "flex"}`}
      >
        {activePartner ? (
          <>
            {/* Chat Header */}
            <div className="h-[72px] md:h-20 border-b border-gray-100 flex items-center px-4 md:px-6 bg-white z-10 flex-shrink-0">
              <button
                onClick={() => setActiveConvId(null)}
                className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    {activePartner.image ? (
                      <img
                        src={
                          activePartner.image.startsWith("http")
                            ? activePartner.image
                            : `https://api.tableli.com${activePartner.image}`
                        }
                        alt={activePartner.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg">
                        {activePartner.userName ? (
                          activePartner.userName.charAt(0).toUpperCase()
                        ) : (
                          <User size={20} />
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px]">
                      {activePartner.userName || activePartner.name || "User"}
                    </h3>
                    <div className="text-[12px] text-gray-400 mt-0.5">
                      Online - Last seen,{" "}
                      {new Date()
                        .toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .toLowerCase()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[#C1BE64]">
                  <button className="hover:opacity-80 transition-opacity">
                    <Phone size={20} />
                  </button>
                  <button className="hover:opacity-80 transition-opacity">
                    <Video size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors ml-2">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-12 py-6 md:py-8 flex flex-col gap-6 bg-white">
              {isLoadingMsgs && (
                <div className="text-center text-xs text-gray-400 mt-10 flex justify-center">
                  <Loader2 className="animate-spin" size={16} />
                </div>
              )}

              {!isLoadingMsgs &&
                localMessages.map((msg, idx) => {
                  const isMe =
                    msg.senderId === (currentUser?.id || currentUser?._id);
                  return (
                    <div
                      key={msg._id || idx}
                      className={`flex flex-col w-full ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-end gap-2 max-w-[85%] md:max-w-[75%] lg:max-w-[60%]">
                        {!isMe && (
                          <div className="hidden md:block w-2 h-2 rounded-full bg-gray-200 mb-4 flex-shrink-0" />
                        )}

                        <div
                          className={`px-5 py-3 md:px-6 md:py-3.5 text-[14px] md:text-[15px] rounded-[24px] shadow-sm ${isMe ? "bg-[#A39D35] text-white rounded-br-md" : "bg-[#F2F3F5] text-gray-800 rounded-bl-md"}`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {msg.text}
                          </p>
                        </div>

                        {isMe && (
                          <div className="hidden md:block w-2 h-2 rounded-full bg-[#D1CF89] mb-4 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-gray-400 text-[11px] font-medium mt-1.5 px-4">
                        Today,{" "}
                        {new Date(msg.createdAt)
                          .toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .toLowerCase()}
                      </div>
                    </div>
                  );
                })}

              {isTyping && (
                <div className="flex flex-col w-full items-start">
                  <div className="flex items-end gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-200 mb-4 flex-shrink-0" />
                    <div className="bg-[#F2F3F5] rounded-[24px] rounded-bl-md px-5 py-4 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}

              {!activeConvId && localMessages.length === 0 && (
                <div className="text-center mt-20">
                  <div className="w-16 h-16 bg-[#A39D35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-[#A39D35]" size={24} />
                  </div>
                  <h4 className="font-bold text-[18px] text-gray-900 mb-2">
                    Start the conversation
                  </h4>
                  <p className="text-[14px] text-gray-500">
                    Send a message to discuss event details.
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 lg:p-6 bg-white flex-shrink-0 border-t border-gray-100 md:border-none">
              <form
                onSubmit={sendMessage}
                className="flex gap-2 md:gap-3 items-center w-full"
              >
                <div className="relative flex-1 bg-[#F5F6F8] rounded-full flex items-center px-2 md:px-4 py-1">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                  >
                    <Paperclip
                      size={18}
                      className="w-5 h-5 md:w-auto md:h-auto"
                    />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none px-2 py-2 md:py-3 text-[14px] md:text-[15px] focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-500"
                  />
                  <div className="flex items-center gap-0 md:gap-1 text-gray-400">
                    <button
                      type="button"
                      className="hover:text-gray-600 transition-colors p-2"
                    >
                      <Smile
                        size={18}
                        className="w-5 h-5 md:w-auto md:h-auto"
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!messageInput.trim() || !isConnected}
                  className="bg-[#D3D086] hover:bg-[#A39D35] disabled:bg-gray-200 disabled:text-gray-400 text-white w-10 h-10 md:w-[52px] md:h-[52px] rounded-full md:rounded-[18px] transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
                >
                  {messageInput.trim() ? (
                    <Send
                      size={18}
                      fill="currentColor"
                      className="md:w-5 md:h-5"
                    />
                  ) : (
                    <Mic
                      size={18}
                      fill="currentColor"
                      className="md:w-5 md:h-5"
                    />
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white">
            <div className="w-24 h-24 bg-[#FAF9F5] rounded-full flex items-center justify-center mb-5">
              <User size={40} className="text-[#D3D086]" />
            </div>
            <p className="text-[16px] font-medium text-gray-500 tracking-wide">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
