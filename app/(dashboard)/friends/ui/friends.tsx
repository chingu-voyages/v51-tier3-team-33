'use client'
import React from 'react';
import { useUserContext } from '../../../context/UserContext';

const Friends = () => {
    const { userDetails, userGroups, userFriends } = useUserContext();
    console.log(userDetails);
    console.log(userGroups);
    console.log(userFriends);

  return (
    <div>All your friends</div>
  )
}

export default Friends