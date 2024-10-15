'use client';

import { useUserContext } from '../../context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const GroupsList: React.FC = () => {
  const router = useRouter();
  const {  userGroups } = useUserContext();

  return (
    <div className='flex flex-col items-center justify-between mt-10 ml-2'>
      <div className='flex grow gap-4 items-center justify-center'>
        <h1 className='text-lg font-semibold text-grey hidden md:block'>
          Your groups
        </h1>
        <Button
          className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'
          type='button'
          onClick={() => router.push('/groups/add')}>
          Add Group
        </Button>
      </div>
      {/* list */}
      <ScrollArea className='h-72 w-full hidden md:block '>
        <ul className='mt-5'>
          {userGroups.map((group) => {
            return (
              <li
                key={group._id}
                className=' flex h-[48px] w-64 grow items-center gap-2 rounded-md hover:font-bold p-4 px-5'>
                <Image
                  src={'/images/logo/logo-icon.png'}
                  alt='Group Avatar'
                  width={100}
                  height={100}
                  className='w-10 h-10 rounded-full'
                />
                <span className='font-medium hover:font-bold'>
                  {group.name}
                </span>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default GroupsList;
