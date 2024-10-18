import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function ExpensesThisMonth() {
  

  return (
    <div className='md:flex-1'>
      <h2 className='mb-2'>Expenses this month:</h2>
      <ScrollArea className='h-64 w-full rounded-md border bg-muted'>
        <ul className='p-4'>
          {tags.map((tag) => (
            <li key={tag}>
              <p
                className='text-sm'>
                {tag}
              </p>
              <Separator className='my-2' />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
