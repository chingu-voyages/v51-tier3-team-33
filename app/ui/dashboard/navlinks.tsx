'use client'
//links displayed at the sidenav
//TO DO: update href's when navigation is ready

import {
  CurrencyDollarIcon,
  HomeIcon,
  ReceiptPercentIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/16/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Friends', href: '/dashboard', icon: UserPlusIcon },
  { name: 'Groups', href: '/dashboard', icon: UserGroupIcon },
  { name: 'Expenses', href: '/dashboard', icon: CurrencyDollarIcon },
  { name: 'Receipts', href: '/dashboard', icon: ReceiptPercentIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    console.log('Path', pathname)
    
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-green-100 md:flex-none md:justify-start md:p-2 md:px-3',
                      {
                        'bg-green-100': pathname === 'link.href',
                      }
                    )}>
                    <LinkIcon className='w-6 text-green-300' />
                    <p className='hidden md:block'>{link.name}</p>
                  </Link>
                );
            })
            }
        </>
    )
}
