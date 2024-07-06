import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Layout from '@/models/layout';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log('id:', id);

  try {
    await connectDB();
    const layout = await Layout.findOne({ pageId: id });

    if (!layout) {
      return new Response(JSON.stringify({ message: 'Layout not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(layout), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching layout:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}

