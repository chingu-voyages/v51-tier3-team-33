import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = !!auth?.user; // check if user session exists
      const isLandingPage = nextUrl.pathname === '/';
      const isDashboard = nextUrl.pathname.startsWith('/dashboard');
      const query = new URLSearchParams(nextUrl.search);
      const intendedURL = query.get('callbackUrl');
      const isLoginPage = nextUrl.pathname.startsWith('/login');

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
        const response = await fetch(`${process.env.BASE_URL}/api/auth/user/${session.user.email}`)
        
        if (response.status === 404) {
          return {};
        }
       
        const userData = await response.json();
        session.user.id = userData.user._id; // gives the session the user id from the database
        
        return session;
      } catch (error) {
        console.log(error);
        return {};
      }
    },

    async signIn({ account, profile } ): Promise<any> {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/auth/user/${profile?.email}`)

        if (response.status === 404) {
          await fetch(`${process.env.BASE_URL}/api/auth/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: profile?.given_name,
              lastName: profile?.family_name,
              email: profile?.email,
              image: profile?.picture
            })
          })
        }

        else { //add user to database
          const userData = await response.json();
          console.log("User already exists", userData)
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  },
  providers: [],
  trustHost: true,
} satisfies NextAuthConfig;
