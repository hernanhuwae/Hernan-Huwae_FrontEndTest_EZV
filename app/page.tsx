

import Pagination from "./components/pagination";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import { Todo } from "./type/todo";

interface PageProps {
  searchParams: { page?: string };
}

// Fetch data at build time (ISR)
async function getTodos(page: number) {
  const start = (page - 1) * 10;
  const limit = 10;
  
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`,
    {
      // ISR: Revalidate every 60 seconds
      next: { revalidate: 60 }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  return res.json();
}

export default async function Home({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const totalTodos = 200; // JSONPlaceholder has 200 todos
  const totalPages = Math.ceil(totalTodos / 10);

  // Fetch todos at build time
  const todos: Todo[] = await getTodos(page);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Todo List App dengan Next.js + Redux Toolkit RTK Query + ISR
          </h1>
          <p className="text-gray-600">
            
          </p>
          <p className="text-7xl text-green-500 mt-1">
            Hernan Huwae
          </p>
        </header>

        <TodoForm />
        
        <TodoList initialData={todos} page={page} />
        
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}

// Generate static params for first few pages at build time
export async function generateStaticParams() {
  const pages = [1, 2, 3, 4, 5]; // Pre-generate first 5 pages
  
  return pages.map((page) => ({
    searchParams: { page: page.toString() },
  }));
}