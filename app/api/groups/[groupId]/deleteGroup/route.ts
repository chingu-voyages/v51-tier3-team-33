import dbConnect from '@/lib/dbConnect';
import Group from '@/models/Group';
import UserGroup from '@/models/UserGroup';
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async(request: NextRequest, { params }: { params: { groupId: string;} }) => {
  try {
    await dbConnect();
    const { groupId } = params;

    const group = await Group.findById(groupId);

    if (!group) {
      return NextResponse.json({error: "Group not found"}, {status: 404});
    }

    for (const expense_id of group.expenses) { // clears all expenses and user expenses relating to the group
      const response = await fetch(`${process.env.BASE_URL}/api/groups/${groupId}/expenses/${expense_id}/deleteExpense`, {
        method: "DELETE"
      });// removes all info relating to current expenses

      if (response.status === 404) {
        return NextResponse.json({error: 'There was an error removing a group expense'});
      }
    }

    const deletedUserGroups = await UserGroup.deleteMany({group_id: groupId}); // deletes all user groups.
    
    if (!deletedUserGroups) {
      return NextResponse.json({error: "No user groups were deleted/affilated with the group_id"}, {status: 404});
    }

    const deletedGroup = await Group.findByIdAndDelete(groupId) // delete the group

    if (!deletedGroup) {
      return NextResponse.json({error: "Group was not deleted / found"}, {status: 404});
    }

    return NextResponse.json({message: "Group and all associated expenses successfully deleted"});
  } catch (error) {
    return NextResponse.json({error: error})
  }
}