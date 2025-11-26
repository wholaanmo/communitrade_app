'use client'

import { useState } from 'react'
import AdminNavbar from '@/components/admin/organisms/AdminNavbar'
import AdminSidebar from '@/components/admin/organisms/Sidebar'

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="admin-layout min-h-screen">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <div className="layout-body flex min-h-[calc(100vh-60px)] mt-[60px]">
        <AdminSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        <main className={`admin-content flex-1 transition-all duration-300 ease-in-out p-4 lg:p-8 ${
          sidebarOpen ? 'lg:ml-[230px]' : 'lg:ml-[calc(2.5rem+32px)]'
        }`}>
          {children}
        </main>
      </div>
    </div>
  )
}
