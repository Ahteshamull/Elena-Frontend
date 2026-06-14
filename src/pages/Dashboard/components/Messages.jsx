import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Send, 
  Check, 
  Paperclip, 
  MoreVertical, 
  Sparkles,
  ChefHat,
  FileText,
  Download,
  Video,
  Volume2,
  VolumeX,
  Trash2,
  Mic,
  PhoneOff,
  MessageSquare,
  ChevronLeft,
  X
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import { useSocket } from '../../../context/SocketContext';
import { useGetConversationsQuery, useGetMessagesQuery } from '../../../redux/api/chatApi';

export default function Messages() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const { socket, isConnected } = useSocket();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialConvId = searchParams.get('convId');
  const [activeConvId, setActiveConvId] = useState(initialConvId || null);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const [attachedFile, setAttachedFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [toast, setToast] = useState(null);

  const { data: convData, refetch: refetchConvs } = useGetConversationsQuery();
  const conversations = convData?.data || [];

  const { data: msgData, isLoading: isLoadingMsgs, refetch: refetchMsgs } = useGetMessagesQuery(
    { conversationId: activeConvId },
    { skip: !activeConvId, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (activeConvId) {
      refetchMsgs();
    }
  }, [activeConvId, refetchMsgs]);

  useEffect(() => {
    if (msgData?.data) {
      setLocalMessages(msgData.data);
    }
  }, [msgData]);

  const scrollToBottom = (behavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: behavior
      });
    }
  };

  useEffect(() => {
    if (activeConvId) {
      scrollToBottom('smooth');
      // Clean up the URL when selecting a chat
      if (searchParams.has('convId')) {
        searchParams.delete('convId');
        setSearchParams(searchParams, { replace: true });
      }
    }
  }, [localMessages, isTyping, activeConvId]);

  useEffect(() => {
    if (!socket) return;

    if (activeConvId) {
      socket.emit("join-conversation", { conversationId: activeConvId });
      socket.emit("mark-messages-read", { conversationId: activeConvId });
    }

    const handleNewMessage = (response) => {
      if (response.success && response.data) {
        const newMsg = response.data;
        if (newMsg.conversationId === activeConvId) {
          setLocalMessages((prev) => [...prev, newMsg]);
          socket.emit("mark-messages-read", { conversationId: activeConvId });
        }
        refetchConvs();
      }
    };

    socket.on("new-message", handleNewMessage);
    
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, activeConvId, refetchConvs]);

  useEffect(() => {
    let interval;
    if (activeCall) {
      interval = setInterval(() => {
        setCallDuration(d => d + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  const formatDuration = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendMessage = (textToSend) => {
    if (!activeConvId) return;
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!socket || !isConnected) {
      showToast("Real-time connection not established.");
      return;
    }

    const conv = conversations.find(c => c._id === activeConvId);
    if (!conv) return;

    const currentUserId = String(currentUser?._id || currentUser?.id || "");
    const receiverId = conv.participants.find(p => String(p._id || p.id) !== currentUserId)?._id || conv.participants.find(p => String(p._id || p.id) !== currentUserId)?.id;

    socket.emit("single-chat-send-message", {
      receiverId,
      text: text,
      conversationId: activeConvId
    });

    if (!textToSend) {
      setInputText("");
    }
    
    // Optimistic update
    const tempMsg = {
      _id: Date.now().toString(),
      senderId: currentUser,
      text: text,
      createdAt: new Date().toISOString()
    };
    setLocalMessages(prev => [...prev, tempMsg]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const filteredChats = conversations.filter(conv => {
    const currentUserId = currentUser?._id || currentUser?.id;
    const participant = conv.participants.find(p => (p._id || p.id) !== currentUserId);
    const name = participant?.profile?.fullName || participant?.userName || participant?.name || "User";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  }).map(conv => {
    const currentUserId = currentUser?._id || currentUser?.id;
    const participant = conv.participants.find(p => (p._id || p.id) !== currentUserId) || conv.participants[0];
    const profile = participant?.profile || {};
    const name = profile.fullName || profile.displayName || participant?.userName || participant?.name || "User";
    const rawImage = profile.image || participant?.image;
    const image = rawImage 
        ? (rawImage.startsWith('http') ? rawImage : `http://localhost:8005${rawImage}`) 
        : "/b_1.png";

    // check unread count where reader array doesn't contain current user
    const unreadCount = conv.unreadCount || 0;

    return {
      id: conv._id,
      chefName: name,
      chefImage: image,
      specialty: profile.cuisineSpecialties?.[0] || profile.chefCategory?.[0] || (participant?.role === 'chef' ? 'Chef' : 'Client'),
      status: "online",
      unread: unreadCount,
      lastMsg: conv.lastMessage?.text || "No messages yet",
      time: new Date(conv.lastMessage?.createdAt || conv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date(conv.lastMessage?.createdAt || conv.createdAt).getTime()
    };
  }).sort((a, b) => b.timestamp - a.timestamp);

  const activeChat = filteredChats.find(c => c.id === activeConvId);

  const suggestions = [
    { label: "Dietary Needs", text: "I wanted to discuss dietary adjustments." },
    { label: "Arrival Schedule", text: "What time will you arrive to set up?" },
    { label: "Menu Options", text: "Could we review the menu options again?" }
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-serif text-primary-900 mb-1">Messages</h1>
        <p className="text-gray-500 text-sm">Coordinate menus, schedules, and logistics directly with your booked private chefs.</p>
      </div>

      <div className="h-[500px] md:h-[calc(100vh-14rem)] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">
        
        <div className={cn(
          "w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-white shrink-0 transition-all duration-300 h-full overflow-hidden",
          activeConvId !== null ? "hidden md:flex" : "flex"
        )}>
          
          <div className="p-5 border-b border-gray-50 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50/70 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary-900 focus:bg-white transition-all text-primary-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1 overscroll-contain">
            {filteredChats.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">No conversations found.</div>
            ) : (
              filteredChats.map((chat) => {
                const isActive = chat.id === activeConvId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveConvId(chat.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all relative group cursor-pointer",
                      isActive ? "bg-primary-900 text-white shadow-md shadow-black/5" : "hover:bg-gray-50 text-gray-900"
                    )}
                  >
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white shadow-sm bg-gray-100">
                        <img src={chat.chefImage} alt={chat.chefName} className="w-full h-full object-cover" />
                      </div>
                      {chat.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className={cn("font-bold text-sm truncate", isActive ? "text-white" : "text-primary-900")}>
                          {chat.chefName}
                        </h4>
                        <span className={cn("text-[10px]", isActive ? "text-gray-300" : "text-gray-400")}>
                          {chat.time}
                        </span>
                      </div>
                      <p className={cn("text-xs truncate font-light", isActive ? "text-gray-200" : "text-gray-500")}>
                        {chat.lastMsg}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {activeChat ? (
          <div className={cn(
            "flex-1 flex flex-col bg-gray-50/30 overflow-hidden relative transition-all duration-300 h-full",
            activeConvId === null ? "hidden md:flex" : "flex"
          )}>
          
          <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex justify-between items-center z-10 shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setActiveConvId(null)}
                className="md:hidden p-2 -ml-2 rounded-xl text-gray-400 hover:text-primary-900 hover:bg-gray-50 transition-all cursor-pointer mr-1"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                  <img src={activeChat.chefImage} alt={activeChat.chefName} className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg text-primary-900 leading-none">{activeChat.chefName}</h3>
                <span className="text-[11px] text-gray-500 font-light mt-1 block">
                  {activeChat.specialty}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-primary-900 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <MoreVertical size={18} />
              </button>
              
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                  <div className="absolute right-0 top-11 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button className="w-full text-left px-4 py-2.5 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 text-xs font-semibold text-red-500 transition-all cursor-pointer border-t border-gray-50 mt-1 pt-2">
                      <Trash2 size={14} className="text-red-400" />
                      Clear Chat History
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 overscroll-contain">
            {isLoadingMsgs ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400 font-light text-xs gap-3">
                Loading messages...
              </div>
            ) : localMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400 font-light text-xs gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent/50 border border-accent/10">
                  <MessageSquare size={20} />
                </div>
                <span>No messages yet. Send a note below to start planning!</span>
              </div>
            ) : (
              localMessages.map((msg) => {
                const currentUserId = String(currentUser?._id || currentUser?.id || "");
                const msgSenderId = String(msg.senderId?._id || msg.senderId?.id || msg.senderId || "");
                const isMe = msgSenderId === currentUserId;
                
                return (
                  <div 
                    key={msg._id}
                    className={cn(
                      "flex items-end gap-3 max-w-[80%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                      isMe ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    {!isMe && (
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100 shadow-sm border border-white">
                        <img src={activeChat.chefImage} alt={activeChat.chefName} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      {msg.text && (
                        <div 
                          className={cn(
                            "px-5 py-3.5 rounded-[1.5rem] text-sm leading-relaxed",
                            !isMe 
                              ? "bg-white text-gray-700 border border-gray-100 rounded-bl-sm shadow-sm" 
                              : "bg-primary-900 text-white rounded-br-sm"
                          )}
                        >
                          {msg.text}
                        </div>
                      )}
                      <div className={cn("text-[10px] text-gray-400 flex items-center gap-1 font-light", !isMe ? "pl-2" : "justify-end pr-2")}>
                        <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMe && <Check size={12} className="text-accent" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

          </div>

          <div className="bg-white border-t border-gray-100 p-5 shrink-0 z-10">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-1">
              <Sparkles size={14} className="text-[#D4AF37] shrink-0" />
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider shrink-0 mr-1">Quick Inquire:</span>
              {suggestions.map((sug) => (
                <button
                  key={sug.label}
                  onClick={() => handleSendMessage(sug.text)}
                  className="bg-gray-50 border border-gray-100 hover:border-accent hover:bg-accent/5 hover:text-primary-900 transition-all rounded-full px-4 py-1.5 text-xs text-gray-500 font-semibold cursor-pointer shrink-0"
                >
                  {sug.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-3 bg-gray-50/70 border border-gray-100 rounded-2xl px-3 md:px-4 py-1.5 md:py-2 focus-within:bg-white focus-within:border-primary-900 transition-all">
              <input 
                type="text" 
                placeholder={`Message ${activeChat.chefName}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-primary-900 placeholder:text-gray-400 focus:ring-0 p-0 text-sm"
              />

              <button 
                onClick={() => handleSendMessage()}
                className="p-2 text-accent hover:text-[#B89020] hover:scale-110 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center justify-center"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
          <div className={cn(
            "flex-1 flex flex-col items-center justify-center bg-gray-50/10 p-8 text-center select-none animate-in fade-in duration-500",
            activeConvId === null ? "hidden md:flex" : "flex"
          )}>
            <div className="w-20 h-20 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center mb-6 shadow-sm shadow-accent/5">
              <ChefHat size={36} className="text-accent animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl text-primary-900 mb-2">Your Conversations</h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-light">
              Select a conversation from the left sidebar to coordinate menus, schedule timings, and plan an unforgettable dining experience.
            </p>
          </div>
        )}

      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary-900 border border-white/10 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-[110] animate-in slide-in-from-bottom-5 duration-300">
          <Sparkles size={16} className="text-accent" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

    </div>
  );
}
