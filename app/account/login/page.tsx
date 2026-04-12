'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';

type AuthMode = 'login' | 'register';

interface AuthFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const INITIAL_STATE: AuthFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Unable to process request right now.';
}

export default function AccountLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [form, setForm] = useState<AuthFormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onInputChange = (field: keyof AuthFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const endpoint = mode === 'login' ? '/api/account/login' : '/api/account/register';
    const payload =
      mode === 'login'
        ? { email: form.email, password: form.password }
        : {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
          };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/account');
      router.refresh();
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="account-auth-wrap">
      <div className="container">
        <div className="account-auth-shell surface-card">
          <p className="kicker">Customer Account</p>
          <h1 className="account-auth-title">
            {mode === 'login' ? 'Welcome Back to Sehaj Studio' : 'Create Your Sehaj Studio Account'}
          </h1>
          <p className="account-auth-subtitle">
            Track orders, save multiple delivery addresses, and keep your details in one place.
          </p>

          <div className="account-auth-toggle" role="tablist" aria-label="Account authentication mode">
            <button
              type="button"
              className={`account-auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`account-auth-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => switchMode('register')}
            >
              Register
            </button>
          </div>

          <form className="account-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="account-form-grid">
                <Input
                  id="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => onInputChange('firstName', e.target.value)}
                  autoComplete="given-name"
                />
                <Input
                  id="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => onInputChange('lastName', e.target.value)}
                  autoComplete="family-name"
                />
              </div>
            )}

            <Input
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              autoComplete="email"
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
              minLength={8}
            />

            {error && <p className="account-error">{error}</p>}

            <button className="btn btn-primary account-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === 'login'
                  ? 'Logging In...'
                  : 'Creating Account...'
                : mode === 'login'
                  ? 'Login'
                  : 'Create Account'}
            </button>
          </form>

          <p className="account-auth-note">
            Checkout remains on secure Shopify hosted checkout. Need help? <Link href="/pages/contact">Contact us</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
