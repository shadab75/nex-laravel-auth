 
import BootstrapClient from '@/components/BootstrapClient';
import Header from '@/components/Header';
import Toastify from '@/components/Tostify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/context/AuthContext';
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
  <Header/>
        {children}
         <Toastify/>
   <BootstrapClient/>
        </AuthProvider>
      </body>
    </html>
  );
}
