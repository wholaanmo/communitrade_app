'use client'

import { useState } from 'react'
import UserNavbar from '@/components/user/UserNavbar'
import UserSidebar from '@/components/user/UserSidebar'

export default function UserLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="user-layout min-h-screen">
      <UserNavbar toggleSidebar={toggleSidebar} />
      <div className="layout-body flex min-h-[calc(100vh-60px)] mt-[60px]">
        <UserSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        <main className={`user-content flex-1 transition-all duration-500 ease-out p- ${
          sidebarOpen ? 'ml-[var(--sidebar-width)]' : 'ml-[calc(3.5rem+22px)]'
        }`}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        :root {
          --sidebar-width: 280px;
        }
      `}</style>

      <style jsx>{`
        @media (max-width: 768px) {
          .user-content {
            margin-left: 0 !important;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}