'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useSession } from 'next-auth/react';
import RecentActivity from './ui/recentActivity';
import ExpensesThisMonth from './ui/expensesThisMonth';
import ExpensesGraph from './ui/expensesGraph';


export default function Page() {
  const { data } = useSession();
  console.log('data', data?.user);
  const userData = data?.user;

  return (
    <div className='relative'>
      {/* Banner Section */}
      <div
        className='bg-cover bg-center h-48 flex items-center justify-center relative rounded-lg mb-10'
        style={{ backgroundImage: 'url(https://via.placeholder.com/800x300)' }}>
        <Avatar className='absolute top-40 bottom-0 right-6  rounded-full w-24 h-24'>
          <AvatarImage src={userData?.image} />
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
              Groups: <span className='font-bold'>4</span>{' '}
            </p>
            <p>
              Friends: <span className='font-bold'>5</span>
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
