'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/Sidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <div className="layout-body">
        <AdminSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
        <main className={`admin-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {children}
        </main>
      </div>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
        }
        
        .layout-body {
          display: flex;
          min-height: calc(100vh - 60px);
          margin-top: 30px; /* Account for navbar height */
        }
        
        .admin-content {
          flex: 1 1 0;
          margin-left: calc(1.5rem + 32px);
          transition: margin-left 0.2s ease-out;
          padding: 2rem;
        }
        
        .admin-content.sidebar-open {
          margin-left: var(--sidebar-width);
        }
        
        @media (max-width: 768px) {
          .admin-content {
            margin-left: 0;
            padding: 1rem;
          }
          
          .admin-content.sidebar-open {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}