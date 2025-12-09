// lib/firebaseHelpers.js
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
      const postsRef = ref(db, `${type}s`);
      const newPostRef = push(postsRef);
      await set(newPostRef, {
        ...postData,
        type: type,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active'
      });
      return { id: newPostRef.key, ...postData };
    },
  
    // Get all posts (requests or offers)
    async getPosts(type, filters = {}) {
      const postsRef = ref(db, `${type}s`);
      let postsQuery = postsRef;
      
      // Apply filters
      if (filters.userId) {
        postsQuery = query(postsRef, orderByChild('userId'), equalTo(filters.userId));
      }
      
      const snapshot = await get(postsQuery);
      const posts = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const post = {
            id: childSnapshot.key,
            ...childSnapshot.val()
          };
          
          // Apply additional filters
          if (filters.status && post.status !== filters.status) return;
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const matches = 
              (post.title && post.title.toLowerCase().includes(query)) ||
              (post.description && post.description.toLowerCase().includes(query)) ||
              (post.category && post.category.toLowerCase().includes(query)) ||
              (post.location && post.location.toLowerCase().includes(query)) ||
              (post.skills && Array.isArray(post.skills) && 
                post.skills.some(skill => skill.toLowerCase().includes(query))) ||
              (post.skillsOffered && Array.isArray(post.skillsOffered) && 
                post.skillsOffered.some(skill => skill.toLowerCase().includes(query)));
            if (!matches) return;
          }
          
          posts.push(post);
        });
      }
      
      return posts;
    },
  
    // Listen to posts in real-time
    listenToPosts(type, filters = {}, callback) {
      const postsRef = ref(db, `${type}s`);
      let postsQuery = postsRef;
      
      if (filters.userId) {
        postsQuery = query(postsRef, orderByChild('userId'), equalTo(filters.userId));
      }
      
      const unsubscribe = onValue(postsQuery, (snapshot) => {
        const posts = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const post = {
              id: childSnapshot.key,
              ...childSnapshot.val()
            };
            
            // Apply additional filters
            if (filters.status && post.status !== filters.status) return;
            if (filters.searchQuery) {
              const query = filters.searchQuery.toLowerCase();
              const matches = 
                (post.title && post.title.toLowerCase().includes(query)) ||
                (post.description && post.description.toLowerCase().includes(query)) ||
                (post.category && post.category.toLowerCase().includes(query)) ||
                (post.location && post.location.toLowerCase().includes(query)) ||
                (post.skills && Array.isArray(post.skills) && 
                  post.skills.some(skill => skill.toLowerCase().includes(query))) ||
                (post.skillsOffered && Array.isArray(post.skillsOffered) && 
                  post.skillsOffered.some(skill => skill.toLowerCase().includes(query)));
              if (!matches) return;
            }
            
            posts.push(post);
          });
        }
        callback(posts);
      });
      
      return () => off(postsQuery, 'value', unsubscribe);
    },
  
    // Update a post
    async updatePost(type, postId, updates) {
      const postRef = ref(db, `${type}s/${postId}`);
      await update(postRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    },
  
    // Delete a post
    async deletePost(type, postId) {
      const postRef = ref(db, `${type}s/${postId}`);
      await remove(postRef);
    },
  
    // Report a post
    async reportPost(type, postId, reportData) {
      const reportRef = ref(db, `reports/${type}s/${postId}`);
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
        snapshot.forEach((typeSnapshot) => {
          const postType = typeSnapshot.key;
          typeSnapshot.forEach((postSnapshot) => {
            postSnapshot.forEach((reportSnapshot) => {
              reportedPosts.push({
                id: postSnapshot.key,
                type: postType.replace('s', ''), // Remove 's' from 'requests' or 'offers'
                reportId: reportSnapshot.key,
                ...reportSnapshot.val(),
                ...(await this.getPostDetails(postType, postSnapshot.key))
              });
            });
          });
        });
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
  
  // Dashboard stats
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
        // Get requests
        const requests = await postsDB.getPosts('requests');
        stats.totalRequests = requests.length;
        if (userId) {
          stats.myRequests = requests.filter(req => req.userId === userId).length;
        }
  
        // Get offers
        const offers = await postsDB.getPosts('offers');
        stats.totalOffers = offers.length;
        if (userId) {
          stats.myOffers = offers.filter(offer => offer.userId === userId).length;
        }
  
        // Get users
        const users = await adminDB.getAllUsers();
        stats.totalUsers = users.length;
  
        // Get deactivated users
        const deactivatedUsers = await adminDB.getDeactivatedUsers();
        stats.deactivatedUsers = deactivatedUsers.length;
  
        // Get reported posts
        const reportedPosts = await adminDB.getReportedPosts();
        stats.reportedPosts = reportedPosts.length;
  
        // Calculate kept posts (active posts - reported posts)
        const allPosts = [...requests, ...offers];
        stats.keptPosts = allPosts.length - stats.reportedPosts;
  
      } catch (error) {
        console.error('Error getting dashboard stats:', error);
      }
  
      return stats;
    }
  };