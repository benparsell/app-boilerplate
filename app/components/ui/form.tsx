'use client';

import { useState } from 'react';

export default function CreateTodoItemForm() {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Fetch the user's todo-list ID
      const listResponse = await fetch('/api/get-todo-list-id');
      const { listId } = await listResponse.json();

      // Insert the new todo-item with the listId
      const response = await fetch('/api/todo-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          short_description: shortDescription,
          list_id: listId, // Attach the fetched listId here
        }),
      });

      if (response.ok) {
        setSuccessMessage('To-do item created successfully!');
        setTitle('');
        setShortDescription('');
      } else {
        const errorData = await response.json();
        setErrorMessage('Error creating to-do item: ' + errorData.message);
      }
    } catch (error: any) {
      setErrorMessage('Error creating to-do item: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Create New To-Do Item</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter the task title"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <textarea
          id="short_description"
          name="short_description"
          rows={4}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter a short description of the task"
          required
        />
      </div>

      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create To-Do
      </button>
    </form>
  );
}
