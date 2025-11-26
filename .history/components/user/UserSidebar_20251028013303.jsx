'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Sidebar({ isOpen, onToggle }) {
  const [is_expanded, setIsExpanded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsExpanded(isOpen)
  }, [isOpen])

  const handleSignOut = () => {
    console.log('Sign out clicked')
  }

  return (
    <aside className={`
      flex flex-col items-center font-['Inter'] 
      min-h-[calc(100vh-60px)] overflow-hidden p-4 
      bg-[#728a9c] text-[#121731] transition-all duration-500 ease-out 
      fixed left-0 top-[60px] z-50
      ${is_expanded ? 'w-[280px] items-start' : 'w-[calc(3.5rem+32px)] items-center'}
    `}>
      {/* Menu Items */}
      <div className={`
        menu w-full m-0 flex flex-col flex-1
        ${is_expanded ? 'items-stretch' : 'items-center'}
      `}>
        <Link href="/" className={`
          button flex items-center no-underline p-4 
          transition-all duration-200 ease-out rounded-lg mb-2
          hover:bg-white
          ${is_expanded ? 'justify-start' : 'justify-center w-full'}
        `}>
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center hover:text-[#728a9c]">dashboard</span>
          <span className={`
            text-white transition-all duration-200 ease-out
            hover:text-[#728a9c]
            ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
          `}>Dashboard</span>
        </Link>

        <Link href="/request" className={`
          button flex items-center no-underline p-4 
          transition-all duration-200 ease-out rounded-lg mb-2
          hover:bg-white
          ${is_expanded ? 'justify-start' : 'justify-center w-full'}
        `}>
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center hover:text-[#728a9c]">assignment</span>
          <span className={`
            text-white transition-all duration-200 ease-out
            hover:text-[#728a9c]
            ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
          `}>Requests</span>
        </Link>

        <Link href="/offer" className={`
          button flex items-center no-underline p-4 
          transition-all duration-200 ease-out rounded-lg mb-2
          hover:bg-white
          ${is_expanded ? 'justify-start' : 'justify-center w-full'}
        `}>
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center hover:text-[#728a9c]">front_hand</span>
          <span className={`
            text-white transition-all duration-200 ease-out
            hover:text-[#728a9c]
            ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
          `}>Offers</span>
        </Link>

        <Link href="/message" className={`
          button flex items-center no-underline p-4 
          transition-all duration-200 ease-out rounded-lg mb-2
          hover:bg-white
          ${is_expanded ? 'justify-start' : 'justify-center w-full'}
        `}>
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center hover:text-[#728a9c]">chat</span>
          <span className={`
            text-white transition-all duration-200 ease-out
            hover:text-[#728a9c]
            ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
          `}>Messages</span>
        </Link>

        <Link href="/account" className={`
          button flex items-center no-underline p-4 
          transition-all duration-200 ease-out rounded-lg mb-2
          hover:bg-white
          ${is_expanded ? 'justify-start' : 'justify-center w-full'}
        `}>
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center hover:text-[#728a9c]">account_circle</span>
          <span className={`
            text-white transition-all duration-200 ease-out
            hover:text-[#728a9c]
            ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
          `}>My Account</span>
        </Link>
      </div>

      {/* Sign Out Button */}
      <div className="menu-bottom flex justify-center w-full mt-auto pt-4 border-t border-[#121731]">
        <button onClick={handleSignOut} className={`
          sign-out flex items-center no-underline p-4 
          transition-all duration-200 ease-out rounded-lg
          hover:bg-white bg-none border-none cursor-pointer
          ${is_expanded ? 'justify-start w-full' : 'justify-center w-full'}
        `}>
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center hover:text-[#728a9c]">logout</span>
          <span className={`
            text-white transition-all duration-200 ease-out text-lg
            hover:text-[#728a9c]
            ${is_expanded ? 'opacity-100 w-auto pl-4' : 'opacity-0 w-0 overflow-hidden'}
          `}>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}