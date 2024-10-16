'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

interface Group {
  _id: string;
  name: string;
    members: string[];
    budget: number;
    description: string;
    expenses: string[];
    invite_link: string;
}

interface UserContextType {
  userDetails: User;
  userGroups: Group[];
  userFriends: User[];
}

interface ApiResponse {
  success: boolean;
  groups: Group[];
}

const defaultUser: User = {
  _id: '01',
  firstName: 'Stranger',
  lastName: '',
  email: 'No email',
  image: '',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useSession();
  const [userDetails, setUserDetails] = useState<User>(defaultUser);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [userFriends, setUserFriends] = useState<User[]>([]);
    const sessionUserId = data?.user?.id;
    
    useEffect(() => {

        const getSessionUserFriends = async () => {
            if (!sessionUserId || sessionUserId === '01') return;
            try {
                const response = await fetch(`/api/users?id=${sessionUserId}`);
                if (!response.ok) {
                    console.error('Failed to fetch user');
                    return;
                }
                const userData = await response.json();
                setUserDetails(userData.user);
                const sessionUserFriends: string[] = userData.user.friends;

                const result = await fetch(`/api/users`);
                if (!result.ok) {
                    console.error('Failed to fetch all users');
                    return;
                }

                const allUsersData = await result.json();
                const friendsData = allUsersData.users.filter((user: User) =>
                    sessionUserFriends.includes(user._id)
                );
                setUserFriends(friendsData);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };
        
        const getSessionUserGroups = async () => {
            if (!sessionUserId || sessionUserId === '01') return;
            try {
                const response = await fetch('/api/groups');
                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }
                const data: ApiResponse = await response.json();
                //filter groups where user is a member
                if (data.success) {
                    const sessionUserGroups = sessionUserId
                        ? data.groups.filter((group) =>
                            group.members.includes(sessionUserId)
                        )
                        : [];

                    setUserGroups(sessionUserGroups);
                } else {
                    console.error('Failed to fetch groups:', data);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };
       
        getSessionUserFriends();
        getSessionUserGroups();
    }, [sessionUserId]);

    return (
        <UserContext.Provider value={{ userDetails, userGroups, userFriends }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}
