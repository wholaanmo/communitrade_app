'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation' 
import { messagingDB } from '@/lib/firebaseDB'

export default function MessagePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get query parameters
  const userIdFromUrl = searchParams.get('userId')
  const userNameFromUrl = searchParams.get('userName')
  const userEmailFromUrl = searchParams.get('userEmail')
  const userPictureFromUrl = searchParams.get('userPicture') || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  
  // State
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [messages, setMessages] = useState([]);

  // Refs
  const messagesContainer = useRef(null);
  const fileInput = useRef(null);

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  // Get current user ID from session
  const getCurrentUserId = useCallback(() => {
    if (!session?.user?.email) return null;
    return session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
  }, [session]);

  // Load user conversations from Firebase
  useEffect(() => {
    if (!session || !getCurrentUserId()) return;

    setIsInitializing(true);
    
    // Listen to user conversations in real-time
    const unsubscribe = messagingDB.listenToUserConversations(
      getCurrentUserId(), 
      (firebaseConversations) => {
        console.log('Loaded conversations from Firebase:', firebaseConversations.length);
        
        // Format conversations for display
        const formattedConversations = firebaseConversations.map(conv => ({
          id: conv.id,
          userId: conv.otherUser.userId,
          userName: conv.otherUser.userName,
          userEmail: conv.otherUser.userEmail,
          userPicture: conv.otherUser.userPicture,
          lastMessage: conv.lastMessage || 'Start a conversation...',
          timestamp: conv.lastMessageTime ? formatTimeAgo(conv.lastMessageTime) : 
                    conv.createdAt ? formatTimeAgo(conv.createdAt) : 'Recently',
          unreadCount: 0, // Set to 0 since we removed the feature
          status: 'online',
          firebaseData: conv
        }));
        
        setConversations(formattedConversations);
        setIsInitializing(false);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [session, getCurrentUserId]);

  // Load messages for active conversation
  useEffect(() => {
    if (!activeConversation?.id) return;

    // Listen to messages in real-time
    const unsubscribe = messagingDB.listenToMessages(
      activeConversation.id,
      (firebaseMessages) => {
        console.log('Loaded messages from Firebase:', firebaseMessages.length);
        
        // Format messages for display
        const formattedMessages = firebaseMessages.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.senderId === getCurrentUserId() ? 'me' : 'them',
          type: msg.type || 'text',
          time: msg.timestamp ? formatMessageTime(msg.timestamp) : 'Now'
        }));
        
        setMessages(formattedMessages);
        
        // Mark messages as read when viewing
        messagingDB.markMessagesAsRead(activeConversation.id, getCurrentUserId());
        
        // Scroll to bottom
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [activeConversation?.id, getCurrentUserId]);

  // Effect to handle URL parameters
  useEffect(() => {
    if (!userIdFromUrl || !userNameFromUrl || isInitializing || !getCurrentUserId() || !session) return;
  
    const handleUrlParams = async () => {
      try {
        // Get current user data from session
        const currentUserData = {
          name: session.user?.name || 'Current User',
          email: session.user?.email || '',
          picture: session.user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        };
  
        // Other user data from URL parameters
        const otherUserData = {
          name: userNameFromUrl,
          email: userEmailFromUrl || '',
          picture: userPictureFromUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        };
  
        // Get or create conversation with the user from URL
        const conversation = await messagingDB.getOrCreateConversation(
          getCurrentUserId(),
          userIdFromUrl,
          currentUserData,
          otherUserData
        );
        
        // Format conversation for display
        const otherUser = conversation.participants.user1 === getCurrentUserId() ? 
          {
            userId: conversation.participants.user2,
            userName: conversation.participants.user2Name,
            userEmail: conversation.participants.user2Email,
            userPicture: conversation.participants.user2Picture
          } : {
            userId: conversation.participants.user1,
            userName: conversation.participants.user1Name,
            userEmail: conversation.participants.user1Email,
            userPicture: conversation.participants.user1Picture
          };
        
          const formattedConversation = {
            id: conversation.id,
            userId: otherUser.userId,
            userName: otherUser.userName,
            userEmail: otherUser.userEmail,
            userPicture: otherUser.userPicture,
            lastMessage: conversation.lastMessage || 'Start a conversation...',
            timestamp: conversation.lastMessageTime ? formatTimeAgo(conversation.lastMessageTime) : 
                      conversation.createdAt ? formatTimeAgo(conversation.createdAt) : 'Now',
            unreadCount: 0,
            status: 'online',
            firebaseData: conversation
          };
  
        // Check if conversation already exists in list
        const existingIndex = conversations.findIndex(c => c.id === formattedConversation.id);
        if (existingIndex === -1) {
          // Add to beginning of list
          setConversations(prev => [formattedConversation, ...prev]);
        } else {
          // If it already exists, update it instead
          setConversations(prev => {
            const updated = [...prev];
            updated[existingIndex] = formattedConversation;
            return updated;
          });
        }
        
        // Select this conversation
        selectConversation(formattedConversation);
        
        // If on mobile, close sidebar to show chat
        if (isMobile) {
          setIsSidebarExpanded(false);
        }
  
        // Clear URL parameters after selecting conversation
        router.replace('/user/message');
  
      } catch (error) {
        console.error('Error handling URL parameters:', error);
      }
    };
  
    handleUrlParams();
  }, [userIdFromUrl, userNameFromUrl, userEmailFromUrl, userPictureFromUrl, isMobile, isInitializing, getCurrentUserId, session]);

  // Helper functions for time formatting
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    let date;
    if (typeof timestamp === 'object' && timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else {
      return 'Recently';
    }
    
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return 'Now';
    
    let date;
    if (typeof timestamp === 'object' && timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else {
      return 'Now';
    }
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
    setMessages([]); // Clear messages when switching conversations
    
    // Mark messages as read when selected
    if (conversation.id) {
      messagingDB.markMessagesAsRead(conversation.id, getCurrentUserId());
    }
    
    // On mobile, close sidebar after selecting conversation
    if (isMobile) {
      setIsSidebarExpanded(false);
    }
    
    // Clear URL parameters after selecting conversation
    if (userIdFromUrl || userNameFromUrl) {
      router.replace('/user/message');
    }
  }, [isMobile, userIdFromUrl, userNameFromUrl, router, getCurrentUserId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation || !getCurrentUserId()) return;

    try {
      const messageData = {
        content: newMessage,
        senderId: getCurrentUserId(),
        type: 'text'
      };
      
      await messagingDB.sendMessage(activeConversation.id, messageData);
      setNewMessage('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const triggerFileInput = () => {
    fileInput.current.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/') && activeConversation && getCurrentUserId()) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          // For now, store as Base64. In production, you'd upload to Firebase Storage
          const imageData = e.target.result;
          
          const messageData = {
            content: imageData,
            senderId: getCurrentUserId(),
            type: 'image'
          };
          
          await messagingDB.sendMessage(activeConversation.id, messageData);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
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
    // Select first conversation by default (if no URL parameters and not initializing)
    if (conversations.length > 0 && !activeConversation && !userIdFromUrl && !isInitializing) {
      selectConversation(conversations[0]);
    }
  }, [conversations, activeConversation, userIdFromUrl, isInitializing, selectConversation]);

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

  // Show loading state while checking authentication
  if (status === "loading" || isInitializing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading Messages...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

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
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No conversations yet</p>
              <p className="text-sm">Start a conversation from a post!</p>
            </div>
          ) : (
            conversations.map((conversation) => (
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
                  <img 
                    src={conversation.userPicture} 
                    alt={conversation.userName}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+';
                    }}
                  />
                </div>
                <div className="conversation-info flex-1 min-w-0">
                  <div className={`user-name font-semibold mb-1 text-sm sm:text-base ${
                    activeConversation?.id === conversation.id ? 'text-white' : 'text-[#121731]'
                  }`}>
                    {conversation.userName}
                    {conversation.userId === userIdFromUrl && (
                      <span className="ml-2 text-xs bg-blue-500 text-white px-1 rounded">New</span>
                    )}
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
            ))
          )}
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
                <img 
                  src={activeConversation.userPicture} 
                  alt={activeConversation.userName}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+';
                  }}
                />
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
              {/* Show welcome message for new conversations */}
              {messages.length === 0 && (
                <div className="welcome-message text-center py-4">
                  <p className="text-gray-600">Start a conversation with {activeConversation.userName}</p>
                  <p className="text-sm text-gray-500 mt-1">Say hello!</p>
                </div>
              )}
              
              {messages.map((message) => (
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
                  placeholder={`Message ${activeConversation.userName}...`}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') sendMessage();
                  }}
                  className="message-input flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-[#728a9c] rounded-full outline-none text-sm sm:text-base focus:border-[#121731]"
                />
                <button 
                  onClick={sendMessage} 
                  className="send-button bg-[#121731] text-white border-none rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#555555]"
                  disabled={!newMessage.trim()}
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