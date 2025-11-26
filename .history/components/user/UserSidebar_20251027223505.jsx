'use client'

import Image from 'next/image'

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar fixed top-0 left-0 right-0 h-15 bg-gray-500 text-white z-50 shadow-lg">
      <div className="navbar-content flex items-center justify-between h-full px-4">
        <div className="navbar-left flex items-center">
          <div className="logo-container flex items-center gap-2">
            <Image 
              src="/assets/CommuniTrade.png" 
              alt="CommuniTrade Logo" 
              width={52}
              height={52}
              className="logo-img object-contain ml-1"
            />
            <p className="logo-text font-bold text-lg text-primary">
              Communi<span className="logo-text1 font-bold text-lg text-white">Trade</span>
            </p>
          </div>
        </div>
        
        <div className="navbar-right flex items-center">
          <button 
            className="hamburger-btn flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out text-white hover:text-primary hover:rotate-180"
            onClick={toggleSidebar}
          >
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 60px;
          z-index: 98;
        }

        @media (max-width: 480px) {
          .logo-text {
            font-size: 1rem;
          }
          
          .logo-img {
            width: 35px;
            height: 35px;
          }
        }

        @media (max-width: 360px) {
          .logo-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </nav>
  )
}