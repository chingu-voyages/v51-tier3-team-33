'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  image?: string;
}

const FriendsList: React.FC = () => {

  const [userFriends, setUserFriends] = useState<User[]>([]);
  const router = useRouter();
  const { data } = useSession();
  const userId = data?.user?.id;

  const getSessionUserFriends = async () => {
    if (!userId) return;
    try {
        const response = await fetch(`/api/users?id=${userId}`);
    if (!response.ok) {
      console.error('Failed to fetch user');
      return;
    }
      const userData = await response.json();
     // console.log('friends', userData.user.friends)
    const sessionUserFriends: string[] = userData.user.friends;
    
    const result = await fetch(`/api/users`);
    if (!result.ok) {
      console.error('Failed to fetch all users');
      return;
    }

    const allUsersData = await result.json();
    const friendsData = allUsersData.users.filter((user: User) => sessionUserFriends.includes(user._id));
    setUserFriends(friendsData);
    } catch (error) {
      console.error('Error fetching friends:', error)
    } 
  };

  useEffect(() => {
    getSessionUserFriends();   
  }, [userId]);


  return (
    <div className='flex flex-col items-center justify-between mt-10 ml-2'>
      <div className='flex gap-4 items-center justify-center'>
        <h1 className='text-lg font-semibold text-grey hidden md:block'>
          Your friends
        </h1>
        <Button
          className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'
          onClick={() => router.push('/friends/add')}>
          Add Friend
        </Button>
      </div>
      {/* list */}
      <ScrollArea className='h-72 w-full hidden md:block'>
        <ul className='mt-5'>
          {userFriends.map((friend) => {
            return (
              <li
                key={friend._id}
                className=' flex h-[48px] w-64 grow items-center gap-2 rounded-md hover:font-bold p-4 px-5'>
                <Image
                  src={friend.image || '/images/logo/logo-icon.png'}
                  alt='Friend avatar'
                  width={100}
                  height={100}
                  className='w-10 h-10 rounded-full'
                />
                <span className='font-medium hover:font-bold'>
                  {friend.firstName} {friend.lastName}
                </span>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default FriendsList;
