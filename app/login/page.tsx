"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center  '>
      <Image
        className='mb-10'
        width={200}
        height={200}
        src={'/images/logo/logo-color.png'}
        alt='Logo'
      />
      <div className='flex flex-col gap-3 items-center mt-20'>
        <h1 className='text-4xl font-bold text-[#57893C]'>Welcome!</h1>
        <Button
          className='bg-[#57893C] w-80'
          onClick={() =>
            signIn('google', { callbackUrl: 'http://localhost:3000/' })
          }>
          {' '}
          Continue with Google
        </Button>
        <Link
          href={'/home'}
          className='p-3 bg-white bg-opacity-5 rounded-md font-bold text-[#57893C]'>
          {' '}
          Continue as a guest
        </Link>
      </div>
      <Link
        className='flex justify-center gap-1 font-medium text-base text-[#71727A]'
        href={'/register'}>
        Not a member? <span className='text-[#57893C]'>Register now</span>
      </Link>
    </div>
  );
};

export default Page;
