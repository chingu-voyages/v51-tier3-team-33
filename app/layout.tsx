import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import OAuthSessionProvider from "./global-ui/next-auth-client/OAuthSessionProvider";
import { UserProvider } from './context/UserContext'; 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WeSplit | Expense tracker",
  description:
    "Developed by Chingu.io member: @Jaweki, @José, @Radhika, @Gary, @Olga, @Lidia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <OAuthSessionProvider>
          <UserProvider>{children}</UserProvider>
        </OAuthSessionProvider>
      </body>
    </html>
  );
}
