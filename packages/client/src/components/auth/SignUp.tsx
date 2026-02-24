import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/utils/supabase';

const SignUp = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [message, setMessage] = useState<string | null>(null);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setMessage(null);

      const { error, data } = await supabase.auth.signUp({
         email,
         password,
      });

      if (error) setError(error.message);
      else setMessage('Check your inbox for a confirmation link.');

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
            className="w-full py-2 bg-green-600 text-white rounded"
         >
            {loading ? 'Signing up…' : 'Sign up'}
         </button>
         {message && <div className="text-green-500">{message}</div>}
         {error && <div className="text-red-500">{error}</div>}
         <div className="mt-4 text-sm">
            <Link to="/login" className="text-blue-500 hover:underline">
               Already have an account? Log in
            </Link>
         </div>
      </form>
   );
};

export default SignUp;
