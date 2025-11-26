'use client'

import { useState, useRef } from 'react'
import ProfileSection from '@/components/organisms/ProfileSection'
import PostsSection from '@/components/organisms/PostsSection'
import Modal from '@/components/molecules/Modal'
import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'

export default function AccountPage() {
  // User data state
  const [user, setUser] = useState({
    fullName: 'Kathryn Bernardo',
    username: 'kathryn_b',
    email: 'kathryn.bernardo@example.com',
    phone: '+1 (555) 123-4567',
    governmentId: 'XXX-XX-XXXX',
    profileImageUrl: '',
    hasProfilePicture: false,
    idPhotoUrl: '',
    linkedAccounts: [],
    skillOffers: [
      {
        id: 1,
        skills: 'Web Development & UI/UX Design',
        description: 'Experienced full-stack developer offering website development and design services.',
        category: 'Technology',
        location: 'Remote',
        skillsRequested: 'Digital marketing, Content writing',
        schedule: 'Weekdays, 9 AM - 6 PM',
        additionalNotes: 'Portfolio available upon request. Can work with tight deadlines.',
        proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
        timePosted: '2 days ago'
      }
    ],
    skillRequests: [
      {
        id: 1,
        request: 'Need help with mobile app design',
        description: 'Looking for a designer to help create a mobile app interface for my startup.',
        category: 'Design',
        location: 'Remote',
        skillsOffered: 'Backend development',
        schedule: 'Within 3 weeks',
        additionalNotes: 'Experience with Figma preferred.',
        proof: null,
        timePosted: '1 day ago'
      }
    ]
  })

  // UI state
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPost, setEditingPost] = useState({})
  const [editingPostType, setEditingPostType] = useState('')

  // Refs
  const profilePicInput = useRef(null)
  const idFileInput = useRef(null)

  // Profile section handlers
  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {
      setEditData({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        governmentId: user.governmentId,
        linkedAccounts: [...user.linkedAccounts]
      })
    } else {
      setEditData({})
    }
  }

  const handleEditDataChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = () => {
    setUser(prev => ({
      ...prev,
      ...editData
    }))
    setIsEditing(false)
    setEditData({})
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditData({})
  }

  const handleProfilePicChange = () => {
    profilePicInput.current?.click()
  }

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setUser(prev => ({ 
        ...prev, 
        profileImageUrl: imageUrl,
        hasProfilePicture: true 
      }))
    }
  }

  // Posts section handlers
  const handleEditOffer = (offer) => {
    setEditingPost(offer)
    setEditingPostType('offer')
    setShowEditModal(true)
  }

  const handleEditRequest = (request) => {
    setEditingPost(request)
    setEditingPostType('request')
    setShowEditModal(true)
  }

  const handleDeleteOffer = (offerId) => {
    setPostToDelete(offerId)
    setDeleteType('offer')
    setShowDeleteConfirmation(true)
  }

  const handleDeleteRequest = (requestId) => {
    setPostToDelete(requestId)
    setDeleteType('request')
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    if (deleteType === 'offer') {
      setUser(prev => ({
        ...prev,
        skillOffers: prev.skillOffers.filter(offer => offer.id !== postToDelete)
      }))
    } else if (deleteType === 'request') {
      setUser(prev => ({
        ...prev,
        skillRequests: prev.skillRequests.filter(request => request.id !== postToDelete)
      }))
    }
    setShowDeleteConfirmation(false)
    setPostToDelete(null)
    setDeleteType('')
  }

  const handleSavePostEdit = () => {
    if (editingPostType === 'offer') {
      setUser(prev => ({
        ...prev,
        skillOffers: prev.skillOffers.map(offer => 
          offer.id === editingPost.id ? editingPost : offer
        )
      }))
    } else {
      setUser(prev => ({
        ...prev,
        skillRequests: prev.skillRequests.map(request => 
          request.id === editingPost.id ? editingPost : request
        )
      }))
    }
    setShowEditModal(false)
    setEditingPost({})
    setEditingPostType('')
  }

  const handleEditPostChange = (field, value) => {
    setEditingPost(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="account-page p-6 lg:p-8 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column - Profile Section */}
          <ProfileSection
            user={user}
            isEditing={isEditing}
            editData={editData}
            onEditToggle={handleEditToggle}
            onSaveChanges={handleSaveChanges}
            onCancelEdit={handleCancelEdit}
            onProfilePicChange={handleProfilePicChange}
            onEditDataChange={handleEditDataChange}
          />

          {/* Right Column - Posts Section */}
          <PostsSection
            skillOffers={user.skillOffers}
            skillRequests={user.skillRequests}
            onEditOffer={handleEditOffer}
            onEditRequest={handleEditRequest}
            onDeleteOffer={handleDeleteOffer}
            onDeleteRequest={handleDeleteRequest}
          />
        </div>
      </div>

      {/* Hidden file inputs */}
      <input 
        type="file" 
        ref={profilePicInput}
        onChange={handleProfilePicUpload}
        accept="image/*"
        className="hidden"
      />
      <input 
        type="file" 
        ref={idFileInput}
        accept="image/*"
        className="hidden"
      />

      {/* Edit Post Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit Skill ${editingPostType === 'offer' ? 'Offer' : 'Request'}`}
        size="large"
      >
        <div className="space-y-4">
          <FormField
            label={editingPostType === 'offer' ? 'Skills *' : 'Request *'}
            type="text"
            value={editingPostType === 'offer' ? editingPost.skills : editingPost.request}
            onChange={(e) => handleEditPostChange(
              editingPostType === 'offer' ? 'skills' : 'request', 
              e.target.value
            )}
            required
          />

          <FormField
            label="Description *"
            type="textarea"
            value={editingPost.description}
            onChange={(e) => handleEditPostChange('description', e.target.value)}
            required
            rows={3}
          />

          <FormField
            label="Category *"
            type="select"
            value={editingPost.category}
            onChange={(e) => handleEditPostChange('category', e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
            <option value="Education">Education</option>
            <option value="Home Services">Home Services</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Other">Other</option>
          </FormField>

          <FormField
            label="Location *"
            type="text"
            value={editingPost.location}
            onChange={(e) => handleEditPostChange('location', e.target.value)}
            required
          />

          <FormField
            label={editingPostType === 'offer' ? 'Skills Requested' : 'Skills Offered'}
            type="text"
            value={editingPostType === 'offer' ? editingPost.skillsRequested : editingPost.skillsOffered}
            onChange={(e) => handleEditPostChange(
              editingPostType === 'offer' ? 'skillsRequested' : 'skillsOffered', 
              e.target.value
            )}
          />

          <FormField
            label="Schedule *"
            type="text"
            value={editingPost.schedule}
            onChange={(e) => handleEditPostChange('schedule', e.target.value)}
            required
          />

          <FormField
            label="Additional Notes"
            type="textarea"
            value={editingPost.additionalNotes}
            onChange={(e) => handleEditPostChange('additionalNotes', e.target.value)}
            rows={2}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSavePostEdit}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        title="Confirm Delete"
        size="small"
      >
        <div className="text-center">
          <p className="text-[#555] mb-6">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}