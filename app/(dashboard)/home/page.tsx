'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useSession } from 'next-auth/react';
import RecentActivity from './ui/recentActivity';
import ExpensesThisMonth from './ui/expensesThisMonth';
import ExpensesGraph from './ui/expensesGraph';
import { useEffect, useState } from 'react';

interface Group {
  _id: string;
  members: string[];
}

export default function Page() {
  const [userGroups, setUserGroups] = useState<number>(0);
  const [userFriends, setUserFriends] = useState<number>(0);

  const { data } = useSession();
  const userData = data?.user;
  const sessionUserId = userData?.id;

  const getUserFriends = async () => {
    if (!sessionUserId) return;
 try {
        const response = await fetch(`/api/users?id=${sessionUserId}`);
    if (!response.ok) {
      console.error('Failed to fetch user');
      return;
    }
   const userData = await response.json();
   if (!userData) {
     return;
   }
   setUserFriends(userData.user.friends.length)
    } catch (error) {
      console.error('Failed to fetch user friends')
    }
  }

  const getUserGroups = async () => {
    if (!sessionUserId) return;
    try {
      const response = await fetch('api/groups');
      const data = await response.json();
      const userGroups = data.groups.filter((group: Group) =>
        group.members.includes(sessionUserId)
      );
      setUserGroups(userGroups.length);
    } catch (error) {
      console.error('Failed to fetch groups')
    }
  }
  
  useEffect(() => {
    getUserFriends();
    getUserGroups();
  }, [sessionUserId])


  return (
    <div className='relative'>
      {/* Banner Section */}
      <div
        className='bg-cover bg-center h-48 flex items-center justify-center relative rounded-lg mb-10'
        style={{ backgroundImage: 'url(/images/logo/banner.jpg)' }}>
        <Avatar className='absolute top-40 bottom-0 right-6  rounded-full w-24 h-24'>
          <AvatarImage src={userData?.image ?? undefined} />
          <AvatarFallback>CN</AvatarFallback>{' '}
        </Avatar>
      </div>

      {/* Content Below Banner */}
      <div className='p-4'>
        <h2 className='text-xl font-semibold'>
          Hi {userData?.name || 'stranger'}!{' '}
          <span className='text-sm font-light text-grey sm:block md:inline md:ml-10'>
            {userData?.email}
          </span>
        </h2>

        <div className='mt-4 flex md:flex-row justify-between items-center'>
          <div>
            <p>
              Life time contributions:{' '}
              <span className='font-bold block'>1400$</span>
            </p>
          </div>
          <div className='flex flex-row gap-5'>
            <p>
              Groups: <span className='font-bold'>{userGroups}</span>{' '}
            </p>
            <p>
              Friends: <span className='font-bold'>{userFriends}</span>
            </p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-10 mt-10'>
          <RecentActivity />
          <ExpensesThisMonth />
        </div>
        <div className='mt-10'>
          <ExpensesGraph />
        </div>
      </div>
    </div>
  );
}
