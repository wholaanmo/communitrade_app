import { 
  ref, 
  set, 
  get, 
  push, 
  update, 
  remove,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
  serverTimestamp 
} from "firebase/database";
import { db } from "./firebase";

// User operations
export const userDB = {
  // Create or update user
  async createUser(userId, userData) {
    const userRef = ref(db, `users/${userId}`);
    await set(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    return userRef;
  },

  // Get user by ID
  async getUser(userId) {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  },

  // Update user
  async updateUser(userId, updates) {
    const userRef = ref(db, `users/${userId}`);
    await update(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },
};

// Posts operations (for both requests and offers)
export const postsDB = {
  // Create a post (request or offer)
  async createPost(type, postData) {
    try {
      // REMOVE the 's' addition since we're passing the correct type
      const collectionName = type;  // Just use type as-is
      console.log(`Creating post in collection: ${collectionName}`);
      
      const postsRef = ref(db, collectionName);
      const newPostRef = push(postsRef);
      
      // Ensure no undefined values
      const cleanPostData = {};
      Object.keys(postData).forEach(key => {
        if (postData[key] !== undefined && postData[key] !== null) {
          cleanPostData[key] = postData[key];
        }
      });
      
      const postToSave = {
        ...cleanPostData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active'
      };
      
      console.log(`Saving post to ${collectionName}/${newPostRef.key}:`, postToSave);
      await set(newPostRef, postToSave);
      
      console.log(`Post saved successfully with ID: ${newPostRef.key}`);
      return { id: newPostRef.key, ...postToSave };
      
    } catch (error) {
      console.error(`Error creating ${type} post:`, error);
      console.error('Full error details:', {
        message: error.message,
        code: error.code,
        name: error.name
      });
      throw error;
    }
  },

  // Get all posts (requests or offers)
  async getPosts(type, filters = {}) {
    console.log(`Getting posts from: ${type}`);
    
    const postsRef = ref(db, `${type}`);
    
    try {
      // Fetch ALL posts first
      const snapshot = await get(postsRef);
      console.log(`Firebase snapshot for ${type}:`, snapshot.val());
      console.log(`Number of posts found:`, snapshot.size);
      
      const posts = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const postData = childSnapshot.val();
          
          // Debug: Log each post's userId
          console.log(`Post ID: ${childSnapshot.key}, UserId: ${postData.userId}`);
          
          // Apply filters CLIENT-SIDE
          if (filters.userId && postData.userId !== filters.userId) {
            console.log(`Skipping post - userId doesn't match`);
            return;
          }
          
          if (filters.status && postData.status !== filters.status) return;
          
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const matches = 
              (postData.title && postData.title.toLowerCase().includes(query)) ||
              (postData.description && postData.description.toLowerCase().includes(query)) ||
              (postData.category && postData.category.toLowerCase().includes(query)) ||
              (postData.location && postData.location.toLowerCase().includes(query));
            if (!matches) return;
          }
          
          posts.push({
            id: childSnapshot.key,
            ...postData
          });
        });
      }
      
      console.log(`Returning ${posts.length} posts for user: ${filters.userId}`);
      return posts;
      
    } catch (error) {
      console.error(`Error getting ${type} posts:`, error);
      return [];
    }
  },

  // Listen to posts in real-time
  listenToPosts(type, filters = {}, callback) {
    const postsRef = ref(db, `${type}`);
    
    const unsubscribe = onValue(postsRef, (snapshot) => {
      console.log(`Real-time snapshot for ${type}:`, snapshot.size, 'posts');
      
      const posts = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const post = {
            id: childSnapshot.key,
            ...childSnapshot.val()
          };
          
          // Apply filters CLIENT-SIDE
          if (filters.userId && post.userId !== filters.userId) return;
          
          if (filters.status && post.status !== filters.status) return;
          
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const matches = 
              (post.title && post.title.toLowerCase().includes(query)) ||
              (post.description && post.description.toLowerCase().includes(query)) ||
              (post.category && post.category.toLowerCase().includes(query)) ||
              (post.location && post.location.toLowerCase().includes(query));
            if (!matches) return;
          }
          
          posts.push(post);
        });
      }
      
      console.log(`Real-time callback with ${posts.length} posts`);
      callback(posts);
    });
    
    return () => off(postsRef, 'value', unsubscribe);
  },

  // Update a post
  async updatePost(type, postId, updates) {
    const postRef = ref(db, `${type}/${postId}`); 
    await update(postRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete a post
  async deletePost(type, postId) {
    const postRef = ref(db, `${type}/${postId}`);
    await remove(postRef);
  },

  // Report a post
  async reportPost(type, postId, reportData) {
    const reportRef = ref(db, `reports/${type}/${postId}`); 
    await push(reportRef, {
      ...reportData,
      reportedAt: serverTimestamp(),
      status: 'pending'
    });
  },

  // Get reported posts
  async getReportedPosts() {
      const reportsRef = ref(db, 'reports');
      const snapshot = await get(reportsRef);
      const reportedPosts = [];
      
      if (snapshot.exists()) {
        // Use Promise.all to handle async operations in loops
        const promises = [];
        
        snapshot.forEach((typeSnapshot) => {
          const postType = typeSnapshot.key;
          typeSnapshot.forEach((postSnapshot) => {
            postSnapshot.forEach((reportSnapshot) => {
              // Create a promise for each report
              const promise = (async () => {
                const postDetails = await this.getPostDetails(postType, postSnapshot.key);
                return {
                  id: postSnapshot.key,
                  type: postType.replace('s', ''), // Remove 's' from 'requests' or 'offers'
                  reportId: reportSnapshot.key,
                  ...reportSnapshot.val(),
                  ...postDetails
                };
              })();
              
              promises.push(promise);
            });
          });
        });
        
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        reportedPosts.push(...results);
      }
      
      return reportedPosts;
    },

    async getPostDetails(postType, postId) {
      const postRef = ref(db, `${postType}/${postId}`); 
    const snapshot = await get(postRef);
    return snapshot.exists() ? snapshot.val() : {};
  }
};

// Admin operations
export const adminDB = {
  // Get all users
  async getAllUsers() {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    const users = [];
    
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    }
    
    return users;
  },

  // Get all posts (requests and offers)
  async getAllPosts() {
    const requests = await postsDB.getPosts('requests');
    const offers = await postsDB.getPosts('offers');
    return [...requests, ...offers];
  },

  // Get reported posts
  async getReportedPosts() {
    return await postsDB.getReportedPosts();
  },

  // Update user role
  async updateUserRole(userId, role) {
    const userRef = ref(db, `users/${userId}/role`);
    await set(userRef, role);
  },

  // Deactivate user
  async deactivateUser(userId, durationDays, reason) {
    const deactivationRef = ref(db, `deactivatedUsers/${userId}`);
    await set(deactivationRef, {
      userId,
      deactivatedAt: serverTimestamp(),
      durationDays,
      reason,
      status: 'deactivated'
    });
  },

  // Reactivate user
  async reactivateUser(userId) {
    const deactivationRef = ref(db, `deactivatedUsers/${userId}`);
    await remove(deactivationRef);
  },

  // Get deactivated users
  async getDeactivatedUsers() {
    const deactivatedRef = ref(db, 'deactivatedUsers');
    const snapshot = await get(deactivatedRef);
    const deactivatedUsers = [];
    
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        deactivatedUsers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    }
    
    return deactivatedUsers;
  }
};

