'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import AddNewMemberForm from './addNewMemberForm';
import { useSession } from 'next-auth/react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const NewGroupForm: React.FC = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const [members, setMembers] = useState<User[]>([]);
  const [groupType, setGroupType] = useState<string | null>(null);


  const { data } = useSession();
  const currentUserId = data?.user?.id;

  console.log(members)
    //TO DO TO DO TO DO
    //create pop up - success

    const addNewGroupToDatabase = async (data: any) => {
      try {
        const response = await fetch('/api/groups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.groupName,
            description: data.groupType,
            budget: data.groupBudget,
            user_id: currentUserId,
            members: data.groupMembers,
          }),
        });

        if (!response.ok) {
          throw new Error('failed to create group');
        }

        const result = await response.json();
        console.log('Group created successfully', result);

      } catch (error) {
        console.error('Error creating group:', error)
}
    }
    
  const onSubmit = async (data: any) => {
    console.log('Form data:', data);
    //Ensure current user is in the members array
    const allGroupMembers = [
      currentUserId,
      ...members.map((member) => member._id),
    ];

    console.log('AllGroupMembers',allGroupMembers);

    await addNewGroupToDatabase({
      ...data,
      members: allGroupMembers,
    });

    // Reset form and members after successful creation
    reset();
    setMembers([]);
    setGroupType(null);
  };

  const handleGroupTypeSelect = (type: string) => {
    setGroupType(type);
    setValue('groupType', type);
  };

  const handleDeleteMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member._id !== id));
  };

  const handleAddMember = (newMember: User) => {
    
    setMembers((prevMembers) => {
      //check for duplicates
      if (prevMembers.some(member => member._id === newMember._id)) {
        return prevMembers; //if member already exists return previous state
      }
      //if the member doesn;t exist, add them to array
      const updatedMembers = [newMember, ...prevMembers];

      //update the form value
      setValue('groupMembers', updatedMembers); 
      return updatedMembers
    });           
  }
  
  const handleFormReset = () => {
    reset();
    setMembers([]);
    setGroupType(null);
  }

  return (
    <form
      className='flex flex-col p-5'
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-2xl font-bold mb-4'>New Group</h1>
      <div className='mb-4'>
        <h2 className='text-lg mb-2'>Group Type</h2>
        <div className='flex gap-2'>
          {['trip', 'party', 'dining', 'housing', 'other'].map((type) => (
            <Button
              type='button'
              className={`bg-green-300 text-white ${
                groupType === type ? 'font-bold bg-black' : ''
              }`}
              key={type}
              onClick={() => handleGroupTypeSelect(type)}>
              {type.toUpperCase()}
            </Button>
          ))}
        </div>
        <div className='my-4'>
          <label className='block text-lg mb-2'>Group Name</label>
          <Input
            {...register('groupName', { required: true })}
            placeholder='Enter group name'
            type='text'
            name='groupName'
            maxLength={50}
          />
        </div>
        <div className='my-4'>
          <label className='block  text-lg mb-2'>Group Budget</label>
          <Input
            {...register('groupBudget', { required: true })}
            placeholder='Enter group budget'
            type='number'
            name='groupBudget'
          />
        </div>
        <div className='mb-4 flex flex-col'>
          <h2 className='text-lg font-semibold mb-2'>Members</h2>
          {members.length === 0 && (
            <p>Click the button below to add members to this group.</p>
          )}
          {members.map((member) => (
            <div
              key={member._id}
              className='flex items-center justify-between border bg-muted'>
              <div className='ml-2'>
                <p className='font-semibold'>
                  {member.firstName} {member.lastName}
                </p>
                <p>{member.email}</p>
              </div>
              <div>
                <Button
                  type='button'
                  className='bg-red mr-2'
                  onClick={() => handleDeleteMember(member._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <AddNewMemberForm onAddMember={handleAddMember} />
        </div>
        <div className='flex justify-center gap-4 mt-4'>
          <Button
            type='button'
            onClick={handleFormReset}
            className='bg-gray-500 text-white'>
            Cancel
          </Button>
          <Button
            type='submit'
            className='bg-blue-500 text-white'>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewGroupForm;
