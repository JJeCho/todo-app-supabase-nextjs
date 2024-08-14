"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function Profile() {
  const session = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Session on page load:", data.session); // Debugging line
      if (!data.session) {
        router.push('/login');
      }
    };
  
    checkSession();
  }, [router]);


  return session ? <div>Your Profile</div> : null;
}
