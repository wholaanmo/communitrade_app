import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
        token.email = profile.email; // store email inside token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email; // expose email in session
      return session;
    },
  },
});

export { handler as GET, handler as POST };
