import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
