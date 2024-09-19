import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react'
import NavLinks from './navlinks';
import SearchInput from './searchInput';
import DropDownMenu from './dropDownMenu';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileHeader(){
    return (
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
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
        <SearchInput />
        {/* <DropDownMenu /> */}
        <Button className='bg-solitude outline-none text-purple font-semibold hover:bg-purple hover:text-white'>
          Log out
        </Button>
      </header>
    );
};


