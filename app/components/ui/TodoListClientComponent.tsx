'use client';

import { useState } from 'react';

interface TodoItem {
  id: number;
  title: string;
  short_description: string;
}

interface TodoList {
  id: number;
  "todo-items": TodoItem[];
}

interface TodoListProps {
  list: TodoList;
}

export default function TodoListClientComponent({ list }: TodoListProps) {
  const [items, setItems] = useState(list['todo-items']);

  const handleRemoveItem = async (itemId: number) => {
    // Remove the item from the database
    const response = await fetch(`/api/todo-items/${itemId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Update state to remove the item
      setItems(items.filter(item => item.id !== itemId));
    } else {
      console.error('Error removing item');
    }
  };

  return (
    <div key={list.id}>
      <h1 className='text-2xl'>Your ToDo List</h1>
      <ul className='list-disc'>
        {items.map(item => (
          <li key={item.id} className='flex items-start space-x-3 p-4 rounded-lg shadow-sm'>
            <input 
              type="checkbox" 
              className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={() => handleRemoveItem(item.id)}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm mt-1">{item.short_description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
