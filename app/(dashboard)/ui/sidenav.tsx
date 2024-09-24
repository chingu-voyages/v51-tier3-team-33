import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLinks from './navlinks';
import GroupsList from './groupsList';
import FriendsList from './friendsList';

export default function SideNav() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2 bg-merino'>
      <Link
        className='mb-2 flex h-20 items-center justify-center p-4 md:h-40'
        href='/home'>
        <Image
          src={'/images/logo/app-logo-landscape.png'}
          alt='Logo'
          width={250}
          height={100}
        />
      </Link>
      <NavLinks />
      <GroupsList />
      <FriendsList />
    </div>
  );
}
