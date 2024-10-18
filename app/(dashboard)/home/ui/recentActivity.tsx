import * as React from 'react';
import { useUserContext } from '@/app/context/UserContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';


export default function RecentActivity() {
  const { userExpenses } = useUserContext();
    return (
      <div className='md:flex-1'>
        <h2 className='mb-2'>Recent activity:</h2>
        <ScrollArea className='h-64 w-full rounded-md border bg-muted'>
          <ul className='p-4'>
            {userExpenses.map((expense) => (
              <li key={expense._id}>
                <p className='text-sm'>
                  You paid <span className='text-purple font-bold'>{expense.amount}</span> for {expense.name}
                </p>
                <Separator className='my-2' />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    );
}
