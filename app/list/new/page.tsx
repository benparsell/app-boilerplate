import { createClient } from '@/utils/supabase/server';
import Form from '@/app/components/ui/form';
import DeployButton from '@/components/DeployButton';
import AuthButton from '@/components/AuthButton';

export const metadata = {
  title: 'Create To-Do Item',
};

export default function Page() {
  return (
    <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            <AuthButton />
        </div>
        </nav>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center mt-6">Create a New To-Do Item</h1>
            <Form />
        </div>
    </div>
    
  );
}

export async function createTodoItem(data: { title: string; short_description: string }) {
  const supabase = createClient();

  const { error } = await supabase.from('todo-items').insert([data]);

  if (error) {
    throw new Error('Failed to create to-do item: ' + error.message);
  }
}
