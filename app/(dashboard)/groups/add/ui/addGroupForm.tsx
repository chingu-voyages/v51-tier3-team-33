'use client';

import React, { useEffect, useState } from 'react';
import { DatePicker } from '../../ui/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';

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
  const { register, reset } = useForm();

  const [members, setMembers] = useState<Member[]>([]);

  //remove this useeffect and fakemembers when db is connected

  useEffect(() => {
    setMembers(fakeMembers);
  }, []);

  return (
    <form className='flex flex-col p-5'>
      <h1 className='text-2xl font-bold mb-4'>New Group</h1>
      <div className='mb-4'>
        <h2 className='text-lg mb-2'>Type</h2>
        <div className='flex gap-2'>
          <Button
            type='button'
            className='bg-green-300 text-white'
            value='trip'>
            Trip
          </Button>
          <Button
            type='button'
            className='bg-green-300 text-white'
            value='party'>
            Party
          </Button>
          <Button
            type='button'
            className='bg-green-300 text-white'
            value='dining'>
            Dining
          </Button>
          <Button
            type='button'
            className='bg-green-300 text-white'
            value='housing'>
            Housing
          </Button>
          <Button
            type='button'
            className='bg-green-300 text-white'
            value='other'>
            Other
          </Button>
        </div>
        <div className='my-4'>
          <label className='block  text-lg mb-2'>Group Name</label>
          <Input
            {...register('groupName', { required: true })}
            placeholder='Enter group name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg mb-2'>Date</label>
          <DatePicker {...register('date')} />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Currency</label>
          <Select {...register('currency')}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a currency' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='USD'>USD</SelectItem>
                <SelectItem value='EUR'>EUR</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='mb-4 flex flex-col'>
          <h2 className='text-lg font-semibold mb-2'>Members</h2>
          {members.length === 0 && (
            <p>Click the button below to add members to this group.</p>
          )}
          {members.map((member) => (
            <div
              key={member.name}
              className='flex items-center justify-between border bg-muted'>
              <div className='ml-2'>
                <p className='font-semibold'>{member.name}</p>
                <p>{member.email}</p>
              </div>
              <div>
                <Button
                  type='button'
                  className='bg-red mr-2'>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button
            type='button'
            className='bg-green-300 text-white mt-4 w-64 mx-auto block'>
            Add Group Member
          </Button>
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
