import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Send, 
  Check, 
  Paperclip, 
  MoreVertical, 
  Info, 
  Star, 
  Calendar, 
  Users, 
  DollarSign, 
  X,
  Sparkles,
  ChefHat,
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
  ChevronLeft
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

// Mock chat channels based on our chefs
const initialChats = [
  {
    id: 1,
    chefName: "Chef Julian Vasseur",
    chefImage: "/b_1.png",
    specialty: "Modern French Gastronomy",
    status: "online",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    booking: {
      menu: "Mediterranean Odyssey",
      date: "May 20, 2026",
      guests: "4 Guests",
      price: "$1,200",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 2,
    chefName: "Chef Hanae Tanaka",
    chefImage: "/b_2.png",
    specialty: "Omakase & Kaiseki",
    status: "online",
    unread: 0,
    rating: "5.0",
    lastActivity: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    booking: {
      menu: "Art of Omakase",
      date: "Jun 12, 2026",
      guests: "2 Guests",
      price: "$640",
      status: "Pending"
    },
    messages: []
  },
  {
    id: 3,
    chefName: "Chef Marco Rossi",
    chefImage: "/b_3.png",
    specialty: "Regional Italian Heritage",
    status: "offline",
    unread: 0,
    rating: "4.8",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    booking: {
      menu: "Handmade Pasta Masterclass",
      date: "Apr 15, 2026",
      guests: "8 Guests",
      price: "$1,440",
      status: "Completed"
    },
    messages: []
  },
  {
    id: 4,
    chefName: "Chef Elena Rodriguez",
    chefImage: "/b_4.png",
    specialty: "Modern Spanish Avant-Garde",
    status: "online",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    booking: {
      menu: "Tapas Reimagined Feast",
      date: "Jul 04, 2026",
      guests: "12 Guests",
      price: "$4,800",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 5,
    chefName: "Chef Liam O'Connor",
    chefImage: "/b_1.png",
    specialty: "Rustic Irish & Celtic Heritage",
    status: "offline",
    unread: 0,
    rating: "4.8",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    booking: {
      menu: "Slow-Braised Celtic Feast",
      date: "Aug 12, 2026",
      guests: "6 Guests",
      price: "$900",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 6,
    chefName: "Chef Chloe Dubois",
    chefImage: "/b_2.png",
    specialty: "Fine Pastry & Dessert Artistry",
    status: "online",
    unread: 0,
    rating: "5.0",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
    booking: {
      menu: "Grand Dessert Degustation",
      date: "Sep 30, 2026",
      guests: "15 Guests",
      price: "$2,250",
      status: "Confirmed"
    },
    messages: []
  },
  {
    id: 7,
    chefName: "Chef Antonio Silva",
    chefImage: "/b_3.png",
    specialty: "Modern Portuguese Sea-to-Table",
    status: "online",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    booking: {
      menu: "Algarve Coastal Tasting",
      date: "Oct 15, 2026",
      guests: "10 Guests",
      price: "$1,800",
      status: "Pending"
    },
    messages: []
  },
  {
    id: 8,
    chefName: "Chef Mei Ling",
    chefImage: "/b_4.png",
    specialty: "Imperial Szechuan Reimagined",
    status: "offline",
    unread: 0,
    rating: "4.9",
    lastActivity: Date.now() - 1000 * 60 * 60 * 24 * 15, // 15 days ago
    booking: {
      menu: "Dynasty Peking Duck & Spice Feast",
      date: "Nov 01, 2026",
      guests: "5 Guests",
      price: "$1,500",
      status: "Confirmed"
    },
    messages: []
  }
];

// Contextual automated replies
const autoReplies = {
  dietary: "I would be absolutely thrilled to accommodate those dietaries. I will redesign the third and fifth courses to ensure they are fully suitable and equally exquisite. I will upload the updated menu proposal for your review shortly!",
  arrival: "I typically arrive exactly 2 hours prior to the event (around 5:00 PM for a 7:00 PM dinner) to set up, prep, and align with your table arrangements. All clean-up and kitchen polishing are included in my service as well.",
  wine: "For this menu, I highly recommend a crisp, minerals-forward Chablis for the initial seafood courses, moving into a medium-bodied Pinot Noir from Burgundy for the main course. I would be glad to coordinate with a local cellar to have these delivered directly!",
  default: "Thank you for the message! I am currently preparing for an evening service, but I have noted this request. I will review it in detail and get back to you with an updated proposal within a couple of hours. Looking forward to creating an unforgettable dinner!"
};

export default function Messages() {
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

  // Scroll to bottom of the container to prevent full page/viewport scrolling
  const scrollToBottom = (behavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: behavior
      });
    }
  };

  // Scroll smoothly when messages list or typing state changes
  useEffect(() => {
    if (activeChatId) {
      scrollToBottom('smooth');
    }
  }, [activeChat?.messages, isTyping]);

  // Clear unread and instantly scroll to bottom when switching chats
  useEffect(() => {
    scrollToBottom('auto');
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChatId ? { ...chat, unread: 0 } : chat
      )
    );
  }, [activeChatId]);

  // Call timer side-effects
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

  const triggerCall = (type) => {
    setActiveCall(type);
    setIsMenuOpen(false);
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
    showToast("Conversation cleared successfully");
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

    // 1. Add user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: Date.now(),
      sender: 'user',
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
    chat.chefName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Suggestion action pills
  const suggestions = [
    { label: "Dietary Needs", text: "Hi Chef, I wanted to discuss a few gluten-free and vegetarian dietary adjustments for our party." },
    { label: "Arrival Schedule", text: "What time will you arrive to set up and prep before the event begins?" },
    { label: "Wine Pairings", text: "Could you recommend suitable wine pairings or beverage selections for this menu?" }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Title Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-serif text-primary-900 mb-1">Messages</h1>
        <p className="text-gray-500 text-sm">Coordinate menus, schedules, and logistics directly with your booked private chefs.</p>
      </div>

      {/* Main Console Box */}
      <div className="h-[500px] md:h-[calc(100vh-14rem)] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">
        
        {/* Left Column: Chats list (4 cols equivalent) */}
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
                placeholder="Search conversations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50/70 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary-900 focus:bg-white transition-all text-primary-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Chats Scrolling List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 overscroll-contain">
            {filteredChats.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">No conversations found.</div>
            ) : (
              filteredChats.map((chat) => {
                const isActive = chat.id === activeChatId;
                const lastMsg = chat.messages[chat.messages.length - 1];
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
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
                        <img src={chat.chefImage} alt={chat.chefName} className="w-full h-full object-cover" />
                      </div>
                      {chat.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>

                    {/* Chat Text Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className={cn("font-bold text-sm truncate", isActive ? "text-white" : "text-primary-900")}>
                          {chat.chefName}
                        </h4>
                        <span className={cn("text-[10px]", isActive ? "text-gray-300" : "text-gray-400")}>
                          {lastMsg ? lastMsg.time : ""}
                        </span>
                      </div>
                      <p className={cn("text-xs truncate font-light", isActive ? "text-gray-200" : "text-gray-500")}>
                        {lastMsg ? lastMsg.text : chat.specialty}
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
                  <img src={activeChat.chefImage} alt={activeChat.chefName} className="w-full h-full object-cover" />
                </div>
                {activeChat.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div>
                <h3 className="font-serif text-lg text-primary-900 leading-none">{activeChat.chefName}</h3>
                <span className="text-[11px] text-gray-500 font-light mt-1 block">
                  {activeChat.specialty} • {activeChat.status === "online" ? "Online" : "Offline"}
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
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400 font-light text-xs gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent/50 border border-accent/10">
                  <MessageSquare size={20} />
                </div>
                <span>No messages yet. Send a note below to start planning!</span>
              </div>
            ) : (
              activeChat.messages.map((msg, index) => {
                const isChef = msg.sender === 'chef';
                return (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex items-end gap-3 max-w-[80%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                      isChef ? "mr-auto" : "ml-auto flex-row-reverse"
                    )}
                  >
                    {/* Chat Avatar bubble */}
                    {isChef && (
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100 shadow-sm border border-white">
                        <img src={activeChat.chefImage} alt={activeChat.chefName} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Bubble Container */}
                    <div className="flex flex-col gap-1.5">
                      {msg.file && (
                        <div className={cn(
                          "p-3 rounded-2xl border flex items-center gap-3 w-72 mb-1 text-left",
                          isChef 
                            ? "bg-white border-gray-100 text-primary-900" 
                            : "bg-primary-800/80 border-white/10 text-white"
                        )}>
                          {msg.file.isImage ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                              <img src={msg.file.url} alt={msg.file.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-sm", isChef ? "bg-accent/10 text-accent" : "bg-white/10 text-white")}>
                              <FileText size={20} />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold truncate leading-tight">{msg.file.name}</p>
                            <p className={cn("text-[10px] mt-0.5", isChef ? "text-gray-400" : "text-white/60")}>{msg.file.size}</p>
                          </div>
                          <button className={cn("p-1.5 rounded-full shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all", isChef ? "bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-150" : "bg-white/10 hover:bg-white/20 text-white")}>
                            <Download size={14} />
                          </button>
                        </div>
                      )}
                      {msg.text && (
                        <div 
                          className={cn(
                            "px-5 py-3.5 rounded-[1.5rem] text-sm leading-relaxed",
                            isChef 
                              ? "bg-white text-gray-700 border border-gray-100 rounded-bl-sm shadow-sm" 
                              : "bg-primary-900 text-white rounded-br-sm"
                          )}
                        >
                          {msg.text}
                        </div>
                      )}
                      {/* Timestamp / read checks */}
                      <div className={cn("text-[10px] text-gray-400 flex items-center gap-1 font-light", isChef ? "pl-2" : "justify-end pr-2")}>
                        <span>{msg.time}</span>
                        {!isChef && <Check size={12} className="text-accent" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-3 max-w-[80%] mr-auto animate-pulse">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-white">
                  <img src={activeChat.chefImage} alt={activeChat.chefName} className="w-full h-full object-cover" />
                </div>
                <div className="bg-white border border-gray-100 px-5 py-3.5 rounded-[1.5rem] rounded-bl-sm text-sm text-gray-400 flex items-center gap-2 shadow-sm">
                  <span className="text-xs italic">{activeChat.chefName} is responding</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}


          </div>

          {/* Bottom Chat Editor */}
          <div className="bg-white border-t border-gray-100 p-5 shrink-0 z-10">
            
            {/* Quick Suggestions Chips */}
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

            {/* Hidden native file input */}
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
            activeChatId === null ? "hidden md:flex" : "flex"
          )}>
            <div className="w-20 h-20 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center mb-6 shadow-sm shadow-accent/5">
              <ChefHat size={36} className="text-accent animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl text-primary-900 mb-2">Your Conversations</h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-light">
              Select a booked private chef from the left sidebar to coordinate menus, schedule timings, and plan an unforgettable dining experience.
            </p>
          </div>
        )}

      </div>

      {/* Premium calling visual overlays */}
      {activeCall && activeChat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <div className="bg-primary-900 border border-white/10 text-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient from-accent/10 to-transparent pointer-events-none" />
            
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 border-4 border-accent/25 relative shadow-xl bg-gray-900">
              <img src={activeChat.chefImage} alt={activeChat.chefName} className="w-full h-full object-cover animate-pulse" />
              {activeCall === 'video' && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Video className="text-white animate-pulse" size={24} />
                </div>
              )}
            </div>
            
            <h4 className="font-serif text-2xl text-white mb-2">{activeChat.chefName}</h4>
            <p className="text-accent text-xs uppercase tracking-widest font-black mb-6">
              {activeCall === 'video' ? 'Luxury Video Link' : 'Secure Voice Link'}
            </p>
            
            <div className="mb-10">
              <p className="text-white/60 text-xs font-light mb-2">
                {callDuration > 0 ? 'Connection Active' : 'Establishing Secure Line...'}
              </p>
              <p className="font-mono text-3xl font-light text-white tracking-widest">
                {callDuration > 0 ? formatDuration(callDuration) : '0:00'}
              </p>
            </div>
            
            <div className="flex justify-center items-center gap-6">
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10">
                <Mic size={18} />
              </button>
              <button 
                onClick={() => setActiveCall(null)}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <PhoneOff size={22} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10">
                <Volume2 size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chef Profile Bio Drawer */}
      {showProfileModal && activeChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-md w-full text-primary-900 relative shadow-2xl max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setShowProfileModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary-900 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="text-center pb-6 border-b border-gray-100 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white shadow-md bg-gray-50">
                <img src={activeChat.chefImage} alt={activeChat.chefName} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-2xl text-primary-900 mb-1">{activeChat.chefName}</h3>
              <p className="text-xs text-accent uppercase tracking-widest font-black mb-3">{activeChat.specialty}</p>
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-primary-900 bg-gray-50 border border-gray-100 rounded-full py-1.5 px-4 w-max mx-auto shadow-sm">
                <Star size={14} className="text-accent fill-accent" />
                <span>{activeChat.rating} (128 Reviews)</span>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">Master Bio</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  Classically trained in culinary arts with over 15 years of Michelin-starred experience. Chef {activeChat.chefName.split(' ')[1]} specializes in bespoke seasonal tasting menus, bringing the grandeur of fine-dining into the intimacy of your private estate.
                </p>
              </div>
              
              <div>
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] bg-accent/5 border border-accent/15 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold">French Haute Cuisine</span>
                  <span className="text-[10px] bg-accent/5 border border-accent/15 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold">Pastry Crafting</span>
                  <span className="text-[10px] bg-accent/5 border border-accent/15 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold">Sommelier Pairing</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-3">Booking Details</h4>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Current Reservation</span>
                    <span className="font-semibold text-primary-900">{activeChat.booking.date}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-2.5">
                    <span className="text-gray-400">Selected Menu</span>
                    <span className="font-semibold text-primary-900">{activeChat.booking.menu}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-2.5">
                    <span className="text-gray-400">Status</span>
                    <span className="font-bold text-green-600 bg-green-50/50 border border-green-150 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">{activeChat.booking.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-primary-900 border border-white/10 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-[110] animate-in slide-in-from-bottom-5 duration-300">
          <Sparkles size={16} className="text-accent" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

    </div>
  );
}