// Messaging operations
export const messagingDB = {
  // Get or create a conversation between two users
  async getOrCreateConversation(currentUserId, otherUserId, currentUserData = {}, otherUserData = {}) {
    try {
      console.log('Getting or creating conversation between:', currentUserId, 'and', otherUserId);
      
      // First, check if a conversation already exists
      const conversationsRef = ref(db, 'conversations');
      const snapshot = await get(conversationsRef);
      
      let existingConversation = null;
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const conversation = childSnapshot.val();
          const participants = conversation.participants || {};
          
          // Check if conversation exists between these two users
          if ((participants.user1 === currentUserId && participants.user2 === otherUserId) ||
              (participants.user1 === otherUserId && participants.user2 === currentUserId)) {
            existingConversation = {
              id: childSnapshot.key,
              ...conversation
            };
            
            // Debug log for found conversation
            console.log('Found existing conversation:', {
              conversationId: childSnapshot.key,
              user1: participants.user1,
              user2: participants.user2,
              currentUserId,
              otherUserId,
              matchFound: true
            });
          }
        });
      }
      
      // Debug log to see what we found
      console.log('Looking for conversation between:', {
        currentUserId,
        otherUserId,
        existingConversationId: existingConversation?.id,
        totalConversations: snapshot.exists() ? snapshot.size : 0
      });
      
      if (existingConversation) {
        console.log('Returning existing conversation:', existingConversation.id);
        return existingConversation;
      }
      
      console.log('No existing conversation found, creating new one...');
      
      // Create a new conversation
      const newConversationRef = push(ref(db, 'conversations'));
      const conversationId = newConversationRef.key;
      
      // Sanitize user IDs for use as object keys
      const sanitizedCurrentUserId = currentUserId.replace(/[.#$/\[\]]/g, '_');
      const sanitizedOtherUserId = otherUserId.replace(/[.#$/\[\]]/g, '_');
      
      const conversationData = {
        id: conversationId,
        participants: {
          user1: currentUserId,
          user1Name: currentUserData.name || 'Current User',
          user1Email: currentUserData.email || '',
          user1Picture: currentUserData.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          user2: otherUserId,
          user2Name: otherUserData.name || 'Other User',
          user2Email: otherUserData.email || '',
          user2Picture: otherUserData.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
        },
        lastMessage: '',
        lastMessageTime: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      console.log('Creating new conversation with data:', conversationData);
      
      await set(newConversationRef, conversationData);
      console.log('Created new conversation:', conversationId);
      
      return conversationData;
      
    } catch (error) {
      console.error('Error getting or creating conversation:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        currentUserId,
        otherUserId
      });
      throw error;
    }
  },

// Send a message
async sendMessage(conversationId, messageData) {
  try {
    const messagesRef = ref(db, `messages/${conversationId}`);
    const newMessageRef = push(messagesRef);
    
    const messageToSave = {
      ...messageData,
      id: newMessageRef.key,
      timestamp: serverTimestamp(),
      read: false
    };
    
    await set(newMessageRef, messageToSave);
    
    // Update conversation last message
    const conversationRef = ref(db, `conversations/${conversationId}`);
    await update(conversationRef, {
      lastMessage: messageData.content,
      lastMessageTime: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { id: newMessageRef.key, ...messageToSave };
    
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
},

// Get messages for a conversation
async getMessages(conversationId) {
  try {
    const messagesRef = ref(db, `messages/${conversationId}`);
    const snapshot = await get(messagesRef);
    
    const messages = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    }
    
    // Sort by timestamp (oldest first)
    return messages.sort((a, b) => {
      const timeA = a.timestamp?.seconds || a.timestamp || 0;
      const timeB = b.timestamp?.seconds || b.timestamp || 0;
      return timeA - timeB;
    });
    
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
},

// Listen to messages in real-time
listenToMessages(conversationId, callback) {
  const messagesRef = ref(db, `messages/${conversationId}`);
  
  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const messages = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    }
    
    // Sort by timestamp (oldest first)
    messages.sort((a, b) => {
      const timeA = a.timestamp?.seconds || a.timestamp || 0;
      const timeB = b.timestamp?.seconds || b.timestamp || 0;
      return timeA - timeB;
    });
    
    callback(messages);
  });
  
  return () => off(messagesRef, 'value', unsubscribe);
},

// Get user's conversations
async getUserConversations(userId) {
  try {
    const conversationsRef = ref(db, 'conversations');
    const snapshot = await get(conversationsRef);
    
    const userConversations = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const conversation = childSnapshot.val();
        const participants = conversation.participants || {};
        
        // Check if user is part of this conversation
        if (participants.user1 === userId || participants.user2 === userId) {
          userConversations.push({
            id: childSnapshot.key,
            ...conversation,
            // Determine other user's info
            otherUser: {
              userId: participants.user1 === userId ? participants.user2 : participants.user1,
              userName: participants.user1 === userId ? participants.user2Name : participants.user1Name,
              userEmail: participants.user1 === userId ? participants.user2Email : participants.user1Email,
              userPicture: participants.user1 === userId ? participants.user2Picture : participants.user1Picture
            }
          });
        }
      });
    }
    
    // Sort by last message time (newest first)
    return userConversations.sort((a, b) => {
      const timeA = a.lastMessageTime?.seconds || a.lastMessageTime || a.createdAt?.seconds || a.createdAt || 0;
      const timeB = b.lastMessageTime?.seconds || b.lastMessageTime || b.createdAt?.seconds || b.createdAt || 0;
      return timeB - timeA;
    });
    
  } catch (error) {
    console.error('Error getting user conversations:', error);
    return [];
  }
},

