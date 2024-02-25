import GitHub from "@auth/core/providers/github";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    GitHub({
      clientId: "27a2a62c3dcf71a8b8ae",
      clientSecret: "ad3162c50841c7e5db1685746aeafa1e090713da",
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ session, user }: any) {
      if (session & user) {
        session.id = user.id;
      }
      return session;
    },
  },
});
