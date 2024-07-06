import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Layout from '@/models/layout';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log('id:', id);
  const { layouts, items } = await request.json();
  console.log('layouts:', layouts);
  console.log('items:', items);
  
  try {
    await connectDB();
    const result = await Layout.findOneAndUpdate(
      { pageId: id },
      { layouts, items },
      { new: true, upsert: true }
    );

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.error('Error saving layout:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
