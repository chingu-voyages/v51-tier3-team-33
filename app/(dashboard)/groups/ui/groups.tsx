'use client';
import React from 'react';
import { useUserContext } from '../../../context/UserContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { HoverView } from './hoverCard';

interface Group {
  _id: string;
  name: string;
  members: string[];
  budget: number;
  description: string;
  expenses: string[];
  invite_link: string;
}

const Groups = () => {
  const { userDetails, userGroups, setUserGroups } = useUserContext();

  console.log(userGroups);
  const { toast } = useToast();
  const router = useRouter();

  //TO DO TO DO implement deletion
  const handleDeleteGroup = async (groupId: string) => {
    console.log('deleting', groupId);
    try {
      const response = await fetch(`api/groups/${groupId}/deleteGroup`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting group:', errorData.error);
        return;
      }
      const result = await response.json();
      console.log(result.message);
      setUserGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
      toast({
        description: 'Group successfully deleted',
      });
    } catch (error) {
      console.error('Error deleting group', error);
      toast({
        variant: 'destructive',
        description: 'Failed to delete group',
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
          onClick={() => router.push('/groups/add')}>
          Add Group
        </Button>
      </div>
      <p className='font-bold'>Your groups</p>
      <ul className='mt-8'>
        {userGroups.map((group: Group) => (
          <li
            key={group._id}
            className='flex items-center justify-between mb-2 p-2 border rounded-md bg-pampas'>
            <HoverView group={group} />
            <Button
              variant='destructive'
              onClick={() => handleDeleteGroup(group._id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
