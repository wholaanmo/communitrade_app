'use client'

import { useState, useEffect } from 'react'
import AdminOffersTemplate from '@/components/templates/AdminOffersTemplate'
import ProfileModal from '@/components/molecules/ProfileModal'
import Modal from '@/components/molecules/Modal'
import Button from '@/components/atoms/Button'

// Mock data (same as your original)
const userProfiles = {
  'Alex Johnson': {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    isVerified: true,
    userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [
      { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/alex.johnson' },
      { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/alex.johnson' },
      { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/alex-johnson' }
    ],
    skillOffers: [
      {
        id: 101,
        skills: 'Web Development & UI/UX Design',
        description: 'Experienced full-stack developer offering website development and design services.',
        category: 'Technology',
        location: 'Remote',
        skillsRequested: 'Digital marketing, Content writing',
        schedule: 'Weekdays, 9 AM - 6 PM',
        additionalNotes: 'Portfolio available upon request.',
        timePosted: '1 day ago',
        proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
      }
    ],
    skillRequests: []
  }
  // ... include other user profiles from your original data
}

const initialPosts = [
  {
    id: 1,
    userName: 'Alex Johnson',
    userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '2 hours ago',
    skills: 'Web Development & UI/UX Design',
    description: 'Experienced full-stack developer offering website development and design services.',
    category: 'Technology',
    location: 'Remote',
    skillsRequested: 'Digital marketing, Content writing',
    schedule: 'Within 2 weeks',
    additionalNotes: 'Portfolio available upon request.'
  }
  // ... include other posts from your original data
]

const initialReportedPosts = [
  {
    id: 5,
    userName: 'John Doe',
    userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '3 days ago',
    skills: 'Illegal Software Services',
    description: 'Offering help with cracking software licenses.',
    category: 'Technology',
    location: 'Remote',
    skillsRequested: 'Graphic design services',
    schedule: 'ASAP',
    additionalNotes: 'Must be discreet about this.',
    reportReason: 'Offering illegal services - software piracy'
  }
  // ... include other reported posts from your original data
]

export default function SkillOfferPlatform() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showReportedPosts, setShowReportedPosts] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showKeepModal, setShowKeepModal] = useState(false)
  
  const [posts, setPosts] = useState(initialPosts)
  const [reportedPosts, setReportedPosts] = useState(initialReportedPosts)
  const [currentProfile, setCurrentProfile] = useState({})
  const [postToDelete, setPostToDelete] = useState(null)
  const [postToRemove, setPostToRemove] = useState(null)
  const [postToKeep, setPostToKeep] = useState(null)

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      post.skills.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      post.skillsRequested.toLowerCase().includes(query)
    )
  })

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleSearch = (query) => {
    console.log('Searching for:', query)
  }

  const handleToggleReportedPosts = () => {
    setShowReportedPosts(!showReportedPosts)
  }

  const handleDeletePost = (post) => {
    setPostToDelete(post)
    setShowDeleteModal(true)
  }

  const handleContactUser = (post) => {
    console.log('Contacting user:', post.userName)
    // Implement contact logic
  }

  const handleViewProfile = (post) => {
    const profile = userProfiles[post.userName] || {
      fullName: post.userName,
      email: 'Not provided',
      phone: 'Not provided',
      isVerified: false,
      userPicture: post.userPicture,
      linkedAccounts: [],
      skillOffers: [],
      skillRequests: []
    }
    setCurrentProfile(profile)
    setShowProfileModal(true)
  }

  const handleKeepPost = (post) => {
    setPostToKeep(post)
    setShowKeepModal(true)
  }

  const handleRemovePost = (post) => {
    setPostToRemove(post)
    setShowRemoveModal(true)
  }

  // Modal confirmation handlers
  const confirmDelete = () => {
    if (postToDelete) {
      setPosts(prev => prev.filter(p => p.id !== postToDelete.id))
      setReportedPosts(prev => prev.filter(p => p.id !== postToDelete.id))
      console.log('Post deleted:', postToDelete)
    }
    setShowDeleteModal(false)
    setPostToDelete(null)
  }

  const confirmRemove = () => {
    if (postToRemove) {
      setReportedPosts(prev => prev.filter(p => p.id !== postToRemove.id))
      setPosts(prev => prev.filter(p => p.id !== postToRemove.id))
      console.log('Post removed:', postToRemove)
    }
    setShowRemoveModal(false)
    setPostToRemove(null)
  }

  const confirmKeep = () => {
    if (postToKeep) {
      setReportedPosts(prev => prev.filter(p => p.id !== postToKeep.id))
      console.log('Post kept:', postToKeep)
    }
    setShowKeepModal(false)
    setPostToKeep(null)
  }

  const closeProfileModal = () => {
    setShowProfileModal(false)
    setCurrentProfile({})
  }

  return (
    <>
      <AdminOffersTemplate
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
        showReportedPosts={showReportedPosts}
        onToggleReportedPosts={handleToggleReportedPosts}
        posts={posts}
        reportedPosts={reportedPosts}
        filteredPosts={filteredPosts}
        onDeletePost={handleDeletePost}
        onContactUser={handleContactUser}
        onViewProfile={handleViewProfile}
        onKeepPost={handleKeepPost}
        onRemovePost={handleRemovePost}
      />

      {/* Confirmation Modals */}
      <Modal
        isOpen={showKeepModal}
        onClose={() => setShowKeepModal(false)}
        title="Keep Reported Post"
        size="small"
      >
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to keep this reported post? This post will be removed from the reported list but will remain visible on the platform.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={confirmKeep}>
            Confirm Keep
          </Button>
          <Button variant="secondary" onClick={() => setShowKeepModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Post"
        size="small"
      >
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        title="Remove Reported Post"
        size="small"
      >
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to remove this reported post? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="danger" onClick={confirmRemove}>
            Confirm Remove
          </Button>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        profile={currentProfile}
        onReport={(post, userName) => console.log('Report:', post, userName)}
        onContact={(post) => console.log('Contact:', post)}
      />
    </>
  )
}