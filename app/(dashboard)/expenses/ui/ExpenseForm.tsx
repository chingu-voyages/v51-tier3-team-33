'use client';

import  React, { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GroupMembers } from './GroupMembers';

interface FormData {
  expenseName: string;
  expenseDate: string;
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

    const { register, handleSubmit, reset } = useForm<FormData>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [groupMembers, setGroupMembers] = useState<User[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const [splitType, setSplitType] = useState<string>('equally');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  const expenseCategories = ['Restaurant', 'Groceries', 'Rent', 'Gas', 'Utility bills', 'Coffee', 'Movies', 'Clothing', 'Internet & Cable', 'Travel/Vacation', 'Laundry', 'Other'];

  const handleCategorySelection = (category: string) => {
    setCategory(category);
  }

  const handleGroupIdSelection = (id: string) => {
    setSelectedGroupId(id)
  }

  const handleSplitTypeSelection = (
type: string
  ) => {
    setSplitType(type);
  };

  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
  };

  //TO DO: fix this
    const handleCancel = () => {
      reset();
      setCategory('');
      setSelectedGroupId('');
      setGroupMembers([]);
      setAmount(0);
    }

    const onSubmit: SubmitHandler<FormData> = async(data) => {
        if (selectedFile) {
           data.receipt = selectedFile; 
         }
      if (selectedGroupId) {
        data.groupId = selectedGroupId;
      }
      if (category) {
        data.category = category
      }
      
        console.log('formdata', data)
    }
    
  //TO DO submit form data
  //if sum of split amounts is equal to total amount - success
  //if not equal - display message - the expense is not paid

    return (
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Add New Expense</h2>
        <form
          className='space-y-4'
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            placeholder='Expense Name'
            {...register('expenseName')}
          />
          <Input
            type='date'
            placeholder='Date'
            {...register('expenseDate')}
          />
          <Input
            type='number'
            placeholder='Amount'
            {...register('amount')}
            onChange={amountChangeHandler}
          />

          <Select
            {...register('category')}
            onValueChange={handleCategorySelection}>
            <SelectTrigger>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              {expenseCategories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder='Description'
            {...register('description')}
          />
          <Select
            {...register('groupId')}
            onValueChange={handleGroupIdSelection}>
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
            {...register('splitOption')}
            onValueChange={handleSplitTypeSelection}>
            <SelectTrigger>
              <SelectValue placeholder='Select Split Option' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='equally'>Equally</SelectItem>
              <SelectItem value='custom'>Custom</SelectItem>
            </SelectContent>
          </Select>
          <GroupMembers
            groupId={selectedGroupId}
            splitType={splitType}
            amount={amount}
          />
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

//pass group members here 
