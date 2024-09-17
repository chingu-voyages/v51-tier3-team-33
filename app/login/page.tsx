"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Button onClick={() => signIn("google")}> Login with google</Button>
      <Link href={"/"}> Go to home</Link>
    </div>
  );
};

export default Page;
