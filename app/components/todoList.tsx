
'use client';

import { todoApi } from '../store/todoApi';
import { Todo } from '../type/todo';

interface TodoListProps {
  initialData: Todo[];
  page: number;
}

export default function TodoList({ initialData, page }: TodoListProps) {
  const start = (page - 1) * 10;
  
  // RTK Query will revalidate and update data in client
  const { data, isLoading, isFetching, isError } = todoApi.endpoints.getTodos.useQuery(
    { start, limit: 10 },
    {
      // Skip initial fetch if we have initialData
      skip: false,
      // Refetch on mount and focus
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  // Use RTK Query data if available, otherwise use initialData
  const todos = data && data.length > 0 ? data : initialData;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {isFetching && !isLoading && (
        <div className="bg-blue-50 px-4 py-2 text-sm text-blue-700">
          🔄 Refreshing data...
        </div>
      )}

      {isLoading && (
        <div className="bg-yellow-50 px-4 py-2 text-sm text-yellow-700">
          ⏳ Loading todos...
        </div>
      )}

      {isError && (
        <div className="bg-red-50 px-4 py-2 text-sm text-red-700">
          ⚠️ Error loading todos. Showing cached data.
        </div>
      )}
      
      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="w-5 h-5 text-blue-500"
              />
              <div className="flex-1">
                <p className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  ID: {todo.id} | User: {todo.userId}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !isLoading && (
        <div className="px-6 py-12 text-center text-gray-500">
          <p className="text-lg mb-2">📭 No todos found</p>
          <p className="text-sm">Try refreshing the page or check your connection</p>
        </div>
      )}

      <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500 border-t">
        Showing {todos.length} todos | Source: {data ? 'RTK Query (Client)' : 'ISR (Server)'}
      </div>
    </div>
  );
}