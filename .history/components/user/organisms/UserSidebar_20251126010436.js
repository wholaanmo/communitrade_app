'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SidebarItem from '@/components/atoms/SidebarItem'
import Modal from '@/components/molecules/Modal'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function UserSidebar({ isOpen, onToggle }) {
  const [is_expanded, setIsExpanded] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsExpanded(isOpen)
  }, [isOpen])

  const handleSignOut = () => {
    setShowSignOutModal(true)
  }

  const confirmSignOut = () => {
    console.log('Signing out...')
    setShowSignOutModal(false)
    router.push('/login')
  }

  const menuItems = [
    { href: "/user/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/user/request", icon: "assignment", label: "Requests" },
    { href: "/user/offer", icon: "front_hand", label: "Offers" },
    { href: "/user/message", icon: "chat", label: "Messages" },
    { href: "/user/account", icon: "account_circle", label: "My Account" },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] z-40 lg:hidden"
          onClick={() => onToggle(false)}
        />
      )}
      
      <aside className={`
        flex flex-col items-center font-['Inter'] 
        min-h-[calc(100vh-60px)] overflow-hidden p-4 
        bg-[#728a9c] text-[#121731] transition-all duration-300 ease-in-out 
        fixed left-0 top-[60px] z-50
        ${is_expanded ? 'w-[230px] items-start' : 'w-[calc(2.5rem+32px)] items-center'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Menu Items */}
        <div className={`
          menu w-full m-0 flex flex-col flex-1
          ${is_expanded ? 'items-stretch' : 'items-center'}
        `}>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isExpanded={is_expanded}
            />
          ))}
        </div>

        {/* Sign Out Button */}
        <div className="menu-bottom flex justify-center w-full mt-auto pt-4 border-t border-[#121731]">
          <SidebarItem
            icon="logout"
            label="Sign Out"
            isExpanded={is_expanded}
            onClick={handleSignOut}
          />
        </div>
      </aside>

      {/* Sign Out Confirmation Modal */}
      <Modal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        title="Confirm Sign Out"
        size="small"
      >
        <div className="text-center mb-6">
          <Icon name="warning" className="text-4xl text-red-600 mb-3" />
          <p className="text-[#728a9c]">Are you sure you want to sign out?</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={() => setShowSignOutModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmSignOut}
          >
            Sign Out
          </Button>
        </div>
      </Modal>
    </>
  )
}