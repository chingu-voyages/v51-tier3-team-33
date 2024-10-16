//get group members
//display group members 
import React, { useEffect } from 'react'

interface GroupMembersProps {
  groupId?: string;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ groupId }) => {
    const fetchSelectedGroup = async () => {
        try {
            const response = await fetch(`/api/groups?id=${groupId}`);
            if (!response.ok) {
                console.error('Failed to fetch group information');
                return;
            }
            const groupData = await response.json();
            console.log(groupData)
        } catch (error) {
            console.error('Error fetching group data:', error);
        }
    }

    useEffect(() => {
        fetchSelectedGroup();
    }, [groupId])
  return (
    <div>GroupMembers of group {groupId} will be here</div>
  )
}
