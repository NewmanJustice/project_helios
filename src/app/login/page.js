'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const password = e.target.password.value;
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/portal');
    } else {
      setError('Incorrect access code. Please try again.');
      e.target.password.value = '';
      e.target.password.focus();
    }
    setLoading(false);
  }

  return (
    <section id="section-0">
      <div className="gate-inner">
        <h1 className="gate-title">Project Helios</h1>
        <p className="gate-subtitle">This briefing is restricted. Enter the access code to continue.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            className="gate-input"
            placeholder="Enter access code"
            autoComplete="current-password"
            autoFocus
            required
          />
          <button type="submit" className="gate-btn" disabled={loading}>
            {loading ? 'Checking…' : 'Unlock'}
          </button>
          {error && <p className="gate-error visible" role="alert">{error}</p>}
        </form>
      </div>
    </section>
  );
}
