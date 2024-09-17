import type { NextAuthConfig } from "next-auth";

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
    async signIn({ account, profile }): Promise<any> {
      if (account?.provider === "google") {
        if (profile?.email_verified) {
          return true;
        }
      }
      return false;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
