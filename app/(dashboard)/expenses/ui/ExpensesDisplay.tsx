import React from 'react'
import { useUserContext } from '../../../context/UserContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const ExpensesDisplay = () => {
    const { userExpenses } =
        useUserContext();
    
    //sort expenses from most recent 
    userExpenses.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
   
  return (
    <div className='flex flex-wrap gap-4'>
      {userExpenses.map((expense) => (
        <Card
          key={expense._id}
          className='bg-pampas w-full sm:w-64 transition-transform transform hover:scale-105 hover:shadow'>
          <CardHeader>
            <h3 className='text-lg font-bold'>{expense.name}</h3>
            <p className='text-gray-500'>{expense.category}</p>
          </CardHeader>
          <CardContent>
            <p>Description: {expense.description}</p>
            <p className='font-medium text-lg text-purple'>You paid: ${expense.amount.toFixed(2)}</p>
            <p className='text-sm text-gray-400'>
              {format(new Date(expense.date), 'MMMM dd, yyyy')}
            </p>
          </CardContent>
          <CardFooter>
            <Button className='bg-green-300 text-white'>View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ExpensesDisplay