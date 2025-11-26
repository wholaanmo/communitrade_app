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
          width: calc(2.5rem + 32px); /* collapsed width same as Tailwind */
          min-height: calc(100vh - 60px);
          overflow: hidden;
          padding: 1rem;
          background-color: #728a9c; /* same bg color */
          color: #121731;
          transition: all 0.5s ease-out;
          position: fixed;
          left: 0;
          top: 60px;
          z-index: 50; /* same as Tailwind z-50 */
        }

        .menu {
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .menu .button {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 1rem;
          transition: all 0.2s ease-out;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          width: 100%;
          justify-content: center;
        }

        .menu .button .material-icons {
          font-size: 1.5rem;
          color: #ffffff;
          transition: all 0.2s ease-out;
          min-width: 2rem;
          text-align: center;
        }

        .menu .button .text {
          color: #ffffff;
          transition: all 0.2s ease-out;
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
          justify-content: center;
          width: 100%;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #121731;
        }

        .menu-bottom .sign-out {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 1rem;
          transition: all 0.2s ease-out;
          border-radius: 0.5rem;
          width: 100%;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
        }

        .menu-bottom .sign-out .material-icons {
          font-size: 1.5rem;
          color: #ffffff;
          transition: all 0.2s ease-out;
          min-width: 2rem;
          text-align: center;
        }

        .menu-bottom .sign-out .text {
          color: #ffffff;
          transition: all 0.2s ease-out;
          opacity: 0;
          width: 0;
          overflow: hidden;
          font-size: 1rem;
        }

        .menu-bottom .sign-out:hover {
          background-color: #ffffff;
        }

        .menu-bottom .sign-out:hover .material-icons,
        .menu-bottom .sign-out:hover .text {
          color: #728a9c;
        }

        aside.is_expanded {
          width: 230px; /* expanded width same as Tailwind */
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

        aside.is_expanded .menu-bottom .sign-out {
          justify-content: flex-start;
        }

        aside.is_expanded .menu-bottom .sign-out .text {
          opacity: 1;
          width: auto;
          padding-left: 1rem;
        }

        @media (max-width: 768px) {
          aside {
            position: fixed;
            width: 230px;
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
  );
}
