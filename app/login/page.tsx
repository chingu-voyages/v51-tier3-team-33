"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="h-screen flex flex-col gap-3 items-center  ">
      <Image
        src={
          "/images/logo/logo-color.png"
        }
        alt="Logo"
        width={393}
        height={476}
      />
      <div className="flex flex-col gap-3 items-center mt-20">
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
      <h3 className="mt-auto mb-5 font-medium text-base text-[#71727A]">
        Not a member?{" "}
        <span className="text-[#57893C]">
          Register now
        </span>
      </h3>
    </div>
  );
};

export default Page;
