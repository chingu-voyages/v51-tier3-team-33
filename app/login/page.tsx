"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center ">
      <h1 className="text-4xl font-bold text-[#57893C]">
        Welcome!
      </h1>
      <Button
        className="bg-[#57893C]"
        onClick={() => signIn("google")}
      >
        {" "}
        Sign in with Google
      </Button>
      <Link
        href={"/home"}
        className="p-3 bg-white bg-opacity-5 rounded-md font-bold text-[#57893C]"
      >
        {" "}
        Continue as a guest
      </Link>
    </div>
  );
};

export default Page;
