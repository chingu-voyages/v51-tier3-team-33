'use client';

import  React, { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FormData {
  expenseName: string;
  amount: number;
  category: string;
  description: string;
  groupId: string;
  receipt?: File;
  splitOption: 'equally' | 'custom';
  isPaid: boolean;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const ExpenseForm: React.FC = () => {
  const { userGroups } = useUserContext();
    //console.log(userGroups);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [groupMembers, setGroupMembers] = useState<User[]>([])
    
    const getGroupMembersInfo = () => {

    }

    const handleCancel = () => {
        reset();
    }

    const onSubmit: SubmitHandler<FormData> = async(data) => {
         if (selectedFile) {
           data.receipt = selectedFile; // Assign the selected file to the form data
         }
        console.log('formdata', data)
    }
    

    return (
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Add New Expense</h2>
        <form
          className='space-y-4'
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            placeholder='Expense Name'
            {...register('expenseName', {
              required: true,
            })}
          />
          <Input
            type='number'
            placeholder='Amount'
            {...register('amount', {
              required: true,
              valueAsNumber: true,
            })}
          />
          <Input
            type='text'
            placeholder='Category'
            {...register('category', { required: true })}
          />
          <Textarea
            placeholder='Description'
            {...register('description')}
          />
          <Select
            {...register('groupId', {
              required: true,
            })}>
            <SelectTrigger>
              <SelectValue placeholder='Select a Group' />
            </SelectTrigger>
            <SelectContent>
              {userGroups.map((group) => (
                <SelectItem
                  key={group._id}
                  value={group._id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <label className='flex items-center'>
            Upload receipt
            <Input
              type='file'
              accept='image/*'
              className='w-64 ml-4'
              {...register('receipt')}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />
          </label>
          <Select
            {...register('splitOption', {
              required: true,
            })}>
            <SelectTrigger>
              <SelectValue placeholder='Select Split Option' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='equally'>Equally</SelectItem>
              <SelectItem value='custom'>Custom</SelectItem>
            </SelectContent>
          </Select>
          <div>List of group members here</div>
          <label className='flex items-center'>
            <input
              type='checkbox'
              {...register('isPaid')}
              className='mr-2'
            />
            Is Paid
          </label>
          <div className='flex justify-between'>
            <Button
              type='button'
              className='bg-red mr-2'
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className='bg-green-300 text-white'
              type='submit'>
              Create expense
            </Button>
          </div>
        </form>
      </div>
    );
};
 
export default ExpenseForm;

//get group members
//display group members in a list 