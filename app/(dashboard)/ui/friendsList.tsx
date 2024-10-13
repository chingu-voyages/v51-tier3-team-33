'use client'

import { useUserContext } from '../../context/UserContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

const FriendsList: React.FC = () => {

const {  userFriends } = useUserContext();
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
      <ScrollArea className='h-72 w-full '>
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
