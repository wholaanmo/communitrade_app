// lib/firebaseDB.js
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
  
    // Listen to user changes
    listenToUser(userId, callback) {
      const userRef = ref(db, `users/${userId}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        callback(snapshot.exists() ? snapshot.val() : null);
      });
      return () => off(userRef, 'value', unsubscribe);
    }
  };
  
  // Requests operations
  export const requestDB = {
    // Create a new request
    async createRequest(requestData) {
      const requestsRef = ref(db, 'requests');
      const newRequestRef = push(requestsRef);
      await set(newRequestRef, {
        ...requestData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return newRequestRef.key;
    },
  
    // Get user's requests
    async getUserRequests(userId) {
      const requestsRef = ref(db, 'requests');
      const userRequestsQuery = query(
        requestsRef,
        orderByChild('userId'),
        equalTo(userId)
      );
      
      const snapshot = await get(userRequestsQuery);
      const requests = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          requests.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      
      return requests;
    },
  
    // Listen to user's requests in real-time
    listenToUserRequests(userId, callback) {
      const requestsRef = ref(db, 'requests');
      const userRequestsQuery = query(
        requestsRef,
        orderByChild('userId'),
        equalTo(userId)
      );
      
      const unsubscribe = onValue(userRequestsQuery, (snapshot) => {
        const requests = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            requests.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
        }
        callback(requests);
      });
      
      return () => off(userRequestsQuery, 'value', unsubscribe);
    },
  
    // Update request
    async updateRequest(requestId, updates) {
      const requestRef = ref(db, `requests/${requestId}`);
      await update(requestRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    },
  
    // Delete request
    async deleteRequest(requestId) {
      const requestRef = ref(db, `requests/${requestId}`);
      await remove(requestRef);
    }
  };
  
  // Offers operations
  export const offerDB = {
    // Similar structure as requestDB
    async createOffer(offerData) {
      const offersRef = ref(db, 'offers');
      const newOfferRef = push(offersRef);
      await set(newOfferRef, {
        ...offerData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return newOfferRef.key;
    },
  
    // Get user's offers
    async getUserOffers(userId) {
      const offersRef = ref(db, 'offers');
      const userOffersQuery = query(
        offersRef,
        orderByChild('userId'),
        equalTo(userId)
      );
      
      const snapshot = await get(userOffersQuery);
      const offers = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          offers.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      
      return offers;
    },
  
    // Listen to user's offers in real-time
    listenToUserOffers(userId, callback) {
      const offersRef = ref(db, 'offers');
      const userOffersQuery = query(
        offersRef,
        orderByChild('userId'),
        equalTo(userId)
      );
      
      const unsubscribe = onValue(userOffersQuery, (snapshot) => {
        const offers = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            offers.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
        }
        callback(offers);
      });
      
      return () => off(userOffersQuery, 'value', unsubscribe);
    }
  };
  
  // Messages operations
  export const messageDB = {
    // Create a message
    async createMessage(messageData) {
      const messagesRef = ref(db, 'messages');
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        ...messageData,
        createdAt: serverTimestamp(),
        read: false,
      });
      return newMessageRef.key;
    },
  
    // Get conversation between two users
    async getConversation(userId1, userId2) {
      const messagesRef = ref(db, 'messages');
      const conversationQuery = query(
        messagesRef,
        orderByChild('participants'),
        equalTo([userId1, userId2].sort().join('_'))
      );
      
      const snapshot = await get(conversationQuery);
      const messages = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          messages.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      
      return messages.sort((a, b) => a.createdAt - b.createdAt);
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
  
    // Get all requests
    async getAllRequests() {
      const requestsRef = ref(db, 'requests');
      const snapshot = await get(requestsRef);
      const requests = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          requests.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      
      return requests;
    },
  
    // Get all offers
    async getAllOffers() {
      const offersRef = ref(db, 'offers');
      const snapshot = await get(offersRef);
      const offers = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          offers.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      
      return offers;
    }
  };