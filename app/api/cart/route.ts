import { NextRequest, NextResponse } from 'next/server';
import { getCart } from '@/lib/shopify/client';

export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get('cartId');

  if (!cartId) {
    return NextResponse.json({ error: 'Cart ID required' }, { status: 400 });
  }

  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}