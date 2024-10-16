import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../context/UserContext';

interface GroupMembersProps {
    groupId?: string;
    splitType?: string;
    amount: number;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ groupId, splitType, amount }) => {
  const [members, setMembers] = useState<string[]>([]);
  const [membersDetails, setMembersDetails] = useState<User[]>([]);
  const [customAmounts, setCustomAmounts] = useState<{ [key: string]: number }>(
    {}
  );
  const { userFriends, userDetails } = useUserContext();

  const fetchSelectedGroup = async () => {
    if (!groupId) return;
    try {
      const response = await fetch(`/api/groups?id=${groupId}`);
      if (!response.ok) {
        console.error('Failed to fetch group information');
        return;
      }
      const groupData = await response.json();
      setMembers(groupData.group.members);
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  useEffect(() => {
    fetchSelectedGroup();
  }, [groupId]);

  useEffect(() => {
    // Only run if members are updated
    if (members.length > 0) {
      const result = userFriends.filter((friend) =>
        members.includes(friend._id)
      );
      setMembersDetails([userDetails, ...result]); //make sure that session user is also displayed
    }
  }, [members, userFriends]);

  const handleCustomAmountChange = (memberId: string, value: string) => {
    const amountValue = parseFloat(value);
    setCustomAmounts((prev) => ({ ...prev, [memberId]: amountValue }));
  };

  const getEqualSplitAmount = () => {
    return membersDetails.length ? (amount / membersDetails.length).toFixed(2) : '0.00';
  };

  return (
    <div>
      <h3 className='text-lg font-semibold'>Split with friends:</h3>
      <ul>
        {membersDetails.map((member) => (
          <li
            key={member._id}
            className='flex justify-between items-center bg-merino m-2 p-4 rounded'>
            <span>
              {member.firstName} {member.lastName}
            </span>
            {splitType === 'equally' ? (
              <span>${getEqualSplitAmount()}</span>
            ) : (
              <div className='flex'>
                <span>$</span>
                <input
                  type='number'
                  value={customAmounts[member._id] || ''}
                  onChange={(e) =>
                    handleCustomAmountChange(member._id, e.target.value)
                  }
                  className='ml-4'
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
