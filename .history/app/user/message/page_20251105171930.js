'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function MessagePage() {
  // State
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const messagesContainer = useRef(null);
  const fileInput = useRef(null);

  // Sample conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      userName: 'John Doe',
      lastMessage: 'Thanks for the help!',
      timestamp: '10:30 AM',
      unreadCount: 2,
      status: 'online',
      messages: [
        { id: 1, content: 'Hi sah!', sender: 'them', time: '10:15 AM' },
        { id: 2, content: 'Uy musta my young stunna?', sender: 'me', time: '10:16 AM' },
        { id: 3, content: 'Need ko help sa project namin', sender: 'them', time: '10:20 AM' },
        { id: 4, content: 'Ay bounce na ko jan sah', sender: 'me', time: '10:25 AM' },
        { id: 5, content: 'Awit, makikita mo talaga kung sino sasama sa zero days mo', sender: 'them', time: '10:30 AM' }
      ]
    },
    {
      id: 2,
      userName: 'Sarah Wilson',
      lastMessage: 'See you tomorrow!',
      timestamp: 'Yesterday',
      unreadCount: 0,
      status: 'offline',
      messages: [
        { id: 1, content: 'Meeting tomorrow at 3 PM', sender: 'them', time: 'Yesterday' },
        { id: 2, content: 'Owkie dowkie', sender: 'me', time: 'Yesterday' }
      ]
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      lastMessage: 'Tapos na po maem',
      timestamp: '12/15/2024',
      unreadCount: 1,
      status: 'online',
      messages: [
        { id: 1, content: 'The files you requested are ready for review', sender: 'them', time: '12/15/2024' }
      ]
    },
    {
      id: 4,
      userName: 'Emily Davis',
      lastMessage: 'Are we still meeting today?',
      timestamp: '11:45 AM',
      unreadCount: 0,
      status: 'online',
      messages: [
        { id: 1, content: 'Hey, are you available for a quick call?', sender: 'them', time: '11:30 AM' },
        { id: 2, content: 'Sure, what time works for you?', sender: 'me', time: '11:35 AM' }
      ]
    },
    {
      id: 5,
      userName: 'Alex Thompson',
      lastMessage: 'Sent you the document',
      timestamp: 'Yesterday',
      unreadCount: 3,
      status: 'online',
      messages: [
        { id: 1, content: 'Can you review this document when you have time?', sender: 'them', time: 'Yesterday' },
        { id: 2, content: 'Of course, send it over', sender: 'me', time: 'Yesterday' }
      ]
    },
    {
      id: 6,
      userName: 'Maria Garcia',
      lastMessage: 'Thanks for your help!',
      timestamp: '12/14/2024',
      unreadCount: 0,
      status: 'offline',
      messages: [
        { id: 1, content: 'I really appreciate your assistance with the project', sender: 'them', time: '12/14/2024' },
        { id: 2, content: 'Happy to help anytime!', sender: 'me', time: '12/14/2024' }
      ]
    },
    {
      id: 7,
      userName: 'David Chen',
      lastMessage: 'Lets catch up soon',
      timestamp: '12/13/2024',
      unreadCount: 1,
      status: 'online',
      messages: [
        { id: 1, content: 'Long time no see! How have you been?', sender: 'them', time: '12/13/2024' },
        { id: 2, content: 'Doing great! We should definitely meet up', sender: 'me', time: '12/13/2024' }
      ]
    },
    {
      id: 8,
      userName: 'Lisa Rodriguez',
      lastMessage: 'The package arrived',
      timestamp: '12/12/2024',
      unreadCount: 0,
      status: 'offline',
      messages: [
        { id: 1, content: 'Just wanted to let you know the package arrived safely', sender: 'them', time: '12/12/2024' },
        { id: 2, content: 'Great! Thanks for the update', sender: 'me', time: '12/12/2024' }
      ]
    },
    {
      id: 9,
      userName: 'Kevin Wilson',
      lastMessage: 'Check this out!',
      timestamp: '12/11/2024',
      unreadCount: 2,
      status: 'online',
      messages: [
        { id: 1, content: 'Found this interesting article you might like', sender: 'them', time: '12/11/2024' },
        { id: 2, content: 'Looks cool, Ill read it later', sender: 'me', time: '12/11/2024' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  };

  // Methods
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const selectConversation = useCallback((conversation) => {
    setActiveConversation(conversation);
    // Mark as read when selected
    const updatedConversations = conversations.map(conv => 
      conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
    );
    setConversations(updatedConversations);
    // Scroll to bottom of messages
    setTimeout(() => {
      scrollToBottom();
    }, 0);
    
    // On mobile, close sidebar after selecting conversation
    if (isMobile) {
      setIsSidebarExpanded(false);
    }
  }, [conversations, isMobile]);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg = {
      id: Date.now(),
      content: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMsg],
      lastMessage: newMessage,
      timestamp: 'Just now'
    };

    setActiveConversation(updatedConversation);
    
    // Update conversations list
    const updatedConversations = conversations.map(conv => 
      conv.id === activeConversation.id ? updatedConversation : conv
    );
    setConversations(updatedConversations);
    
    setNewMessage('');
    
    // Scroll to bottom after sending
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  };

  const triggerFileInput = () => {
    fileInput.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageMsg = {
          id: Date.now(),
          content: e.target.result,
          sender: 'me',
          type: 'image',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const updatedConversation = {
          ...activeConversation,
          messages: [...activeConversation.messages, imageMsg],
          lastMessage: 'Sent an image',
          timestamp: 'Just now'
        };

        setActiveConversation(updatedConversation);
        
        // Update conversations list
        const updatedConversations = conversations.map(conv => 
          conv.id === activeConversation.id ? updatedConversation : conv
        );
        setConversations(updatedConversations);
        
        // Scroll to bottom after sending
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      };
      reader.readAsDataURL(file);
    }
    
    // Reset file input
    event.target.value = '';
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleBackToConversations = () => {
    setIsSidebarExpanded(true);
  };

  // Effects
  useEffect(() => {
    // Select first conversation by default
    if (conversations.length > 0 && !activeConversation) {
      selectConversation(conversations[0]);
    }
  }, [conversations, activeConversation, selectConversation]);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="message-page fixed top-15 left-0 sm:left-[68px] right-0 bottom-0 flex bg-[#ffffff] overflow-hidden">




      {/* Sidebar with conversation list */}
      <div className={`conversation-sidebar bg-white border-r border-[#728a9c] flex flex-col transition-all duration-300 overflow-hidden ${
        !isSidebarExpanded ? 'sidebar-collapsed w-0 md:w-[60px]' : 'w-full md:w-[350px]'
      } ${isMobile && !isSidebarExpanded ? 'hidden' : 'flex'}`}>
        <div className="sidebar-header flex justify-between items-center p-3 sm:p-4 border-b border-[#728a9c] bg-[#728a9c]">
          <h2 className="m-0 text-[#121731] text-lg sm:text-xl md:text-2xl">Messages</h2>
          {isMobile && (
            <button 
              onClick={() => setIsSidebarExpanded(false)}
              className="md:hidden bg-none border-none text-[#121731] cursor-pointer p-1"
            >
              <span className="material-icons">close</span>
            </button>
          )}
        </div>
        
        <div className="conversation-list flex-1 overflow-y-auto pr-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item flex items-center p-3 sm:p-4 cursor-pointer border-b border-[#728a9c] transition-colors duration-200 relative ${
                activeConversation?.id === conversation.id 
                  ? 'bg-[#121731] text-white' 
                  : 'hover:bg-[#ffffff]'
              }`}
              onClick={() => selectConversation(conversation)}
            >
              <div className="avatar mr-3 sm:mr-4 flex-shrink-0">
                <span className="material-icons text-[2rem] sm:text-[2.5rem] text-[#121731]">account_circle</span>
              </div>
              <div className="conversation-info flex-1 min-w-0">
                <div className={`user-name font-semibold mb-1 text-sm sm:text-base ${
                  activeConversation?.id === conversation.id ? 'text-white' : 'text-[#121731]'
                }`}>
                  {conversation.userName}
                </div>
                <div className={`last-message text-xs sm:text-sm ${
                  activeConversation?.id === conversation.id ? 'text-white' : 'text-gray-600'
                } whitespace-nowrap overflow-hidden text-ellipsis`}>
                  {conversation.lastMessage}
                </div>
                <div className={`timestamp text-xs mt-1 ${
                  activeConversation?.id === conversation.id ? 'text-white' : 'text-gray-500'
                }`}>
                  {conversation.timestamp}
                </div>
              </div>
              {conversation.unreadCount > 0 && (
                <div className="unread-badge bg-[#ff4757] text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-semibold">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className={`chat-area flex-1 flex flex-col bg-white overflow-hidden ${
        isMobile && isSidebarExpanded ? 'hidden' : 'flex'
      }`}>
        {activeConversation ? (
          <div className="chat-container flex flex-col h-full w-full">
            {/* Chat header */}
            <div className="chat-header p-3 sm:p-4 border-b border-[#728a9c] bg-white">
              <div className="chat-user-info flex items-center gap-2">
                {isMobile && (
                  <button 
                    onClick={handleBackToConversations}
                    className="mr-2 bg-none border-none text-[#121731] cursor-pointer p-1"
                  >
                    <span className="material-icons">arrow_back</span>
                  </button>
                )}
                <span className="material-icons text-[1.75rem] sm:text-[2rem] text-[#121731]">account_circle</span>
                <span className="user-name text-sm sm:text-base font-medium">{activeConversation.userName}</span>
                <span className={`status text-xs py-1 px-2 rounded-full capitalize ${
                  activeConversation.status === 'online' 
                    ? 'bg-[#2ed573] text-white' 
                    : 'bg-[#747d8c] text-white'
                }`}>
                  {activeConversation.status}
                </span>
              </div>
            </div>

            {/* Messages container */}
            <div 
              ref={messagesContainer}
              className="messages-container flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col gap-3 sm:gap-4 bg-[#f8f9fa]"
            >
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`message flex flex-col max-w-[85%] sm:max-w-[80%] md:max-w-[70%] ${
                    message.sender === 'me' 
                      ? 'self-end items-end' 
                      : 'self-start items-start'
                  }`}
                >
                  <div className={`message-content px-3 py-2 sm:px-4 sm:py-3 rounded-2xl break-words text-sm sm:text-base ${
                    message.sender === 'me'
                      ? 'bg-[#121731] text-white rounded-br-sm'
                      : 'bg-white text-[#121731] border border-[#728a9c] rounded-bl-sm'
                  }`}>
                    {message.type === 'image' ? (
                      <img 
                        src={message.content} 
                        alt="Sent image" 
                        className="message-image max-w-[200px] sm:max-w-[250px] md:max-w-[300px] max-h-[200px] sm:max-h-[250px] md:max-h-[300px] rounded-lg cursor-pointer transition-transform duration-200 hover:scale-102"
                        onClick={() => openImageModal(message.content)}
                      />
                    ) : (
                      <span>{message.content}</span>
                    )}
                  </div>
                  <div className="message-time text-xs text-gray-500 mt-1">
                    {message.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="message-input-container p-3 sm:p-4 border-t border-[#728a9c] bg-white">
              <div className="input-wrapper flex gap-2 items-center">
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <button 
                  onClick={triggerFileInput} 
                  className="attachment-button bg-none border-none text-[#121731] cursor-pointer p-1 sm:p-2 rounded-full transition-colors duration-200 hover:bg-[#ffffff]"
                >
                  <span className="material-icons text-lg sm:text-xl">attach_file</span>
                </button>
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  type="text"
                  placeholder="Type a message..."
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') sendMessage();
                  }}
                  className="message-input flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-[#728a9c] rounded-full outline-none text-sm sm:text-base focus:border-[#121731]"
                />
                <button 
                  onClick={sendMessage} 
                  className="send-button bg-[#121731] text-white border-none rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#555555]"
                >
                  <span className="material-icons text-sm sm:text-base">send</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Empty state when no conversation selected
          <div className="no-conversation flex-1 flex items-center justify-center bg-[#f8f9fa]">
            <div className="empty-state text-center text-gray-600 px-4">
              <span className="material-icons text-[3rem] sm:text-[4rem] text-[#728a9c] mb-3 sm:mb-4">chat</span>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Select a conversation</h3>
              <p className="text-gray-500 text-sm sm:text-base">Choose a conversation from the list to start messaging</p>
              {isMobile && (
                <button 
                  onClick={() => setIsSidebarExpanded(true)}
                  className="mt-4 bg-[#121731] text-white px-4 py-2 rounded-lg hover:bg-[#555555] transition-colors"
                >
                  Open Conversations
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="image-modal fixed inset-0 bg-black/90 flex items-center justify-center z-[1000] p-4"
          onClick={closeImageModal}
        >
          <div className="modal-content relative max-w-full max-h-full">
            <img 
              src={selectedImage} 
              alt="Full size image" 
              className="max-w-full max-h-[90vh] sm:max-h-[80vh] rounded-lg"
            />
            <button 
              className="close-modal absolute -top-8 sm:-top-10 right-0 bg-none border-none text-white text-xl sm:text-2xl cursor-pointer p-2"
              onClick={closeImageModal}
            >
              <span className="material-icons">close</span>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Remove scrollbar from entire page */
        html, body {
          overflow: hidden;
          height: 100%;
        }

        /* Custom scrollbar for conversation list */
        .conversation-list::-webkit-scrollbar {
          width: 6px;
        }

        .conversation-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .conversation-list::-webkit-scrollbar-thumb {
          background: #121731;
          border-radius: 4px;
        }

        .conversation-list::-webkit-scrollbar-thumb:hover {
          background: #555555;
        }

        /* Custom scrollbar for messages container */
        .messages-container::-webkit-scrollbar {
          width: 4px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: #e9ecef;
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: #adb5bd;
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: #6c757d;
        }

        /* Material Icons alignment fix */
        .material-icons {
          vertical-align: bottom;
        }

        /* Responsive Design */
        @media (max-width: 767px) {
          .conversation-sidebar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            z-index: 100;
            width: 100% !important;
          }
          
          .sidebar-collapsed {
            transform: translateX(-100%);
          }
          
          .chat-area {
            width: 100%;
          }
          
          .message {
            max-width: 90%;
          }
          
          .message-image {
            max-width: 200px;
            max-height: 200px;
          }

          html, body {
            overflow: auto;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .conversation-sidebar {
            width: 300px;
          }
          
          .message {
            max-width: 75%;
          }
        }
      `}</style>
    </div>
  );
}