// Listen to user's conversations in real-time
listenToUserConversations(userId, callback) {
  const conversationsRef = ref(db, 'conversations');
  
  const unsubscribe = onValue(conversationsRef, (snapshot) => {
    const userConversations = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const conversation = childSnapshot.val();
        const participants = conversation.participants || {};
        
        // Check if user is part of this conversation
        if (participants.user1 === userId || participants.user2 === userId) {
          userConversations.push({
            id: childSnapshot.key,
            ...conversation,
            // Determine other user's info
            otherUser: {
              userId: participants.user1 === userId ? participants.user2 : participants.user1,
              userName: participants.user1 === userId ? participants.user2Name : participants.user1Name,
              userEmail: participants.user1 === userId ? participants.user2Email : participants.user1Email,
              userPicture: participants.user1 === userId ? participants.user2Picture : participants.user1Picture
            }
          });
        }
      });
    }
    
    // Sort by last message time (newest first)
    userConversations.sort((a, b) => {
      const timeA = a.lastMessageTime?.seconds || a.lastMessageTime || a.createdAt?.seconds || a.createdAt || 0;
      const timeB = b.lastMessageTime?.seconds || b.lastMessageTime || b.createdAt?.seconds || b.createdAt || 0;
      return timeB - timeA;
    });
    
    callback(userConversations);
  });
  
  return () => off(conversationsRef, 'value', unsubscribe);
},

