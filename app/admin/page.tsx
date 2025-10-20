"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(data.user);
      setLoading(false);
    };
    check();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => listener?.subscription.unsubscribe(), (mounted = false);
  }, []);

  if (loading) return <div className="container py-24">Loading...</div>;

  if (!user || user.email !== "adebayotoheen666@gmail.com") {
    return (
      <main className="container py-24">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="mt-4">You must be signed in as the admin to view this page.</p>
        <Link href="/admin/signin" className="inline-block mt-4 text-blue-600 underline">
          Sign in
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-24">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Welcome, {user.email}</p>
      <div className="mt-6">
        <Link href="/admin/create-post" className="text-blue-600 underline">
          Create new post (not implemented here)
        </Link>
      </div>
    </main>
  );
}
