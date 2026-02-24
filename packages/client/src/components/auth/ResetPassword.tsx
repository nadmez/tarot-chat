import { type FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/utils/supabase';

const ResetPassword = () => {
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [message, setMessage] = useState<string | null>(null);
   const [accessToken, setAccessToken] = useState<string | null>(null);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('access_token');
      if (token) setAccessToken(token);
   }, []);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!accessToken) return;
      setLoading(true);
      setError(null);
      setMessage(null);

      const { error } = await supabase.auth.updateUser({
         access_token: accessToken,
         password,
      });

      if (error) setError(error.message);
      else setMessage('Password updated successfully.');

      setLoading(false);
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
         />
         <button
            type="submit"
            disabled={loading || !accessToken}
            className="w-full py-2 bg-purple-600 text-white rounded"
         >
            {loading ? 'Updating…' : 'Set new password'}
         </button>
         {message && <div className="text-green-500">{message}</div>}
         {error && <div className="text-red-500">{error}</div>}
         <div className="mt-4 text-sm">
            <Link to="/login" className="text-blue-500 hover:underline">
               Return to login
            </Link>
         </div>
      </form>
   );
};

export default ResetPassword;
