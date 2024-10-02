'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Group {
  _id: string;
  name: string;
  members: string[];
}

interface ApiResponse {
  success: boolean;
  groups: Group[];
}

const GroupsList: React.FC = () => {
  const router = useRouter();
  const { data } = useSession();
  const userData = data?.user;

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }
        const data: ApiResponse = await response.json();
        //filter groups where user is a member
        if (data.success) {
          const userGroups = userData?.id
            ? data.groups.filter((group) =>
              group.members.includes(userData.id!))
            : [];
          
           setGroups(userGroups);  
        } else {
          console.error("Failed to fetch groups:", data)
}
       
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    if (userData) {
      fetchGroups();
    }
  }, [userData]);

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
              key={group._id}
              className=' flex h-[48px] w-64 grow items-center gap-2 rounded-md hover:font-bold p-4 px-5'>
              <Image
                src={'/images/logo/logo-icon.png'}
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
};

export default GroupsList;
