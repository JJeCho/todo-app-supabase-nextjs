import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My To-Do List App',
  description: 'A simple to-do list app using Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
