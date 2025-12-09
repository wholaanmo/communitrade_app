import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { userDB } from "@/lib/firebaseDB";

const ADMIN_EMAIL = "floresjamaicamae30@gmail.com";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (profile?.email) {
          // Save/update user in Firebase
          await userDB.createUser(user.id, {
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            role: profile.email === ADMIN_EMAIL ? "admin" : "user",
            provider: account.provider,
          });
        }
        return true;
      } catch (error) {
        console.error("Error saving user to Firebase:", error);
        return true;
      }
    },

    async jwt({ token, account, profile }) {
      if (profile?.email) {
        token.email = profile.email;
        // Check if user is admin
        token.isAdmin = profile.email === ADMIN_EMAIL;
        token.uid = token.sub; 
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email;
      session.user.isAdmin = token.isAdmin;
      session.user.uid = token.uid;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to our custom redirect page after sign in
      return `${baseUrl}/auth/redirect`;
    }
  },

  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };