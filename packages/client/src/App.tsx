import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import type { User } from '@supabase/supabase-js';

import ChatBot from '@/components/chat/chatBot';
import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/SignUp';
import ForgotPassword from '@/components/auth/ForgotPassword';
import ResetPassword from '@/components/auth/ResetPassword';

function App() {
   const [user, setUser] = useState<User | null>(null);

   return (
      <BrowserRouter>
         <div className="p-4 h-screen bg-transparent">
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/forgot" element={<ForgotPassword />} />
               <Route path="/reset" element={<ResetPassword />} />
               <Route
                  path="/chat"
                  element={
                     user ? <ChatBot /> : <Navigate to="/login" replace />
                  }
               />
               <Route
                  path="*"
                  element={<Navigate to={user ? '/chat' : '/login'} replace />}
               />
            </Routes>
         </div>
      </BrowserRouter>
   );
}

export default App;
