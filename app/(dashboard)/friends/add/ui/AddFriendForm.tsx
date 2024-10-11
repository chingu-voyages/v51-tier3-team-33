'use client'

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
import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
//import { useSession } from 'next-auth/react';

//TO DO create invite link component that the user will be taken to when he click on the link and he must also become friends with the invitor
//TO DO add send email functionality

const AddFriendForm = () => {

  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const shareableLink = 'http://localhost:3000/login'; 

  const { toast } = useToast();
  // const { data } = useSession();
  
  // const userName = data?.user?.name || 'your friend' ;

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

  // const handleSendInvite = async () => {
  //   if (!friendName || !friendEmail) {
  //     toast({
  //       variant: 'destructive',
  //       title: 'Error!',
  //       description: 'Please fill out both fields',
  //     });
  //     return;
  //   }

  //   // Reset fields
  //   setFriendName('');
  //   setFriendEmail('');
  //   toast({
  //     title: 'Success!',
  //     description: `Invite sent to ${friendName} at ${friendEmail}`,
  //   });
  // };

 
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    
    e.preventDefault();

       if (!friendName || !friendEmail) {
         toast({
           variant: 'destructive',
           title: 'Error!',
           description: 'Please fill out both fields',
         });
         return;
       }
     
  
    // await fetch('/api/email', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     userName: friendName,
    //     friendEmail,
    //     inviteLink: shareableLink,
    //     invitedByUsername: userName,
    //   }),
    // });
  }
  const handleCancel = () => {
    setFriendEmail('')
    setFriendName('')
  };

  return (
    <Card className='w-[350px] md:w-full md:max-w-[650px]'>
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
          Invite new users to join and be your friend. Share your invite link to
          let new users join and be friends with you, on their own time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Friend&apos;s Name</Label>
              <Input
                id='name'
                type='text'
                placeholder="Enter friend's first name"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Friend&apos;s Email</Label>
              <Input
                id='email'
                type='email'
                placeholder="Enter friend's email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
              />
            </div>
          </div>
        </form>
        <Button className='bg-green-300 text-white w-full mt-4'>Add another friend</Button>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
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
    </Card>
  );
}

export default AddFriendForm