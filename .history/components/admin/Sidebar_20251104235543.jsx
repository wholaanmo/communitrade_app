'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar({ isOpen, onToggle }) {
  const [is_expanded, setIsExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Sign out clicked');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div  
          className="fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center p-5 z-40 lg:hidden"
          onClick={() => onToggle(false)}
        />
      )}
      
      <aside className={`
        flex flex-col font-['Inter'] h-[calc(100vh-60px)] overflow-hidden p-4 bg-[#728a9c] text-[#121731] transition-all duration-300 ease-in-out fixed left-0 top-[60px] z-50
        ${is_expanded ? 'w-[230px] items-start' : 'w-[calc(2.5rem+32px)] items-center'}
        lg:relative lg:top-0 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Menu Items - This container will scroll */}
        <div className={`
          menu w-full m-0 flex flex-col flex-1 overflow-y-auto
          ${is_expanded ? 'items-stretch' : 'items-center'}
        `}>
          <Link href="/admin/users" className={`
            group button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 hover:bg-white flex-shrink-0
            ${is_expanded ? 'justify-start' : 'justify-center w-full'}
          `}>
            <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center group-hover:text-[#728a9c]">group</span>
            <span className={`
              text-white transition-all duration-200 ease-out group-hover:text-[#728a9c]
              ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
            `}>Management</span>
          </Link>

          <Link href="/admin/req" className={`
            group button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 hover:bg-white flex-shrink-0
            ${is_expanded ? 'justify-start' : 'justify-center w-full'}
          `}>
            <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center group-hover:text-[#728a9c]">assignment</span>
            <span className={`
              text-white transition-all duration-200 ease-out group-hover:text-[#728a9c]
              ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
            `}>Requests</span>
          </Link>

          <Link href="/admin/off" className={`
            group button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 hover:bg-white flex-shrink-0
            ${is_expanded ? 'justify-start' : 'justify-center w-full'}
          `}>
            <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center group-hover:text-[#728a9c]">front_hand</span>
            <span className={`
              text-white transition-all duration-200 ease-out group-hover:text-[#728a9c]
              ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
            `}>Offers</span>
          </Link>

          <Link href="/admin/acc" className={`
            group button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 hover:bg-white flex-shrink-0
            ${is_expanded ? 'justify-start' : 'justify-center w-full'}
          `}>
            <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center group-hover:text-[#728a9c]">account_circle</span>
            <span className={`
              text-white transition-all duration-200 ease-out group-hover:text-[#728a9c]
              ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
            `}>My Account</span>
          </Link>
        </div>

        {/* Sign Out Button - This stays fixed at the bottom */}
        <div className="menu-bottom flex justify-center w-full pt-4 border-t border-[#121731] flex-shrink-0">
          <button onClick={handleSignOut} className={`
            group sign-out flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg hover:bg-white bg-none border-none cursor-pointer w-full flex-shrink-0
            ${is_expanded ? 'justify-start' : 'justify-center'}
          `}>
            <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center group-hover:text-[#728a9c]">logout</span>
            <span className={`
              text-white transition-all duration-200 ease-out text-lg group-hover:text-[#728a9c]
              ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
            `}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
