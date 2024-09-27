"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center ">
      <Button onClick={() => signIn("google")}> Login with google</Button>
      <Link href={"/dashboard"} className="p-3 bg-white bg-opacity-5 rounded-md">
        {" "}
        Dismiss
      </Link>
    </div>
  );
};

export default Page;
