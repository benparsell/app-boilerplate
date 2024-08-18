import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { title, short_description, list_id } = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase
    .from('todo-items')
    .insert([{ title, short_description, list_id }]);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'To-do item created successfully!' }, { status: 201 });
}
