'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import UserNavbar from '@/components/user/UserNavbar'
import UserSidebar from '@/components/user/UserSidebar'

export default function UserLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="user-layout min-h-screen">
      <UserNavbar toggleSidebar={toggleSidebar} />
      <div className="layout-body flex min-h-[calc(100vh-60px)] mt-[30px]">
        <UserSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        <main className={`user-content flex-1 ml-[calc(1.5rem+32px)] transition-all duration-200 ease-out p-8 ${sidebarOpen && 'sidebar-open'}`}>
          {children}
        </main>
      </div>

      <style jsx>{`
        .user-content.sidebar-open {
          margin-left: var(--sidebar-width);
        }

        @media (max-width: 768px) {
          .user-content {
            margin-left: 0;
            padding: 1rem;
          }
          
          .user-content.sidebar-open {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}