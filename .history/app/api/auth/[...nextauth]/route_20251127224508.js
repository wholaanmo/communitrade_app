import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async jwt({ token, account, profile }) {
      if (profile?.email) {
        token.email = profile.email;
        // Check if user is admin
        token.isAdmin = profile.email === ADMIN_EMAIL;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email;
      session.user.isAdmin = token.isAdmin;
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