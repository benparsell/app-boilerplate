import { createClient } from '@/utils/supabase/server';
import TodoListClientComponent from '@/app/components/ui/TodoListClientComponent'; // You'll create this component
import DeployButton from '@/components/DeployButton';
import AuthButton from '@/components/AuthButton';

interface TodoItem {
  id: number;
  title: string;
  short_description: string;
}

interface TodoList {
  id: number;
  "todo-items": TodoItem[];
}

export default async function Page() {
  const supabase = createClient();

  // Fetching to-do lists and items
  const { data: lists, error } = await supabase
    .from('todo-lists')
    .select(`
      id,
      "todo-items" (
        id,
        title,
        short_description
      )
    `);

  if (error) {
    console.error('Error fetching data:', error);
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  // Type assertion for TypeScript
  const typedLists = lists as TodoList[];

  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            <AuthButton />
          </div>
        </nav>
      </div>
      {typedLists.map(list => (
        <TodoListClientComponent key={list.id} list={list} />
      ))}
    </div>
  );
}
