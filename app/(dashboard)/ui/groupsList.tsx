import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'


// dummy group list

const groups = [
  {
    id: 101,
    name: 'Gamer Bros',
    imageUrl: '/images/avatars/groupAvatar1.png',
  },
  {
    id: 102,
    name: 'Modern Chef',
    imageUrl: '/images/avatars/groupAvatar2.png',
  },
  {
    id: 103,
    name: 'Chingus',
    imageUrl: '/images/avatars/groupAvatar3.png',
  },
  {
    id: 104,
    name: 'Tennis Club',
    imageUrl: '/images/avatars/groupAvatar4.png',
  },
];

const GroupsList = () => {
  return (
    <div className='flex flex-col items-center justify-between mt-10'>
      <div className='flex gap-4'>
        <h1 className='text-lg font-semibold text-grey pt-1'>Your groups</h1>
        <Button className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'>
          Add Group
        </Button>
      </div>
      {/* list */}
      <ul className='mt-5'>
        {groups.map((group) => {
          return (
            <li
              key={group.id}
              className='flex items-center gap-4 p-2 hover:bg-green-100 rounded-lg cursor-pointer w-64'>
              <Image
                src={group.imageUrl}
                alt='Group Avatar'
                width={100}
                height={100}
                className='w-10 h-10 rounded-full'
              />
              <span className='font-medium hover:font-bold'>{group.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GroupsList;