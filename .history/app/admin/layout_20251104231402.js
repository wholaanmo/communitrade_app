'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout min-h-screen">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <div className="layout-body flex min-h-[calc(100vh-60px)] mt-[60px]">
        <AdminSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
        
        <main
          className={`admin-content flex-1 transition-all duration-500 ease-out p-8 ${
            sidebarOpen
              ? 'ml-[var(--sidebar-width)]'
              : 'ml-[calc(3.5rem+32px)]'
          }`}
        >
          {children}
        </main>
      </div>

      <style jsx global>{`
        :root {
          --sidebar-width: 220px;
        }
      `}</style>

      <style jsx>{`
        @media (max-width: 768px) {
          .admin-content {
            margin-left: 0 !important;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
