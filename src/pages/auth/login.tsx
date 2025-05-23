import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseBrowser';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ نتأكد من وجود جلسة تسجيل دخول حقيقية قبل التحويل
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('✅ Supabase session check:', { session: data?.session, error });

      if (data?.session?.user?.email) {
        router.push('/');
      }
    };
    checkUser();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 10,
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
