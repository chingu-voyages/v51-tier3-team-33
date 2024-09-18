import { Button } from '@/components/ui/button';
import Image from 'next/image';
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

const FriendsList = () => {
  return (
    <div className='flex flex-col items-center justify-between mt-10'>
      <div className='flex gap-4'>
        <h1 className='text-lg font-semibold text-grey pt-1'>Your friends</h1>
        <Button className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'>
          Add Friend
        </Button>
      </div>
      {/* list */}
      <ul className='mt-5'>
        {friends.map((friend) => {
          return (
            <li
              key={friend.id}
              className='flex items-center gap-4 p-2 hover:bg-green-100 rounded-lg cursor-pointer w-64'>
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
