"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const Page = () => {
  return (
    <div>
      <Button onClick={() => signIn("google")}> Login with google</Button>
    </div>
  );
};

export default Page;
