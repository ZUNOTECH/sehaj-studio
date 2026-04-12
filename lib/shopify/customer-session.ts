import { NextRequest, NextResponse } from 'next/server';

export const CUSTOMER_TOKEN_COOKIE = 'sehaj_customer_token';
const DEFAULT_CUSTOMER_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export function getCustomerTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(CUSTOMER_TOKEN_COOKIE)?.value ?? null;
}

export function setCustomerSessionCookie(response: NextResponse, accessToken: string, expiresAt?: string) {
  const expiry = expiresAt ? new Date(expiresAt) : null;
  const isValidExpiry = expiry !== null && !Number.isNaN(expiry.getTime());

  response.cookies.set({
    name: CUSTOMER_TOKEN_COOKIE,
    value: accessToken,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: isValidExpiry ? undefined : DEFAULT_CUSTOMER_SESSION_TTL_SECONDS,
    expires: isValidExpiry ? expiry : undefined,
  });
}

export function clearCustomerSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: CUSTOMER_TOKEN_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}
