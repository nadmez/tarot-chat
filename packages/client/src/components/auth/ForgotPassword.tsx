import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/utils/supabase';

const ForgotPassword = () => {
   const [email, setEmail] = useState('');
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setMessage(null);

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: window.location.origin + '/reset',
      });

      if (error) setError(error.message);
      else setMessage('If the email exists you will receive a link.');

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
         <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-yellow-600 text-white rounded"
         >
            {loading ? 'Sending…' : 'Send reset link'}
         </button>
         {message && <div className="text-green-500">{message}</div>}
         {error && <div className="text-red-500">{error}</div>}
         <div className="mt-4 text-sm">
            <Link to="/login" className="text-blue-500 hover:underline">
               Back to login
            </Link>
         </div>
      </form>
   );
};

export default ForgotPassword;
