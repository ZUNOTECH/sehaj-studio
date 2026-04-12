import { NextRequest, NextResponse } from 'next/server';
import { getCustomerAccount } from '@/lib/shopify/customer';
import {
  clearCustomerSessionCookie,
  getCustomerTokenFromRequest,
} from '@/lib/shopify/customer-session';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Unable to load account';
}

export async function GET(request: NextRequest) {
  const token = getCustomerTokenFromRequest(request);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const customer = await getCustomerAccount(token);
    return NextResponse.json({ customer });
  } catch (error) {
    const response = NextResponse.json({ error: getErrorMessage(error) }, { status: 401 });
    clearCustomerSessionCookie(response);
    return response;
  }
}
