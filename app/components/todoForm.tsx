
'use client';

import { useState } from 'react';
import { todoApi } from '../store/todoApi';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const [createTodo, { isLoading, isSuccess, isError }] = todoApi.endpoints.createTodos.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    try {
      await createTodo({
        userId: 1,
        title: title.trim(),
        completed: false,
      }).unwrap();
      
      setTitle('');
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl text-amber-400 font-semibold mb-4">Add New Todo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
            className="w-full text-red-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding...' : 'Add Todo'}
        </button>

        {isSuccess && (
          <div className="text-green-600 text-sm">
            ✓ Todo added successfully!
          </div>
        )}
        
        {isError && (
          <div className="text-red-600 text-sm">
            ✗ Failed to add todo. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}