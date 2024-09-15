// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLinks from './navlinks';


export default function SideNav(){
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2 bg-merino'>
      <Link
        className='mb-2 flex h-20 items-center justify-center p-4 md:h-40'
        href='/'>
        {/* <Image src={logo} alt='Logo' width={100}/> */}
        <h1>logo will be here</h1>
      </Link>
      <NavLinks />
    </div>
  );
}

