import React, { useState, useRef, useEffect } from 'react';
import { 
  Search,
  MoreVertical,
  Paperclip,
  Send,
  X,
  FileText,
  Download,
  Phone,
  Video,
  User,
  Volume2,
  VolumeX,
  Trash2,
  Mic,
  PhoneOff,
  MessageSquare,
  ChevronLeft,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

// Mock chat channels based on our clients who booked this chef
const initialChats = [
  {
    id: 1,
    clientName: "Tanvir Ahammed",
    clientImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    event: "Mediterranean Odyssey",
    status: "online",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 15, // 15 minutes ago
    booking: {
      menu: "Mediterranean Odyssey Feast",
      date: "May 20, 2026",
      guests: "4 Guests",
      price: "$1,200",
      location: "Downtown Penthouse, CA",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 2,
    clientName: "Sarah Johnson",
    clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    event: "Anniversary Dinner",
    status: "online",
    unread: 0,
    rating: "4.8",
    lastActivity: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    booking: {
      menu: "Provence Summer Banquet",
      date: "May 24, 2026",
      guests: "6 Guests",
      price: "$850",
      location: "Malibu Beachfront, CA",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 3,
    clientName: "Michael Chen",
    clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    event: "Corporate Lunch",
    status: "offline",
    unread: 0,
    rating: "5.0",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    booking: {
      menu: "Artisan Deli & Grazing Boards",
      date: "May 28, 2026",
      guests: "12 Guests",
      price: "$1,200",
      location: "Santa Monica Office, CA",
      status: "Pending"
    },
    messages: []
  },
  {
    id: 4,
    clientName: "Emma Watson",
    clientImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100",
    event: "Private Garden Party",
    status: "offline",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 4, // 4 days ago
    booking: {
      menu: "Grand Garden Degustation",
      date: "April 12, 2026",
      guests: "15 Guests",
      price: "$2,100",
      location: "Beverly Hills Residence, CA",
      status: "Completed"
    },
    messages: []
  },
  {
    id: 5,
    clientName: "Marcus Vance",
    clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    event: "Corporate Banquet",
    status: "online",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    booking: {
      menu: "French Riviera Tasting Menu",
      date: "May 30, 2026",
      guests: "20 Guests",
      price: "$3,500",
      location: "Beverly Hills Office Plaza, CA",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 6,
    clientName: "Olivia Henderson",
    clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    event: "Micro-Wedding Dinner",
    status: "online",
    unread: 0,
    rating: "5.0",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
    booking: {
      menu: "Symphony of Seafood",
      date: "Jun 15, 2026",
      guests: "30 Guests",
      price: "$6,200",
      location: "Santa Barbara Clifftop, CA",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 7,
    clientName: "David Miller",
    clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    event: "Father's Day Brunch",
    status: "offline",
    unread: 0,
    rating: "4.8",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    booking: {
      menu: "Steakhouse Classic Brunch",
      date: "Jun 21, 2026",
      guests: "10 Guests",
      price: "$1,500",
      location: "Pasadena Garden, CA",
      status: "Pending"
    },
    messages: []
  },
  {
    id: 8,
    clientName: "Sophia Martinez",
    clientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    event: "High Tea Celebration",
    status: "online",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 14, // 14 days ago
    booking: {
      menu: "Traditional British High Tea",
      date: "Jul 04, 2026",
      guests: "8 Guests",
      price: "$1,100",
      location: "Malibu Terraces, CA",
      status: "Confirmed"
    },
    messages: []
  }
];

// Contextual automated client replies
const autoReplies = {
  dietary: "That is fantastic! Thank you so much for accommodating our dietary needs. I really appreciate your flexibility. Please let me know if there's any kitchen tool or platter I should have ready for you!",
  schedule: "That schedule sounds perfect for us. We'll make sure the kitchen prep area and range are completely cleared, polished, and ready for you to take over by 5:00 PM!",
  menu: "Oh, that menu proposal looks divine! The wine pairings are an absolute dream. I will order those exact bottles from our local wine merchant tomorrow.",
  default: "Thank you for the update, Chef! I've noted this and everything looks perfect. Really looking forward to having you cook for us soon!"
};

export default function ChefMessages() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const activeChat = chats.find(c => c.id === activeChatId);

  const [attachedFile, setAttachedFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Scroll to bottom of the chat list
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeChat?.messages?.length, isTyping]);

  // Handle Calling Duration Timer
  useEffect(() => {
    let interval;
    if (activeCall && activeCall.status === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const triggerCall = (type) => {
    if (!activeChat) return;
    setIsMenuOpen(false);
    setActiveCall({
      type: type,
      status: 'ringing',
      chefName: activeChat.clientName,
      chefImage: activeChat.clientImage
    });

    // Ring for 3 seconds then connect
    setTimeout(() => {
      setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null);
    }, 3000);
  };

  const endCall = () => {
    setActiveCall(null);
    showToast("Call ended");
  };

  const toggleMute = () => {
    if (!activeChat) return;
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChatId ? { ...chat, isMuted: !chat.isMuted } : chat
      )
    );
    setIsMenuOpen(false);
    showToast(activeChat.isMuted ? "Notifications unmuted" : "Notifications muted");
  };

  const clearHistory = () => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: [] } : chat
      )
    );
    setIsMenuOpen(false);
    showToast("Conversation history cleared");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    setAttachedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      isImage: isImage,
      url: isImage ? URL.createObjectURL(file) : null
    });
  };

  const handleSendMessage = (textToSend) => {
    if (activeChatId === null) return;
    const text = textToSend || inputText;
    if (!text.trim() && !attachedFile) return;

    // 1. Add chef message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now(),
      sender: 'chef',
      text: text,
      time: timestamp,
      date: 'Today',
      file: attachedFile ? { ...attachedFile } : null
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChatId 
          ? { 
              ...chat, 
              lastActivity: Date.now(),
              messages: [...chat.messages, newMessage] 
            }
          : chat
      )
    );

    const uploadedFileName = attachedFile ? attachedFile.name : null;
    setAttachedFile(null);

    if (!textToSend) {
      setInputText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const sortedChats = [...chats].sort((a, b) => b.lastActivity - a.lastActivity);

  const filteredChats = sortedChats.filter(chat => 
    chat.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Suggestion action pills for chef quick responses
  const suggestions = [
    { label: "Dietary Check", text: "Hello! Just double-checking if you have received the final menu layout. Let me know if there are any specific dietary requirements or food allergies." },
    { label: "Arrival Schedule", text: "Hi! I wanted to confirm that I will arrive precisely 2 hours before dinner service (around 5:00 PM) to set up and start the menu prep." },
    { label: "Wine Pairings", text: "I have curated some spectacular wine pairing suggestions for our courses. Would you like me to share the pairing options?" }
  ];

  return (
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Title Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-4xl font-serif text-primary-900 italic">Messages</h1>
        <p className="text-gray-500 font-medium text-sm md:text-base">Coordinate dinner menus, ingredient updates, and arrival timings with your booked clients.</p>
      </div>

      {/* Main Console Box */}
      <div className="h-[500px] md:h-[calc(100vh-16rem)] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">
        
        {/* Left Column: Clients list */}
        <div className={cn(
          "w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-white shrink-0 transition-all duration-300 h-full overflow-hidden",
          activeChatId !== null ? "hidden md:flex" : "flex"
        )}>
          
          {/* Search box */}
          <div className="p-5 border-b border-gray-50 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search clients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50/70 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary-900 focus:bg-white transition-all text-primary-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Clients Scrolling List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 overscroll-contain">
            {filteredChats.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">No client conversations found.</div>
            ) : (
              filteredChats.map((chat) => {
                const isActive = chat.id === activeChatId;
                const lastMsg = chat.messages[chat.messages.length - 1];
                return (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setActiveChatId(chat.id);
                      chat.unread = 0; // Clear unread locally
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all relative group cursor-pointer",
                      isActive 
                        ? "bg-primary-900 text-white shadow-md shadow-black/5" 
                        : "hover:bg-gray-50 text-gray-900"
                    )}
                  >
                    {/* Avatar Container */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white shadow-sm bg-gray-100">
                        <img src={chat.clientImage} alt={chat.clientName} className="w-full h-full object-cover" />
                      </div>
                      {chat.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>

                    {/* Chat Text Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className={cn("font-bold text-sm truncate", isActive ? "text-white" : "text-primary-900")}>
                          {chat.clientName}
                        </h4>
                        <span className={cn("text-[10px]", isActive ? "text-gray-300" : "text-gray-400")}>
                          {lastMsg ? lastMsg.time : ""}
                        </span>
                      </div>
                      <p className={cn("text-xs truncate font-light", isActive ? "text-gray-200" : "text-gray-500")}>
                        {lastMsg ? lastMsg.text : chat.event}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {chat.unread > 0 && (
                      <span className="shrink-0 bg-accent text-primary-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Center Column: Active Chat Feed */}
        {activeChat ? (
          <div className={cn(
            "flex-1 flex flex-col bg-gray-50/30 overflow-hidden relative transition-all duration-300 h-full",
            activeChatId === null ? "hidden md:flex" : "flex"
          )}>
          
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex justify-between items-center z-10 shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Back Button (Mobile Only) */}
              <button 
                onClick={() => setActiveChatId(null)}
                className="md:hidden p-2 -ml-2 rounded-xl text-gray-400 hover:text-primary-900 hover:bg-gray-50 transition-all cursor-pointer mr-1"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                  <img src={activeChat.clientImage} alt={activeChat.clientName} className="w-full h-full object-cover" />
                </div>
                {activeChat.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div>
                <h3 className="font-serif text-lg text-primary-900 leading-none">{activeChat.clientName}</h3>
                <span className="text-[11px] text-gray-500 font-light mt-1 block">
                  {activeChat.event} • {activeChat.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            {/* Actions */}
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
                    <button onClick={toggleMute} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-xs font-semibold text-gray-700 hover:text-primary-900 transition-all cursor-pointer">
                      {activeChat.isMuted ? (
                        <>
                          <Volume2 size={14} className="text-accent animate-pulse" />
                          Unmute Chat
                        </>
                      ) : (
                        <>
                          <VolumeX size={14} className="text-gray-400" />
                          Mute Notifications
                        </>
                      )}
                    </button>
                    <button onClick={clearHistory} className="w-full text-left px-4 py-2.5 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 text-xs font-semibold text-red-500 transition-all cursor-pointer border-t border-gray-50 mt-1 pt-2">
                      <Trash2 size={14} className="text-red-400" />
                      Clear Chat History
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Scrolling Messages Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 overscroll-contain">
            {activeChat.messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400 font-light text-xs gap-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent/50 border border-accent/10">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="font-semibold text-primary-900">No messages yet</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Start your premium chef-client communications below.</p>
                </div>
              </div>
            ) : (
              activeChat.messages.map((msg, index) => {
                const isChef = msg.sender === 'chef';
                return (
                  <div key={msg.id} className={cn("flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300", isChef ? "items-end" : "items-start")}>
                    <div className="flex items-end gap-2.5 max-w-[80%]">
                      {!isChef && (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shrink-0 mb-1">
                          <img src={activeChat.clientImage} alt={activeChat.clientName} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div className={cn(
                          "rounded-2xl px-4 py-3 text-sm shadow-sm select-text",
                          isChef 
                            ? "bg-primary-900 text-white rounded-br-none" 
                            : "bg-white text-gray-900 border border-gray-100 rounded-bl-none"
                        )}>
                          {msg.text}

                          {/* Render Attachment Inside Bubble */}
                          {msg.file && (
                            <div className={cn(
                              "mt-3 border rounded-xl overflow-hidden shadow-sm bg-white text-gray-900",
                              isChef ? "border-gray-800" : "border-gray-100"
                            )}>
                              {msg.file.isImage ? (
                                <div className="group relative w-56 h-36 bg-gray-50 overflow-hidden cursor-pointer">
                                  <img src={msg.file.url || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300"} alt="attachment" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                                  <a href={msg.file.url || "#"} download={msg.file.name} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold text-xs gap-1.5 transition-all duration-300">
                                    <Download size={14} /> Save Image
                                  </a>
                                </div>
                              ) : (
                                <div className="p-3 flex items-center gap-3 w-56">
                                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                    <FileText size={18} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-bold text-primary-900 truncate">{msg.file.name}</p>
                                    <p className="text-[9px] text-gray-400 font-light mt-0.5">{msg.file.size}</p>
                                  </div>
                                  <a href="#" download className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary-900 transition-colors shrink-0">
                                    <Download size={14} />
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] text-gray-400 font-light mt-1 px-1">{msg.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2.5 max-w-[80%] animate-in fade-in duration-300">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shrink-0 mb-1">
                  <img src={activeChat.clientImage} alt={activeChat.clientName} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5 h-10 w-16 justify-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-300" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-light mt-1 px-1">Typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom input area */}
          <div className="bg-white border-t border-gray-100 p-4 shrink-0">
            {/* Quick Action suggestions */}
            {activeChat.messages.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-1">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug.text)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full border border-gray-100 bg-gray-50 text-[10px] font-bold text-gray-500 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              {/* Hidden Native File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
              />

              {/* Attached file preview chip */}
              {attachedFile && (
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3 pr-4 mb-3 w-max animate-in slide-in-from-bottom-2 duration-300">
                  {attachedFile.isImage ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-white shrink-0">
                      <img src={attachedFile.url} alt="upload preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <FileText size={20} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-primary-900 truncate max-w-[150px]">{attachedFile.name}</p>
                    <p className="text-[10px] text-gray-400 font-light">{attachedFile.size}</p>
                  </div>
                  <button 
                    onClick={() => setAttachedFile(null)}
                    className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-red-500 transition-all cursor-pointer ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Input Bar panel */}
              <div className="flex items-center gap-2 md:gap-3 bg-gray-50/70 border border-gray-100 rounded-2xl px-3 md:px-4 py-1.5 md:py-2 focus-within:bg-white focus-within:border-primary-900 transition-all">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-primary-900 transition-all cursor-pointer hover:bg-gray-100 rounded-xl"
                >
                  <Paperclip size={18} />
                </button>
                
                <input 
                  type="text" 
                  placeholder={`Message ${activeChat.clientName}...`}
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
        </div>
      ) : (
          <div className={cn(
            "flex-1 flex flex-col items-center justify-center bg-gray-50/10 p-8 text-center select-none animate-in fade-in duration-500",
            activeChatId === null ? "hidden md:flex" : "flex"
          )}>
            <div className="w-20 h-20 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center mb-6 shadow-sm shadow-accent/5">
              <MessageSquare size={36} className="text-accent animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl text-primary-900 mb-2">Client Communications</h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-light">
              Select a client from the left sidebar to coordinate upcoming menus, check special dietary needs, and organize logistics for a flawless service.
            </p>
          </div>
        )}

      </div>

      {/* Profile Modal / Drawer (Client Details) */}
      {showProfileModal && activeChat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden border border-gray-100 shadow-2xl animate-in zoom-in-95 duration-300 relative max-h-[85vh] flex flex-col">
            <button 
              onClick={() => setShowProfileModal(false)}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary-900 transition-all cursor-pointer z-10"
            >
              <X size={18} />
            </button>

            {/* Profile Header banner */}
            <div className="bg-primary-900 p-8 pt-10 text-center relative shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary-800 to-primary-900 opacity-60" />
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent mx-auto mb-4 bg-gray-100 shadow-md">
                  <img src={activeChat.clientImage} alt={activeChat.clientName} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-serif text-2xl text-white italic leading-tight">{activeChat.clientName}</h4>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-0.5 rounded-full">
                    Client Partner • {activeChat.rating} ★
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6 overscroll-contain">
              {/* Event Details Card */}
              <div className="space-y-4">
                <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Active Reservation</h5>
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3.5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-primary-900">{activeChat.booking.menu}</span>
                    <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                      {activeChat.booking.status}
                    </span>
                  </div>

                  <div className="h-px bg-gray-200/50" />

                  <div className="grid grid-cols-2 gap-4 text-xs font-light text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-accent shrink-0" />
                      <span>{activeChat.booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-accent shrink-0" />
                      <span>{activeChat.booking.guests}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin size={14} className="text-accent shrink-0" />
                      <span className="truncate">{activeChat.booking.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences & Notes */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Client Preferences</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-3.5 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <span className="text-gray-500">Service Option</span>
                    <span className="font-semibold text-primary-900">Fine Dining Plated</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-3.5 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <span className="text-gray-500">Kitchen Requirements</span>
                    <span className="font-semibold text-primary-900">Induction Cooktop, Double Oven</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3 shrink-0">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowProfileModal(false);
                  triggerCall('voice');
                }}
                className="flex-1 rounded-xl h-11 border-gray-200 text-xs font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-white"
              >
                <Phone size={14} /> Call Client
              </Button>
              <Button 
                onClick={() => setShowProfileModal(false)}
                className="flex-1 bg-primary-900 text-white rounded-xl h-11 text-xs font-bold hover:bg-black"
              >
                Close Bio
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Premium calling visual overlay */}
      {activeCall && (
        <div className="fixed inset-0 bg-primary-950/95 z-[9999] flex flex-col items-center justify-center p-8 animate-in fade-in duration-500 select-none">
          <div className="max-w-sm w-full text-center flex flex-col items-center gap-10">
            {/* Caller avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping duration-1000" />
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-accent relative bg-gray-800 shadow-2xl">
                <img src={activeCall.chefImage} alt={activeCall.chefName} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Caller info */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-serif text-white italic leading-tight">{activeCall.chefName}</h2>
              <p className="text-accent text-[11px] font-black uppercase tracking-widest mt-1">
                {activeCall.status === 'ringing' ? `${activeCall.type === 'voice' ? 'Voice' : 'Video'} Call Ringing...` : 'Connected'}
              </p>
              {activeCall.status === 'connected' && (
                <span className="text-gray-400 font-mono text-sm mt-1">{formatDuration(callDuration)}</span>
              )}
            </div>

            {/* Calling animation visualizer */}
            {activeCall.status === 'connected' && (
              <div className="flex items-center gap-1 h-12">
                {[...Array(8)].map((_, i) => (
                  <span 
                    key={i} 
                    className="w-1 bg-accent rounded-full animate-bounce"
                    style={{ 
                      height: `${Math.floor(Math.random() * 32) + 12}px`,
                      animationDuration: `${Math.floor(Math.random() * 600) + 400}ms`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Call action buttons */}
            <div className="flex items-center gap-6 mt-6">
              <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md">
                <Mic size={20} />
              </button>
              <button 
                onClick={endCall}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-lg shadow-red-900/30"
              >
                <PhoneOff size={24} />
              </button>
              <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md">
                {activeCall.type === 'video' ? <Video size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating golden toast alerts */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-primary-900 text-white border border-accent/20 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 select-none">
          <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
          <span className="text-xs font-bold tracking-tight text-gray-100">{toast}</span>
        </div>
      )}
    </div>
  );
}
