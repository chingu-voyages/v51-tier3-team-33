import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './navlinks';

export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      {/* start of content of the sidenav menu in mobile view */}

      <SheetContent
        side='left'
        className='flex flex-col bg-merino'>
        <Link
          className='mb-2 flex h-20 items-center justify-center p-4 md:h-40'
          href='/home'>
          <Image
            src={'/images/logo/app-logo-landscape.png'}
            alt='Logo'
            width={250}
            height={100}
          />
        </Link>
        <NavLinks />
      </SheetContent>

      {/* end of content of the sidenav menu in mobile view */}
    </Sheet>
  );
}
