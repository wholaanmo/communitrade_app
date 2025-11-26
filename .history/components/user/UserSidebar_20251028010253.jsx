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

  const toggleMenu = () => {
    const newValue = !is_expanded
    setIsExpanded(newValue)
    onToggle(newValue)
  }

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Sign out clicked')
  }

  return (
    <aside className={`flex flex-col items-center font-['Inter'] w-[calc(3.5rem+32px)] min-h-[calc(100vh-60px)] overflow-hidden p-4 bg-[#728a9c] text-[#121731] transition-all duration-500 ease-out fixed left-0 top-[60px] z-50 ${is_expanded && 'is_expanded'}`}>
      <div className="menu w-full m-0 flex flex-col items-center flex-1">
        <Link href="/" className="button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 w-full justify-center">
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center">dashboard</span>
          <span className="text text-white transition-all duration-200 ease-out opacity-0 w-0 overflow-hidden">Dashboard</span>
        </Link>
        <Link href="/request" className="button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 w-full justify-center">
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center">assignment</span>
          <span className="text text-white transition-all duration-200 ease-out opacity-0 w-0 overflow-hidden">Requests</span>
        </Link>
        <Link href="/offer" className="button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 w-full justify-center">
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center">front_hand</span>
          <span className="text text-white transition-all duration-200 ease-out opacity-0 w-0 overflow-hidden">Offers</span>
        </Link>
        <Link href="/message" className="button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 w-full justify-center">
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center">chat</span>
          <span className="text text-white transition-all duration-200 ease-out opacity-0 w-0 overflow-hidden">Messages</span>
        </Link>
        <Link href="/account" className="button flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg mb-2 w-full justify-center">
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center">account_circle</span>
          <span className="text text-white transition-all duration-200 ease-out opacity-0 w-0 overflow-hidden">My Account</span>
        </Link>
      </div>

      <div className="menu-bottom flex justify-center w-full mt-auto pt-4 border-t border-[#121731]">
        <button className="sign-out flex items-center no-underline p-4 transition-all duration-200 ease-out rounded-lg w-full justify-center bg-none border-none cursor-pointer" onClick={handleSignOut}>
          <span className="material-icons text-2xl text-white transition-all duration-200 ease-out min-w-8 text-center">logout</span>
          <span className="text text-white transition-all duration-200 ease-out opacity-0 w-0 overflow-hidden text-lg">Sign Out</span>
        </button>
      </div>

      <style jsx>{`
        aside.is_expanded {
          width: var(--sidebar-width);
          align-items: flex-start;
        }
        
        aside.is_expanded .menu {
          align-items: stretch;
        }
        
        aside.is_expanded .button {
          justify-content: flex-start;
        }
        
        aside.is_expanded .button .text {
          opacity: 1;
          width: auto;
          padding-left: 1rem;
        }
        
        aside.is_expanded .button .material-icons {
          margin-right: 0;
        }
        
        aside.is_expanded .menu-bottom .sign-out {
          justify-content: flex-start;
        }
        
        aside.is_expanded .menu-bottom .sign-out .text {
          opacity: 1;
          width: auto;
          padding-left: 1rem;
        }
        
        aside.is_expanded .menu-bottom .sign-out .material-icons {
          margin-right: 0;
          margin-left: 0.4rem;
        }
        
        .button:hover {
          background-color: #ffffff;
        }
        
        .button:hover .material-icons,
        .button:hover .text {
          color: #728a9c;
        }
        
        .sign-out:hover {
          background-color: #ffffff;
        }
        
        .sign-out:hover .material-icons,
        .sign-out:hover .text {
          color: #728a9c;
        }
        
        @media (max-width: 768px) {
          aside {
            position: fixed;
            width: 280px;
            top: 60px;
            height: calc(100vh - 60px);
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.5s ease-out;
          }
          
          aside.is_expanded {
            transform: translateX(0);
          }
        }
        
        @media (max-width: 480px) {
          aside {
            width: 100%;
          }
        }
      `}</style>
    </aside>
  )
}