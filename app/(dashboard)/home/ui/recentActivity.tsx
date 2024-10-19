import * as React from 'react';
import { useUserContext } from '@/app/context/UserContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

export default function RecentActivity() {
  const { userExpenses } = useUserContext();

  //sort expenses from most recent
   const sortedExpenses = [...userExpenses].sort((a, b) => {
     return new Date(b.date).getTime() - new Date(a.date).getTime();
   });
  
  return (
    <div className='md:flex-1'>
      <h2 className='mb-2'>Recent activity:</h2>
      <ScrollArea className='h-64 w-full rounded-md border bg-muted'>
        <ul className='p-4'>
          {sortedExpenses.map((expense) => (
            <li key={expense._id}>
              <p className='text-sm'>
                You paid{' '}
                <span className='text-purple font-bold'>{expense.amount}</span>{' '}
                for {expense.name} on{' '}
                <span className='text-sm text-gray-400'>
                  {format(new Date(expense.date), 'MMMM dd, yyyy')}
                </span>
              </p>
              <Separator className='my-2' />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