// Mark messages as read
async markMessagesAsRead(conversationId, userId) {
  try {
    const messagesRef = ref(db, `messages/${conversationId}`);
    const snapshot = await get(messagesRef);
    
    const updates = {};
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        if (message.senderId !== userId && !message.read) {
          updates[`${childSnapshot.key}/read`] = true;
        }
      });
    }
    
    if (Object.keys(updates).length > 0) {
      await update(messagesRef, updates);
    }

    
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
}
};

export const statsDB = {
  async getDashboardStats(userId = null) {
    let stats = {
      totalRequests: 0,
      totalOffers: 0,
      myRequests: 0,
      myOffers: 0,
      totalUsers: 0,
      deactivatedUsers: 0,
      reportedPosts: 0,
      keptPosts: 0
    };

    try {

      const requests = await postsDB.getPosts('requests');
      stats.totalRequests = requests.length;
      if (userId) {
        stats.myRequests = requests.filter(req => req.userId === userId).length;
      }

      const offers = await postsDB.getPosts('offers');
      stats.totalOffers = offers.length;
      if (userId) {
        stats.myOffers = offers.filter(offer => offer.userId === userId).length;
      }

      const users = await adminDB.getAllUsers();
      stats.totalUsers = users.length;

      const deactivatedUsers = await adminDB.getDeactivatedUsers();
      stats.deactivatedUsers = deactivatedUsers.length;

      const reportedPosts = await adminDB.getReportedPosts();
      stats.reportedPosts = reportedPosts.length;


      const allPosts = [...requests, ...offers];
      stats.keptPosts = allPosts.length - stats.reportedPosts;

    } catch (error) {
      console.error('Error getting dashboard stats:', error);
    }

    return stats;
  }
};