'use client'

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
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Friends', href: '/friends', icon: UserPlusIcon },
  { name: 'Groups', href: '/groups', icon: UserGroupIcon },
  { name: 'Expenses', href: '/expenses', icon: CurrencyDollarIcon },
  { name: 'Receipts', href: '/receipts', icon: ReceiptPercentIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
    
    return (
        <nav className='mt-5'>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 hover:font-bold md:flex-none md:justify-start md:p-4 md:px-5',
                      {
                        'bg-green-100': pathname === link.href,
                      }
                    )}>
                    <LinkIcon className='w-6 text-green-300' />
                    <p>{link.name}</p>
                  </Link>
                );
            })
            }
        </nav>
    )
}
