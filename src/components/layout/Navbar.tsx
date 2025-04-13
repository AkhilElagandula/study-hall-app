'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Study Hall
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/">Home</Link>
        <Link href="/my-bookings">My Bookings</Link>
        {session?.user ? (
          <>
            <Link href="/admin/halls">Admin</Link>
            <button onClick={() => signOut()} className="text-sm text-red-500 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
}