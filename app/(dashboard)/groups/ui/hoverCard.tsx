import { CalendarDays } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface Group {
  name: string;
  description: string;
  budget: number | string; 
}

interface HoverViewProps {
  group: Group; 
}

export function HoverView({group}: HoverViewProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>{group.name}</Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>Description</h4>
            <p className='text-sm'>{group.description}</p>
            <div className='flex items-center pt-2'>
              <p>
                Total budget: <span className='font-bold text-green-300'>{group.budget}</span>
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
