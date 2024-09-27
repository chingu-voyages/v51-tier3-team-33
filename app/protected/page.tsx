"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const ProtectedPage = () => {
  const { data } = useSession();

  console.log(data?.user)

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      This is a Protected route
      <div className=" flex flex-col items-center p-1 border rounded-md">
        <Image
          src={data?.user?.image || ""}
          alt="USER AVATAR"
          width={120}
          height={120}
        />
        <span>{data?.user?.name}</span>
        <span>{data?.user?.email}</span>
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default ProtectedPage;
