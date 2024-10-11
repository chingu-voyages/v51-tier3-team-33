'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react'
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { ToastAction } from '@/components/ui/toast';

//TO DO create invite link component that the user will be taken to when he click on the link and he must also become friends with the invitor


interface AddFriendFormData {
  name: string;
  email: string;
}

const AddFriendForm: React.FC = () => {

  const { register, handleSubmit, reset  } =
    useForm<AddFriendFormData>();

  const shareableLink = 'http://localhost:3000/login'; 

  const { toast } = useToast();
  const { data } = useSession();
  
  const userName = data?.user?.name || 'your friend' ;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
      toast({
        description: 'Link copied to clipboard.',
      });
      })
      .catch(err => {
      console.error('Failed to copy: ', err)
    })
  }
  
  const onSubmit: SubmitHandler<AddFriendFormData> = async(data) => {
    console.log('Form data:', data);
    if (!data.name || !data.email) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Please fill out both fields',
      });
      return;
    }

    try {
          const response = await fetch('/api/email', {
            method: 'POST',
            body: JSON.stringify({
              firstName: data.name,
              friendEmail: data.email,
              inviteLink: shareableLink,
              invitedByUsername: userName,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to send email');
          }

          const result = await response.json();
          if (result.success) {
            toast({
              description: 'Invite email sent!',
            });
            reset();
          }
    } catch (error) {
       toast({
         variant: 'destructive',
         title: 'Uh oh! Something went wrong.',
         description: 'There was a problem sending email.',
         action: <ToastAction altText='Try again'>Try again</ToastAction>,
       });
       console.error('Error sending email:', error);
    }

  }
  
  const handleCancel = () => {
    reset();
  };

  return (
    <Card className='w-[350px] md:w-full md:max-w-[650px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <div className='flex flex-row items-center justify-between'>
            <CardTitle className='mr-auto'>Invite or Add Friends</CardTitle>
            <Button
              className='bg-merino text-green border hover:text-white'
              onClick={handleCopyLink}>
              Copy Invite Link
            </Button>
          </div>

          <CardDescription>
            Invite new users to join and be your friend. Share your invite link
            to let new users join and be friends with you, on their own time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Friend&apos;s Name</Label>
              <Input
                id='name'
                type='text'
                placeholder="Enter friend's first name"
                {...register('name')}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Friend&apos;s Email</Label>
              <Input
                id='email'
                type='email'
                placeholder="Enter friend's email"
                {...register('email')}
              />
            </div>
          </div>
          <Button className='bg-green-300 text-white w-full mt-4'>
            Add another friend
          </Button>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            type='button'
            className='bg-red mr-2'
            onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className='bg-green-300 text-white'
            type='submit'>
            Send invite
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddFriendForm