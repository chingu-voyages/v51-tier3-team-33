'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import AddNewMemberForm from './addNewMemberForm';

//fake data generator - remove after connecting to db
import { generateFakeMembers } from '@/utils/generateFakeMembers';

interface Member {
  id: number;
  name: string;
  email: string;
  venmo: string;
}

const fakeMembers = generateFakeMembers(3);

const NewGroupForm: React.FC = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const [members, setMembers] = useState<Member[]>([]);
  const [groupType, setGroupType] = useState<string | null>(null);
  //remove this useeffect and fakemembers when db is connected

  useEffect(() => {
    setMembers(fakeMembers);
  }, []);

  const onSubmit = (data: any) => {
    console.log('From data:', data);
    reset();
  };

  const handleGroupTypeSelect = (type: string) => {
    setGroupType(type);
    setValue('groupType', type);
  };

  const handleDeleteMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

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
              key={member.id}
              className='flex items-center justify-between border bg-muted'>
              <div className='ml-2'>
                <p className='font-semibold'>{member.name}</p>
                <p>{member.email}</p>
              </div>
              <div>
                <Button
                  type='button'
                  className='bg-red mr-2'
                  onClick={() => handleDeleteMember(member.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <AddNewMemberForm />

        </div>
        <div className='flex justify-center gap-4 mt-4'>
          <Button
            type='button'
            onClick={() => reset()}
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
