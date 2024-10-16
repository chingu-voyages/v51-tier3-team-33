'use client';
import React from 'react';
import { useUserContext } from '../../../context/UserContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


const Friends = () => {
  const { userDetails, userFriends, setUserFriends } = useUserContext();

  const { toast } = useToast();
  const router = useRouter();
  const handleDeleteFriend = async (friendId: string) => {
    try {
      const response = await fetch('api/users/removeFriend', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userDetails._id,
          friendId: friendId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting friend:', errorData.error);
        return;
      }

      const result = await response.json();
      console.log(result.message);
         setUserFriends((prevFriends) =>
           prevFriends.filter((friend) => friend._id !== friendId)
         );
         toast({
           description: 'Friend successfully deleted',
         });
     
    } catch (error) {
      console.error('Error deleting friend:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to delete friend',
      });
    }
  };

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        {' '}
        <h1 className='text-2xl font-semibold mb-4'>
          Hi {userDetails.firstName || 'User'}!
        </h1>
        <Button
          className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white  sm:hidden'
          onClick={() => router.push('/friends/add')}>
          Add Friend
        </Button>
      </div>
      <p className='font-bold'>Your friends</p>
      <ul className='mt-8'>
        {userFriends.map((friend) => (
          <li
            key={friend._id}
            className='flex items-center justify-between mb-2 p-2 border rounded-md bg-pampas'>
            <div className='flex flex-wrap items-center'>
              <Image
                src={friend.image || '/images/logo/logo-icon.png'}
                alt='Friend avatar'
                width={100}
                height={100}
                className='w-10 h-10 rounded-full mx-4'
              />
              <span className='ml-4'>{`${friend.firstName} ${friend.lastName}`}</span>
              <span className='ml-4 text-sm text-grey hidden sm:block'>{`${friend.email}`}</span>
            </div>
            <Button
              variant='destructive'
              onClick={() => handleDeleteFriend(friend._id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
