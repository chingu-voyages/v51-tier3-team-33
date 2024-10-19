'use client';

import React, { useState } from 'react';
import { useUserContext } from '../../../../context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import AddNewMemberForm from './addNewMemberForm';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface NewGroupFormData {
  groupName: string;
  groupBudget: number;
  groupType: string;
  groupMembers: string[];
}

const NewGroupForm: React.FC = () => {
  const { register, handleSubmit, reset, setValue } =
    useForm<NewGroupFormData>();

  const [members, setMembers] = useState<User[]>([]);
  const [groupType, setGroupType] = useState<string | null>(null);

  const { userDetails, setUserGroups } = useUserContext();
 
  const currentUserId = userDetails._id;
  const { toast } = useToast();
   
  const addNewGroupToDatabase = async (data: NewGroupFormData) => {
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
      if (result.success) {
        setUserGroups(prevGroups => [ result.group, ...prevGroups]);
        toast({
          description: 'New group created successfully!.',
        });
      }
    } catch (error) {
       toast({
         variant: 'destructive',
         title: 'Uh oh! Something went wrong.',
         description: 'There was a problem creating a group.',
         action: <ToastAction altText='Try again'>Try again</ToastAction>,
       });
      console.error('Error creating group:', error);
    }
  };

  const onSubmit: SubmitHandler<NewGroupFormData> = async (data) => {
    console.log('Form data:', data);

    //console.log('AllGroupMembers', allGroupMembers);

    await addNewGroupToDatabase(data);

    // Reset form and members after successful creation
    reset();
    setMembers([]);
    setGroupType(null);
  };

  const handleGroupTypeSelect = (type: string) => {
    setGroupType(type);
    setValue('groupType', type);
  };

  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member._id !== id));
  };

  const handleAddMember = (newMember: User) => {
    setMembers((prevMembers) => {
      //check for duplicates
      if (prevMembers.some((member) => member._id === newMember._id)) {
        return prevMembers; //if member already exists return previous state
      }
      //if the member doesn;t exist, add them to array
      const updatedMembers = [newMember, ...prevMembers];

      //update the form value
      setValue(
        'groupMembers',
        updatedMembers.map((member) => member._id)
      );
      return updatedMembers;
    });
  };

  const handleFormReset = () => {
    reset();
    setMembers([]);
    setGroupType(null);
  };

  return (
    <form
      className='flex flex-col p-5 w-[350px] md:w-full md:max-w-[650px] border rounded'
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-2xl font-bold mb-4'>New Group</h1>
      <div className='mb-4'>
        <h2 className='text-lg mb-2'>Group Type</h2>
        <div className='flex flex-wrap gap-2'>
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
