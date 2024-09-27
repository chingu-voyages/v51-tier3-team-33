import type { NextAuthConfig } from "next-auth";
import dbConnect from "./lib/dbConnect";
import User from "./models/Users";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = !!auth?.user; // check if user session exists
      const isLandingPage = nextUrl.pathname === "/";
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      const query = new URLSearchParams(nextUrl.search);
      const intendedURL = query.get("callbackUrl");
      const isLoginPage = nextUrl.pathname.startsWith("/login");

      if (isLandingPage) return true;

      if (isDashboard) {
        if (isAuthenticated) return true;
        return false;
      } else if (isLoginPage && intendedURL) {
        if (isAuthenticated) return Response.redirect(new URL(intendedURL));
      }

      return true;
    },

    async session({ session }): Promise<any> {
      try {
        await dbConnect();
        const sessionUser = await User.findOne({email: session.user.email});
        session.user.id = sessionUser.id; // gives the session the user id from the database

      } catch (error) {
        console.log(error)
      }
      
      return session;
    },

    async signIn({ account, profile }): Promise<any> {
      
      if (account?.provider === "google") {
        if (!profile?.email_verified) {
          return false;
        }
      }

      try {
        await dbConnect();
        const userExists = await User.findOne({email: profile?.email});

        if (!userExists) {
          const user = await User.create({
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            email: profile?.email,
            image: profile?.picture
          })

          console.log(user);
        }

        else {
          console.log("User already exists", userExists);
        }

        return true;

      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
