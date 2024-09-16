import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const OAuthSessionProvider = ({
  session,
  children,
}: Readonly<{ session?: Session; children: ReactNode }>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default OAuthSessionProvider;
