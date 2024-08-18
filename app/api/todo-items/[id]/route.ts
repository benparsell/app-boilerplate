import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const itemId = params.id;
  const supabase = createClient();

  const { error } = await supabase
    .from('todo-items')
    .delete()
    .eq('id', itemId);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Item removed successfully' }, { status: 200 });
}
