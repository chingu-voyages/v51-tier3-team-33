"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="h-dvh flex flex-col items-center ">
      <img
        className="w-dvw"
        src={
          "/images/logo/logo-color.png"
        }
        alt="Logo"
      />
      <div className="flex flex-col items-center justify-center mt-10 gap-3">
        <h1 className="text-4xl font-bold text-[#57893C]">
          Welcome!
        </h1>
        <Button
          className="bg-[#57893C] w-80"
          onClick={() =>
            signIn("google")
          }
        >
          {" "}
          Continue with Google
        </Button>
        <Link
          href={"/home"}
          className="p-3 bg-white bg-opacity-5 rounded-md font-bold text-[#57893C]"
        >
          {" "}
          Continue as a guest
        </Link>
      </div>
      <Link
        className="mt-auto mb-2 gap-1 font-medium text-base text-[#71727A]"
        href={"/register"}
      >
        Not a member?{" "}
        <span className="text-[#57893C]">
          Register now
        </span>
      </Link>
    </div>
  );
};

export default Page;
