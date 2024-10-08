'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

// dummy group list

const friends = [
  {
    id: 101,
    name: 'Scotty Schuster',
    imageUrl: '/images/avatars/avatar1.png',
  },
  {
    id: 102,
    name: 'Dominic Morar',
    imageUrl: '/images/avatars/avatar2.png',
  },
  {
    id: 103,
    name: 'Elizabeth Nienow',
    imageUrl: '/images/avatars/avatar3.png',
  },
  {
    id: 104,
    name: 'Parher Berge',
    imageUrl: '/images/avatars/avatar4.png',
  },
];

//TO DO: get user from the db and display their friends here

const FriendsList = () => {

  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-between mt-10 ml-2'>
      <div className='flex gap-4 items-center justify-center'>
        <h1 className='text-lg font-semibold text-grey'>Your friends</h1>
        <Button
          className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'
          onClick={() => router.push('/friends/add')}>
          Add Friend
        </Button>
      </div>
      {/* list */}
      <ul className='mt-5'>
        {friends.map((friend) => {
          return (
            <li
              key={friend.id}
              className=' flex h-[48px] w-64 grow items-center gap-2 rounded-md hover:font-bold p-4 px-5'>
              <Image
                src={friend.imageUrl}
                alt='Group Avatar'
                width={100}
                height={100}
                className='w-10 h-10 rounded-full'
              />
              <span className='font-medium hover:font-bold'>{friend.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendsList;
