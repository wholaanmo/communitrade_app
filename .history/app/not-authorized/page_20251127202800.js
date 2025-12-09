'use client';

import Link from 'next/link';

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link 
          href="/user/account"
          className="bg-[#121731] text-white px-6 py-2 rounded-lg hover:bg-[#728a9c] transition-colors"
        >
          Go to User Dashboard
        </Link>
      </div>
    </div>
  );
}