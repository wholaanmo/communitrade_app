'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

// Import atomic design components
import SearchBar from '@/components/molecules/SearchBar'
import PostCard from '@/components/molecules/PostCard'
import Modal from '@/components/molecules/Modal'
import Button from '@/components/atoms/Button'
import Label from '@/components/atoms/Label'
import FileUpload from '@/components/atoms/FileUpload'
import Icon from '@/components/atoms/Icon'
import FormField from '@/components/molecules/FormField'
import EmptyState from '@/components/molecules/EmptyState'
import ReportModal from '@/components/molecules/ReportModal'
import ProfileModal from '@/components/molecules/ProfileModal'

// Custom button components for offer page
const OfferActionButton = ({ type = 'report', onClick, children, className = '' }) => {
  const iconMap = {
    report: 'flag',
    contact: 'message',
    profile: 'account_circle'
  }

  const baseClasses = 'flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none rounded-lg font-medium py-2 px-3 text-xs sm:text-sm flex-1 sm:flex-none justify-center min-w-[100px]'

  const variants = {
    report: 'border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white',
    contact: 'border border-[#121731] text-[#121731] hover:bg-[#121731] hover:text-white',
    profile: 'border border-[#728a9c] text-[#728a9c] bg-white hover:bg-[#728a9c] hover:text-white'
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${variants[type]} ${className}`}
      onClick={onClick}
    >
      <Icon name={iconMap[type]} className="text-base mr-1" />
      {children}
    </button>
  )
}

export default function SkillOfferPlatform() {
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('')

  // Modal state
  const [showForm, setShowForm] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    skills: '',
    description: '',
    category: '',
    location: '',
    skillsRequested: '',
    schedule: '',
    additionalNotes: '',
    proof: null
  })

  // Report data
  const [reportData, setReportData] = useState({
    reason: '',
    description: '',
    proofFile: null
  })

  const [reportUser, setReportUser] = useState('')
  const [currentReportPost, setCurrentReportPost] = useState(null)
  const [currentProfile, setCurrentProfile] = useState({})

  // Report reasons
  const reportReasons = [
    { value: 'fraud', label: 'Fraud/Dishonesty' },
    { value: 'harassment', label: 'Harassment/Abuse' },
    { value: 'safety', label: 'Safety Concerns' },
    { value: 'spam', label: 'Spam/Misuse' },
    { value: 'other', label: 'Other' }
  ]

  // Sample user profiles data
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
      skillRequests: [
        {
          id: 201,
          request: 'Need help with mobile app design',
          description: 'Looking for a designer to help create a mobile app interface for my startup.',
          category: 'Design',
          location: 'Remote',
          skillsOffered: 'Backend development',
          schedule: 'Within 3 weeks',
          additionalNotes: 'Experience with Figma preferred.',
          timePosted: '2 days ago',
          proof: null
        }
      ]
    },
    'Maria Garcia': {
      fullName: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 234-5678',
      isVerified: false,
      userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      linkedAccounts: [
        { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/maria.garcia' },
        { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/maria.garcia' }
      ],
      skillOffers: [
        {
          id: 102,
          skills: 'Spanish & French Tutoring',
          description: 'Native Spanish speaker with fluent French offering language tutoring for all levels.',
          category: 'Education',
          location: 'New York, NY',
          skillsRequested: 'English proofreading',
          schedule: 'Weekends preferred',
          additionalNotes: 'Materials provided.',
          timePosted: '3 days ago',
          proof: null
        }
      ],
      skillRequests: []
    },
    'James Wilson': {
      fullName: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 345-6789',
      isVerified: true,
      userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      linkedAccounts: [
        { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/james-wilson' }
      ],
      skillOffers: [],
      skillRequests: [
        {
          id: 202,
          request: 'Looking for photography lessons',
          description: 'Want to learn basic photography techniques and camera operation.',
          category: 'Education',
          location: 'Chicago, IL',
          skillsOffered: 'Video editing',
          schedule: 'Weekends',
          additionalNotes: 'Beginner level.',
          timePosted: '1 week ago',
          proof: null
        }
      ]
    },
    'Sarah Chen': {
      fullName: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 456-7890',
      isVerified: true,
      userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      linkedAccounts: [
        { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/sarah.chen' },
        { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/sarah.chen' },
        { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/sarah-chen' }
      ],
      skillOffers: [
        {
          id: 103,
          skills: 'Graphic Design & Brand Identity',
          description: 'Creative graphic designer offering logo design and brand identity packages.',
          category: 'Design',
          location: 'Los Angeles, CA',
          skillsRequested: 'Web development',
          schedule: 'Flexible, project-based',
          additionalNotes: 'Multiple revisions included.',
          timePosted: '2 days ago',
          proof: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop'
        }
      ],
      skillRequests: []
    },
    'Michael Brown': {
      fullName: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 567-8901',
      isVerified: true,
      userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      linkedAccounts: [
        { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/michael.brown' },
        { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/michael-brown' }
      ],
      skillOffers: [
        {
          id: 104,
          skills: 'Home Repair & Maintenance',
          description: 'Handyman services including plumbing, electrical work, furniture assembly, and general home repairs.',
          category: 'Home Services',
          location: 'Chicago, IL',
          skillsRequested: 'Gardening, Car maintenance',
          schedule: 'Weekends, Emergency services available',
          additionalNotes: 'Licensed and insured. Free estimates.',
          timePosted: '3 days ago',
          proof: null
        }
      ],
      skillRequests: []
    },
    'Emily Davis': {
      fullName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 678-9012',
      isVerified: false,
      userPicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      linkedAccounts: [
        { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/emily.davis' }
      ],
      skillOffers: [
        {
          id: 105,
          skills: 'Yoga Instruction & Wellness Coaching',
          description: 'Certified yoga instructor offering private sessions and wellness coaching.',
          category: 'Health & Wellness',
          location: 'Austin, TX',
          skillsRequested: 'Nutrition advice, Meditation guidance',
          schedule: 'Mornings and evenings',
          additionalNotes: 'Virtual sessions available. First session free.',
          timePosted: '4 days ago',
          proof: null
        }
      ],
      skillRequests: []
    }
  }

  // Sample posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: 'Alex Johnson',
      userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '2 hours ago',
      skills: 'Web Development & UI/UX Design',
      description: 'Experienced full-stack developer offering website development and design services. Specialized in React, Vue.js, and modern UI/UX principles.',
      category: 'Technology',
      location: 'Remote',
      skillsRequested: 'Digital marketing, Content writing',
      schedule: 'Weekdays, 9 AM - 6 PM',
      additionalNotes: 'Portfolio available upon request. Can work with tight deadlines.',
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop', // ADD THIS
    },
    {
      id: 2,
      userName: 'Maria Garcia',
      userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '5 hours ago',
      skills: 'Spanish & French Tutoring',
      description: 'Native Spanish speaker with fluent French offering language tutoring for all levels. Customized lessons based on your goals.',
      category: 'Education',
      location: 'New York, NY',
      skillsRequested: 'English proofreading, Computer skills',
      schedule: 'Weekends preferred, Flexible hours',
      additionalNotes: 'Experience teaching both children and adults. Materials provided.',
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      userName: 'James Wilson',
      userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '1 day ago',
      skills: 'Content Writing & SEO Optimization',
      description: 'Professional writer offering content creation services for blogs, websites, and marketing materials. SEO optimization included.',
      category: 'Writing',
      location: 'Remote',
      skillsRequested: 'Social media management, Graphic design',
      schedule: '2-3 articles per week',
      additionalNotes: 'Fast turnaround time. Samples available.',
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
    },
    {
      id: 4,
      userName: 'Sarah Chen',
      userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '2 days ago',
      skills: 'Graphic Design & Brand Identity',
      description: 'Creative graphic designer offering logo design, brand identity packages, and marketing materials. Modern and professional designs.',
      category: 'Design',
      location: 'Los Angeles, CA',
      skillsRequested: 'Web development, Photography',
      schedule: 'Flexible, project-based',
      additionalNotes: 'Can work within brand guidelines. Multiple revisions included.',
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop', // ADD THIS
    },
    {
      id: 5,
      userName: 'Michael Brown',
      userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '3 days ago',
      skills: 'Home Repair & Maintenance',
      description: 'Handyman services including plumbing, electrical work, furniture assembly, and general home repairs. Quality work guaranteed.',
      category: 'Home Services',
      location: 'Chicago, IL',
      skillsRequested: 'Gardening, Car maintenance',
      schedule: 'Weekends, Emergency services available',
      additionalNotes: 'Licensed and insured. Free estimates.',
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
    },
    {
      id: 6,
      userName: 'Emily Davis',
      userPicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '4 days ago',
      skills: 'Yoga Instruction & Wellness Coaching',
      description: 'Certified yoga instructor offering private sessions and wellness coaching. Suitable for all levels and ages.',
      category: 'Health & Wellness',
      location: 'Austin, TX',
      skillsRequested: 'Nutrition advice, Meditation guidance',
      schedule: 'Mornings and evenings',
      additionalNotes: 'Virtual sessions available. First session free.',
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
    }
  ])

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts
    
    const query = searchQuery.toLowerCase()
    return posts.filter(post => 
      post.skills.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      post.skillsRequested.toLowerCase().includes(query)
    )
  }, [searchQuery, posts])

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, proof: file }))
    }
  }

  // Handle proof upload for reports
  const handleProofUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setReportData(prev => ({ ...prev, proofFile: file }))
    }
  }

  // Open report modal
  const openReportModal = (post) => {
    setCurrentReportPost(post)
    setReportUser(post.userName)
    setShowReportModal(true)
  }

  // Close report modal
  const closeReportModal = () => {
    setShowReportModal(false)
    setReportData({ reason: '', description: '', proofFile: null })
    setCurrentReportPost(null)
  }

  // Open profile modal
  const openProfileModal = (post) => {
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

  // Close profile modal
  const closeProfileModal = () => {
    setShowProfileModal(false)
    setCurrentProfile({})
  }

  // Open report modal from profile posts
  const openReportModalFromProfile = (post, userName) => {
    setCurrentReportPost(post)
    setReportUser(userName)
    setShowReportModal(true)
    setShowProfileModal(false)
  }

  // Submit report
  const submitReport = () => {
    console.log('Report submitted:', {
      post: currentReportPost,
      reason: reportData.reason,
      description: reportData.description,
      proof: reportData.proofFile
    })
    
    alert(`Report submitted for ${reportUser}. Thank you for helping keep our community safe.`)
    closeReportModal()
  }

  // Submit form
  const submitForm = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    
    // Create a URL for the uploaded file if it exists
    let proofUrl = null;
    if (formData.proof) {
      proofUrl = URL.createObjectURL(formData.proof);
    }
    
    // Add the new post to the posts array
    const newPost = {
      id: posts.length + 1,
      userName: 'Current User',
      userPicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: 'Just now',
      skills: formData.skills,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      skillsRequested: formData.skillsRequested,
      schedule: formData.schedule,
      additionalNotes: formData.additionalNotes,
      proof: proofUrl // Include the proof image
    }
    
    setPosts(prev => [newPost, ...prev])
    
    // Reset form and close modal
    resetForm()
    setShowForm(false)
    
    alert('Your skill offer has been posted successfully!')
  }

  // Cancel form
  const cancelForm = () => {
    resetForm()
    setShowForm(false)
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      skills: '',
      description: '',
      category: '',
      location: '',
      skillsRequested: '',
      schedule: '',
      additionalNotes: '',
      proof: null
    })
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  // Handle report data changes
  const handleReportChange = (e) => {
    const { value } = e.target
    setReportData(prev => ({ ...prev, reason: value }))
  }

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Handle contact
  const handleContact = (post) => {
    console.log('Contacting:', post.userName)
    // Implement contact logic here
  }

  // Handle image error
  const handleImageError = (event) => {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-5">
      {/* Search Bar */}
      <div className="mb-6 sm:mb-8">
        <SearchBar 
          placeholder="Search for skills, categories, or locations..."
          onSearch={handleSearch}
          className="w-full max-w-7xl mx-auto"
        />
      </div>

      {/* Header with Offer Skill Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-[#121731] text-xl sm:text-2xl font-semibold">Offers</h1>
        <Button 
          variant="primary"
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto justify-center"
        >
          <Icon name="add" className="mr-2" />
          Offer Skill
        </Button>
      </div>

      {/* Posts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              type="offer"
              onReport={() => openReportModal(post)}
              onContact={() => handleContact(post)}
              onViewProfile={() => openProfileModal(post)}
            />
          ))
        ) : (
          <div className="col-span-2">
            <EmptyState
              icon="search_off"
              title="No offers found"
              description="Try adjusting your search terms or create a new offer"
              actionText="Offer a Skill"
              onAction={() => setShowForm(true)}
            />
          </div>
        )}
      </div>

      {/* Offer Skill Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={cancelForm}
        title="Offer a Skill"
        size="large"
      >
        <form onSubmit={submitForm} className="space-y-4">
          <FormField
            label="Skills *"
            type="text"
            id="skills"
            value={formData.skills}
            onChange={handleInputChange}
            required
            placeholder="What skills are you offering?"
          />
          
          <FormField
            label="Description *"
            type="textarea"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Describe what you can offer in detail..."
            rows={3}
          />
          
          <FormField
            label="Category *"
            type="select"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a category</option>
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
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="Where can you provide this service?"
          />
          
          <FormField
            label="Skills Requested"
            type="text"
            id="skillsRequested"
            value={formData.skillsRequested}
            onChange={handleInputChange}
            placeholder="What skills are you looking for in return?"
          />
          
          <FormField
            label="Schedule *"
            type="text"
            id="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            required
            placeholder="When are you available?"
          />
          
          <FormField
            label="Additional Notes"
            type="textarea"
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            placeholder="Any other important information..."
            rows={2}
          />
          
          <div className="flex flex-col">
            <Label htmlFor="proof">Proof (Optional)</Label>
            <FileUpload
              id="proof"
              onChange={handleFileUpload}
              accept="image/*"
              className="mt-2"
            >
              {formData.proof ? formData.proof.name : 'Upload Image'}
            </FileUpload>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
            <Button 
              type="button" 
              variant="secondary"
              onClick={cancelForm}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
            >
              Submit Offer
            </Button>
          </div>
        </form>
      </Modal>

{/* Report Modal */}
<ReportModal
  isOpen={showReportModal}
  onClose={closeReportModal}
  reportedUserName={reportUser}
  onSubmit={(reportData) => {
    console.log('Report submitted:', {
      post: currentReportPost,
      ...reportData
    })
    alert(`Report submitted for ${reportUser}. Thank you for helping keep our community safe.`)
    closeReportModal()
  }}
/>

{/* Profile Modal */}
<ProfileModal
  isOpen={showProfileModal}
  onClose={closeProfileModal}
  profile={currentProfile}
  onReport={(post, userName) => {
    setReportUser(userName)
    setCurrentReportPost(post)
    setShowReportModal(true)
    setShowProfileModal(false)
  }}
  onContact={(post) => handleContact(post)}
/>
 
    </div>
  )
}