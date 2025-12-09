'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function NotAuthorized() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-4">
          You don't have permission to access the admin area.
        </p>
        {session?.user?.email && (
          <p className="text-sm text-gray-500 mb-6">
            Logged in as: {session.user.email}
          </p>
        )}
        <div className="flex flex-col gap-3">
          <Link 
            href="/user/account"
            className="bg-[#121731] text-white px-6 py-2 rounded-lg hover:bg-[#728a9c] transition-colors"
          >
            Go to User Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-700 underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}