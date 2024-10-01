'use client'

import { useRouter } from 'next/navigation'
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
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-between mt-10 ml-2'>
      <div className='flex grow gap-4 items-center justify-center'>
        <h1 className='text-lg font-semibold text-grey'>Your groups</h1>
        <Button
          className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'
          type='button'
          onClick={() => router.push('/groups/add')}>
          Add Group
        </Button>
      </div>
      {/* list */}
      <ul className='mt-5'>
        {groups.map((group) => {
          return (
            <li
              key={group.id}
              className=' flex h-[48px] w-64 grow items-center gap-2 rounded-md hover:font-bold p-4 px-5'>
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