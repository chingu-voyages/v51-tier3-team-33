'use client'
import { Button } from '@/components/ui/button';
import { useUserContext } from '../../context/UserContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { userDetails } = useUserContext();
  const router = useRouter();

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold mb-4'>
          Hi {userDetails.firstName || 'User'}!
        </h1>
        <Button
          className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'
          onClick={() => router.push('/expenses/new')}>
          New expense
        </Button>
      </div>
      <p className='font-bold'>Your expenses</p>
      <p>all user expenses will be here</p>
    </div>
  );
}
