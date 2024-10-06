//search users collection based on input value and returna  friend

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface AddNewMemberFormProps {
    onAddMember: (user: User) => void;
}

export default function AddNewMemberForm({onAddMember} : AddNewMemberFormProps) {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<User[]>([]);
const [hasStartedSearch, setHasStartedSearch] = useState<boolean>(false);
    
  const resetPopoverHandler = () => {
    setSearchResults([]);
    setSearchQuery(null);
    setHasStartedSearch(false);
  };

    //TO DO search only through users friends

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHasStartedSearch(true);

    if (query) {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        const foundUsers = data.users;

        const filtered = foundUsers.filter(
          (user: User) =>
            user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='bg-green-300 text-white mt-4 w-64 mx-auto block'
          onClick={resetPopoverHandler}>
          Add New Member
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='flex flex-col gap-4'>
          <form>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Enter name or email...'
                className='w-full appearance-none bg-background pl-8 shadow-none'
                onChange={handleSearch}
              />
            </div>
            <div className='mt-4'>
              {hasStartedSearch && searchResults.length === 0 ? (
                <p>No results found</p>
              ) : (
                searchResults.length > 0 && (
                  <ul>
                    {searchResults.map((user) => (
                      <li
                        key={user._id}
                        className='flex justify-between items-center py-2 border-b'>
                        <span>
                          {user.firstName} {user.lastName} ({user.email})
                        </span>
                        <Button
                          type='button'
                          className='bg-purple text-white mt-4'
                          onClick={() => onAddMember(user)}>
                          Add
                        </Button>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
