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
    <aside className={is_expanded ? 'is_expanded' : ''}>
      <div className="menu">
        <Link href="/admin/users" className="button">
          <span className="material-icons">group</span>
          <span className="text">Management</span>
        </Link>
        <Link href="/admin/req" className="button">
          <span className="material-icons">assignment</span>
          <span className="text">Requests</span>
        </Link>
        <Link href="/admin/off" className="button">
          <span className="material-icons">front_hand</span>
          <span className="text">Offers</span>
        </Link>
        <Link href="/admin/acc" className="button">
          <span className="material-icons">account_circle</span>
          <span className="text">My Account</span>
        </Link>
      </div>

      <div className="menu-bottom">
        <button className="button sign-out" onClick={handleSignOut}>
          <span className="material-icons">logout</span>
          <span className="text">Sign Out</span>
        </button>
      </div>

      <style jsx>{`
        aside {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Inter', sans-serif;
          width: calc(3.5rem + 32px);
          min-height: calc(100vh - 60px); /* Account for navbar height */
          overflow: hidden;
          padding: 1rem;
          background-color: #728a9c;
          color: #121731;
          transition: 0.5s ease-out; /* Slower transition */
          position: fixed;
          left: 0;
          top: 60px; /* Position below navbar */
          z-index: 97; /* Lower than navbar */
        }
        
        .menu {
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1; /* Take available space */
        }
        
        .menu .button {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 1rem;
          transition: 0.2s ease-out;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          width: 100%;
          justify-content: center;
        }
        
        .menu .button .material-icons {
          font-size: 2rem;
          color: #ffffff;
          transition: 0.2s ease-out;
          min-width: 2rem;
          text-align: center;
        }
        
        .menu .button .text {
          color: #ffffff;
          transition: 0.2s ease-out;
          opacity: 0;
          width: 0;
          overflow: hidden;
        }
        
        .menu .button:hover {
          background-color: #ffffff;
        }
        
        .menu .button:hover .material-icons,
        .menu .button:hover .text {
          color: #728a9c;
        }
        
        .menu-bottom {
          justify-content: center; /* Keep centered when expanded */
          width: 100%;
          margin-top: auto; /* Push to bottom */
          padding-top: 1rem;
          border-top: 1px solid #121731;
        }
        
        .menu-bottom .sign-out {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 1rem;
          transition: 0.2s ease-out;
          border-radius: 0.5rem;
          width: 100%;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .menu-bottom .sign-out .material-icons {
          font-size: 2rem;
          color: #ffffff;
          transition: 0.2s ease-out;
          min-width: 2rem;
          text-align: center;
        }
        
        .menu-bottom .sign-out .text {
          color: #ffffff;
          transition: 0.2s ease-out;
          opacity: 0;
          width: 0;
          overflow: hidden;
          font-size: 1.1rem;
        }
        
        .menu-bottom .sign-out:hover {
          background-color: #ffffff;
        }
        
        .menu-bottom .sign-out:hover .material-icons,
        .menu-bottom .sign-out:hover .text {
          color: #728a9c;
        }
        
        aside.is_expanded {
          width: var(--sidebar-width);
          align-items: flex-start;
        }
        
        aside.is_expanded .menu {
          align-items: stretch;
        }
        
        aside.is_expanded .menu .button {
          justify-content: flex-start;
        }
        
        aside.is_expanded .menu .button .text {
          opacity: 1;
          width: auto;
          padding-left: 1rem;
        }
        
        aside.is_expanded .menu .button .material-icons {
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
        
        @media (max-width: 768px) {
          aside {
            position: fixed;
            width: 280px; /* Slightly narrower on mobile */
            top: 60px; /* Position below navbar */
            height: calc(100vh - 60px); /* Full height minus navbar */
            z-index: 97; /* Lower than navbar */
            transform: translateX(-100%); /* Hide off-screen by default */
            transition: transform 0.5s ease-out; /* Slower slide transition */
          }
          
          aside.is_expanded {
            transform: translateX(0); /* Slide in when expanded */
          }
          
          /* Adjust logo text for very small screens */
          .logo-text {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          aside {
            width: 100%; /* Full width on very small screens */
          }
        }
      `}</style>
    </aside>
  );
}