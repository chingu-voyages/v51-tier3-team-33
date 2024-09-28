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
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-4xl font-bold text-[#57893C]">
          Welcome!
        </h1>
        <Button
          className="bg-[#57893C] w-60"
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
    </div>
  );
};

export default Page;
