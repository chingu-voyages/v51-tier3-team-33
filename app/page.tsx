'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Login from './login/page';

export default function Home() {
  const { data } = useSession();
  const userName = data?.user?.name;

  if (userName) {
     return (
       <main className='h-screen flex flex-col items-center justify-center '>
         <Image
           className='mb-10'
           width={200}
           height={200}
           src={'/images/logo/logo-color.png'}
           alt='Logo'
         />
         <h1 className='mb-10'>Hi {userName}!</h1>
         <Link
           href={'/home'}
           className='bg-green-300 p-3 rounded-md'>
           Go to Dashboard
         </Link>
       </main>
     );
  } else {
    return <Login />
  }
 
}
