import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/utils/supabase';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });

      if (error) setError(error.message);
      setLoading(false);
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
         />
         <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
         />
         <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded"
         >
            {loading ? 'Logging in…' : 'Log in'}
         </button>
         {error && <div className="text-red-500">{error}</div>}
         <div className="flex justify-between text-sm">
            <Link to="/forgot" className="text-blue-500 hover:underline">
               Forgot password?
            </Link>
            <Link to="/signup" className="text-blue-500 hover:underline">
               Sign up
            </Link>
         </div>
      </form>
   );
};

export default Login;
