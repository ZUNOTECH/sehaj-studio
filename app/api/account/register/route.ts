import { NextResponse } from 'next/server';
import { loginCustomer, registerCustomer } from '@/lib/shopify/customer';
import { setCustomerSessionCookie } from '@/lib/shopify/customer-session';

interface RegisterBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

function normalizeOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Unable to create account';
}

export async function POST(request: Request) {
  let payload: RegisterBody;

  try {
    payload = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  const firstName = normalizeOptional(payload.firstName);
  const lastName = normalizeOptional(payload.lastName);
  const email = payload.email?.trim().toLowerCase();
  const password = payload.password?.trim();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  try {
    await registerCustomer({ firstName, lastName, email, password });
    const session = await loginCustomer(email, password);
    const response = NextResponse.json({ success: true });
    setCustomerSessionCookie(response, session.accessToken, session.expiresAt);
    return response;
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 });
  }
}
