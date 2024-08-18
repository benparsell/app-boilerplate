import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('todo-lists')
    .select('id')
    .single(); // Assuming each user has only one list, so we fetch a single record

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ listId: data.id }, { status: 200 });
}
