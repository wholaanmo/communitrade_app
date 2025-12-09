// context/AuthContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signOut,
  signInWithPopup,
  GoogleAuthProvider 
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "@/lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Create/update user in Realtime Database
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        
        try {
          const snapshot = await get(userRef);
          if (!snapshot.exists()) {
            // Create new user record
            await set(userRef, {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              createdAt: Date.now(),
              role: "user",
              provider: firebaseUser.providerData[0]?.providerId || "unknown"
            });
          } else {
            // Update last login time
            await set(ref(db, `users/${firebaseUser.uid}/lastLogin`), Date.now());
          }
        } catch (error) {
          console.error("Error handling user data:", error);
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};