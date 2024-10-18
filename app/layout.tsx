import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import OAuthSessionProvider from "./global-ui/next-auth-client/OAuthSessionProvider";
import { UserProvider } from './context/UserContext'; 
import { Toaster } from "@/components/ui/toaster";
import Footer from "./global-ui/Footer";

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
  title: 'WeSplit | Expense tracker',
  description: 'Developed by Chingu.io members: @Gary, @Olga, @Radhika, @Lidia',
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
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
