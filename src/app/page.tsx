"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Home() {
  const session = useAuth(); // Get the session from the AuthContext
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My To-Do List App</h1>
      <div className="space-x-4">
        {session ? (
          <>
            <button onClick={signOut} className="text-red-500 underline">
              Logout
            </button>
            <Link href="/profile">
              <span className="text-blue-500 underline">Profile</span>
            </Link>
            <Link href="/todo">
              <span className="text-blue-500 underline">To-Do List</span>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <span className="text-blue-500 underline">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
