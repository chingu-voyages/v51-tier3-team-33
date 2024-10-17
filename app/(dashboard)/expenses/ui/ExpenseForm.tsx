'use client';

import React, { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GroupMembers } from './GroupMembers';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface Contribution {
  member_id: string;
  amount: number;
}

interface ExpenseFormData {
  expenseName: string;
  expenseDate: string;
  amount: number;
  category: string;
  description: string;
  groupId: string;
  receipt?: File;
  splitOption: string;
  isPaid: boolean;
  contributions: Contribution[];
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
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<ExpenseFormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const [splitType, setSplitType] = useState<string>('equally');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('other');
  const [contributions, setContributions] = useState<
    { member_id: string; amount: number }[]
  >([]);

  const expenseCategories = [
    'Restaurant',
    'Groceries',
    'Rent',
    'Gas',
    'Utility bills',
    'Coffee',
    'Movies',
    'Clothing',
    'Internet & Cable',
    'Travel/Vacation',
    'Laundry',
    'Other',
  ];

  const handleCategorySelection = (category: string) => {
    setCategory(category);
  };

  const handleGroupIdSelection = (id: string) => {
    setSelectedGroupId(id);
  };

  const handleSplitTypeSelection = (type: string) => {
    setSplitType(type);
  };

  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
  };

  const handleContributionsChange = (
    contributions: { member_id: string; amount: number }[]
  ) => {
    setContributions(contributions);
  };

  const totalContributions = contributions.reduce(
    (total, contribution) => total + contribution.amount,
    0
  );

  const expenseIsPaid = amount === totalContributions;

  //TO DO: fix this
  const handleCancel = () => {
    reset();
    setCategory('');
    setSelectedGroupId('');
    setGroupMembers([]);
    setAmount(0);
  };

  const addNewExpenseToDatabase = async (data: ExpenseFormData) => {
    const formData = new FormData();
    formData.append('name', data.expenseName);
    formData.append('description', data.description);
    formData.append('amount', data.amount.toString());
    formData.append('category', data.category);
    formData.append('is_paid', data.isPaid.toString());

    formData.append('contributions', JSON.stringify(data.contributions));
    if (data.receipt) {
      formData.append('file', data.receipt);
    }

    try {
      const response = await fetch(
        `/api/groups/${selectedGroupId}/addExpense`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('failed to create expense');
      }

      const result = await response.json();
      
      console.log('result', result)
      if (result.success) {
        toast({
          description: 'New group created successfully!.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem creating an expense.',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
      console.error('Error creating expense', error);
    }
  };

  const onSubmit: SubmitHandler<ExpenseFormData> = async (data) => {
    if (selectedFile) {
      data.receipt = selectedFile;
    }
    if (selectedGroupId) {
      data.groupId = selectedGroupId;
    }
    if (category) {
      data.category = category;
    }
    if (splitType) {
      data.splitOption = splitType;
    }
    if (expenseIsPaid) {
      data.isPaid = true;
    }
    if (contributions) {
      data.contributions = contributions;
    }
    console.log('formdata', data);
    await addNewExpenseToDatabase(data);
  };

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
          onContributionsChange={handleContributionsChange}
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
