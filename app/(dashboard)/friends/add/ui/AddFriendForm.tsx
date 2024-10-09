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

const AddFriendForm = () => {

  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');

  const handleCopyLink = () => {
    console.log('Copy')
  }

  const handleSendInvite = () => {
    console.log('Send')
  };

  const handleCancel = () => {
    console.log('Cancel')
  };

  return (
    <Card className='w-[350px] md:w-full md:max-w-[650px]'>
      <CardHeader>
        <CardTitle>Invite a Friend</CardTitle>
        <CardDescription>
          Invite new users to join and be your friend. Share your invite link to
          let new users join and be friends with you, on their own time.
        </CardDescription>
        <Button onClick={handleCopyLink}>Copy Invite Link</Button>
      </CardHeader>
      <CardContent>
        <form>
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
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          className='bg-red mr-2'
          onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className='bg-green-300 text-white'
          onClick={handleSendInvite}>
          Send invite
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddFriendForm