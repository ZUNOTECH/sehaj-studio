import { NextResponse } from 'next/server';
import { loginCustomer } from '@/lib/shopify/customer';
import { setCustomerSessionCookie } from '@/lib/shopify/customer-session';

interface LoginBody {
  email?: string;
  password?: string;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Unable to log in';
}

export async function POST(request: Request) {
  let payload: LoginBody;

  try {
    payload = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();
  const password = payload.password?.trim();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    const session = await loginCustomer(email, password);
    const response = NextResponse.json({ success: true });
    setCustomerSessionCookie(response, session.accessToken, session.expiresAt);
    return response;
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 });
  }
}
