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
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },

  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };