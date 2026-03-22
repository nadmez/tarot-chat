import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ChatBot from '@/components/chat/chatBot';
import { LoginForm } from '@/components/auth/login-form';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { UpdatePasswordForm } from '@/components/auth/update-password-form';

function App() {
   return (
      <BrowserRouter>
         <div className="p-4 h-screen bg-transparent">
            <Routes>
               <Route path="/login" element={<LoginForm />} />
               <Route path="/sign-up" element={<SignUpForm />} />
               <Route
                  path="/forgot-password"
                  element={<ForgotPasswordForm />}
               />
               <Route
                  path="/update-password"
                  element={<UpdatePasswordForm />}
               />
               <Route path="/chat" element={<ChatBot />} />
               <Route path="*" element={<Navigate to={'/login'} replace />} />
            </Routes>
         </div>
      </BrowserRouter>
   );
}

export default App;
