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
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<ExpenseFormData>();
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
  console.log(groupMembers);
  const handleCategorySelection = (category: string) => {
    setCategory(category);
  };

  const handleGroupIdSelection = (id: string) => {
    setValue('groupId', id);
    setSelectedGroupId(id);
  };

  const handleSplitTypeSelection = (type: string) => {
    setSplitType(type);
  };

  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    clearErrors('amount');
  };

  const handleContributionsChange = (
    contributions: { member_id: string; amount: number }[]
  ) => {
    setContributions(contributions);
  };

  // const totalContributions = contributions.reduce(
  //   (total, contribution) => total + contribution.amount,
  //   0
  // );

  //const expenseIsPaid = amount === totalContributions;

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
      
      if (result.success) {
        toast({
          description: 'New expense created successfully!.',
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
    //form validation, TO DO: toast is not displaying
    if (
      !data.expenseName ||
      !data.amount ||
      !data.expenseDate ||
      !selectedGroupId
    ) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
      });
      
      return;
    }

  if (selectedFile) {
    data.receipt = selectedFile;
  }
  data.groupId = selectedGroupId;
  data.category = category;
  data.splitOption = splitType;
  data.isPaid =
    amount === contributions.reduce((total, c) => total + c.amount, 0);
    data.contributions = contributions;
    await addNewExpenseToDatabase(data);
    //THIS DOES NOT RESET EVERY FORM FIELD, NEEDS TO BE FIXED, I DON:T KNOW HOW
    reset({
      expenseName: '',
      expenseDate: '',
      amount: 0,
      category: 'other',
      description: '',
      groupId: '',
      receipt: undefined,
      splitOption: 'equally',
      isPaid: false,
      contributions: [],
    });
    setCategory('other');
    setSelectedGroupId('');
    setSelectedFile(null);
    setContributions([]);
    setAmount(0);
    setSplitType('equally');
  };

  //TO DO
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
          {...register('expenseName', { required: true })}
        />
        {errors.expenseName && (
          <span className='text-red'>This field is required</span>
        )}
        <Input
          type='date'
          placeholder='Date'
          {...register('expenseDate', { required: true })}
        />
        {errors.expenseDate && (
          <span className='text-red'>This field is required</span>
        )}
        <Input
          type='number'
          placeholder='Amount'
          {...register('amount', { required: true })}
          onChange={amountChangeHandler}
        />
        {errors.amount && (
          <span className='text-red'>This field is required</span>
        )}

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
          {...register('groupId', { required: true })}
          onValueChange={(value) => {
            handleGroupIdSelection(value);
            clearErrors('groupId')
          }}>
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
        {errors.groupId && (
          <span className='text-red'>This field is required</span>
        )}

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
