'use client'

import { useState, useMemo } from 'react'

export default function SkillRequestPlatform() {
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('')

  // Modal state
  const [showForm, setShowForm] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    request: '',
    description: '',
    category: '',
    location: '',
    skillsOffered: '',
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
    }
  }

  // Sample posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: 'Alex Johnson',
      userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '2 hours ago',
      request: 'Need help with website design',
      description: 'Looking for a designer to help create a modern, responsive website for my small business.',
      category: 'Design',
      location: 'Remote',
      skillsOffered: 'Social media marketing',
      schedule: 'Within 2 weeks',
      additionalNotes: 'Prefer someone with experience in e-commerce sites.'
    },
    {
      id: 2,
      userName: 'Maria Garcia',
      userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '5 hours ago',
      request: 'Looking for a Python tutor',
      description: 'Need help learning Python for data analysis. Beginner level.',
      category: 'Education',
      location: 'New York, NY',
      skillsOffered: 'Spanish tutoring',
      schedule: 'Weekends preferred',
      additionalNotes: 'Can meet at local libraries or cafes.'
    },
    {
      id: 3,
      userName: 'James Wilson',
      userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '1 day ago',
      request: 'Need content writer for blog',
      description: 'Looking for a writer to create engaging content for my tech blog.',
      category: 'Writing',
      location: 'Remote',
      skillsOffered: 'SEO optimization',
      schedule: '2-3 articles per week',
      additionalNotes: 'Tech background preferred but not required.'
    },
    {
      id: 4,
      userName: 'Sarah Chen',
      userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '2 days ago',
      request: 'Social media marketing help',
      description: 'Need assistance with creating and managing social media campaigns.',
      category: 'Marketing',
      location: 'Los Angeles, CA',
      skillsOffered: 'Graphic design',
      schedule: 'Flexible, ongoing',
      additionalNotes: 'Experience with Instagram and TikTok preferred.'
    }
  ])

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts
    
    const query = searchQuery.toLowerCase()
    return posts.filter(post => 
      post.request.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      post.skillsOffered.toLowerCase().includes(query)
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
    setReportData({
      reason: '',
      description: '',
      proofFile: null
    })
    setCurrentReportPost(null)
  }

  // Open profile modal
  const openProfileModal = (post) => {
    setCurrentProfile(userProfiles[post.userName] || {
      fullName: post.userName,
      email: 'Not provided',
      phone: 'Not provided',
      isVerified: false,
      userPicture: post.userPicture,
      linkedAccounts: [],
      skillOffers: [],
      skillRequests: []
    })
    setShowProfileModal(true)
  }

  // Close profile modal
  const closeProfileModal = () => {
    setShowProfileModal(false)
    setCurrentProfile({})
  }

  // Open report modal from profile posts - FIXED: Don't close profile modal
  const openReportModalFromProfile = (post, userName) => {
    setCurrentReportPost(post)
    setReportUser(userName)
    setShowReportModal(true)
    // Removed setShowProfileModal(false) to keep profile modal open
  }

  // Submit report
  const submitReport = () => {
    console.log('Report submitted:', {
      post: currentReportPost,
      reason: reportData.reason,
      description: reportData.description,
      proof: reportData.proofFile
    })
    
    // In a real app, you would send this data to a backend
    alert(`Report submitted for ${reportUser}. Thank you for helping keep our community safe.`)
    
    closeReportModal()
  }

  // Submit form
  const submitForm = () => {
    // In a real app, you would send this data to a backend
    console.log('Form submitted:', formData)
    
    // Add the new post to the posts array
    const newPost = {
      id: posts.length + 1,
      userName: 'Current User', // In a real app, this would come from user data
      userPicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: 'Just now',
      request: formData.request,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      skillsOffered: formData.skillsOffered,
      schedule: formData.schedule,
      additionalNotes: formData.additionalNotes
    }
    
    setPosts(prev => [newPost, ...prev])
    
    // Reset form and close modal
    resetForm()
    setShowForm(false)
  }

  // Cancel form
  const cancelForm = () => {
    resetForm()
    setShowForm(false)
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      request: '',
      description: '',
      category: '',
      location: '',
      skillsOffered: '',
      schedule: '',
      additionalNotes: '',
      proof: null
    })
  }

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle report data changes
  const handleReportChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="skill-request-platform max-w-1200 mx-auto p-5">
      {/* Search Bar */}
      <div className="search-container mb-8">
        <div className="search-bar flex items-center bg-white rounded-lg p-3 shadow-md">
          <span className="material-icons text-[#728a9c] mr-3">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for skills, categories, or locations..."
            className="flex-1 border-none outline-none text-base bg-transparent"
          />
        </div>
      </div>

      {/* Header with Request Skill Button */}
      <div className="header-container flex justify-between items-center mb-8">
        <h1 className="requests-header text-[#121731] text-2xl font-semibold">Requests</h1>
        <button 
  className="request-skill-btn flex items-center bg-[#121731] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#728a9c]"
  onClick={() => setShowForm(true)}
>
  <span className="material-icons mr-2">add</span>
  Request Skill
</button>
      </div>

      {/* Posts Container */}
      <div className="posts-container grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="post-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* User Info */}
            <div className="user-info flex items-center p-5 border-b border-gray-200">
              <img src={post.userPicture} alt={post.userName} className="user-picture w-12 h-12 rounded-full object-cover mr-4" />
              <div className="user-details flex-1">
                <h3 className="user-name text-[#121731] text-lg mb-1">{post.userName}</h3>
                <span className="post-time text-[#728a9c] text-sm">{post.timePosted}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="post-content p-5">
              <h2 className="request-title text-[#121731] text-xl mb-4">{post.request}</h2>
              <p className="description text-[#555] mb-5 leading-relaxed">{post.description}</p>
              
              <div className="details-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="detail-item flex flex-col">
                  <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
                  <span className="detail-value text-[#555]">{post.category}</span>
                </div>
                <div className="detail-item flex flex-col">
                  <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
                  <span className="detail-value text-[#555]">{post.location}</span>
                </div>
                <div className="detail-item flex flex-col">
                  <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Offered:</span>
                  <span className="detail-value text-[#555]">{post.skillsOffered}</span>
                </div>
                <div className="detail-item flex flex-col">
                  <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
                  <span className="detail-value text-[#555]">{post.schedule}</span>
                </div>
              </div>
              
              {post.additionalNotes && (
                <div className="additional-notes mt-4">
                  <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
                  <p className="detail-value text-[#555] mt-1">{post.additionalNotes}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons flex p-4 border-t border-gray-200 gap-3">
              <button 
                className="btn report-btn flex items-center p-2 rounded-lg font-medium transition-all duration-300 text-[#e74c3c] border border-[#e74c3c] hover:bg-[#e74c3c] hover:text-white"
                onClick={() => openReportModal(post)}
              >
                <span className="material-icons mr-1 text-lg">flag</span>
                Report
              </button>
              <button className="btn contact-btn flex items-center p-2 rounded-lg font-medium transition-all duration-300 text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white">
                <span className="material-icons mr-1 text-lg">message</span>
                Contact
              </button>
              <button 
                className="btn profile-btn flex items-center p-2 rounded-lg font-medium transition-all duration-300 text-[#728a9c] border border-[#728a9c] bg-white hover:bg-[#728a9c] hover:text-white"
                onClick={() => openProfileModal(post)}
              >
                <span className="material-icons mr-1 text-lg">account_circle</span>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Skill Form Modal */}
      {showForm && (
        <div
        className="modal-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1000] p-5"
        onClick={() => setShowForm(false)}
      >      
          <div className="modal-content bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[#121731] text-2xl text-center mb-6">Request a Skill</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="request-form flex flex-col gap-5">
              <div className="form-group flex flex-col">
                <label htmlFor="request" className="font-semibold text-[#121731] mb-2">Request *</label>
                <input 
                  type="text" 
                  id="request" 
                  value={formData.request}
                  onChange={(e) => handleInputChange('request', e.target.value)}
                  required 
                  placeholder="What skill are you looking for?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="description" className="font-semibold text-[#121731] mb-2">Description *</label>
                <textarea 
                  id="description" 
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required 
                  rows="3"
                  placeholder="Describe what you need in detail..."
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none resize-vertical"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="category" className="font-semibold text-[#121731] mb-2">Category *</label>
                <select 
                  id="category" 
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none"
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
                </select>
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="location" className="font-semibold text-[#121731] mb-2">Location *</label>
                <input 
                  type="text" 
                  id="location" 
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required 
                  placeholder="Where do you need this service?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="skills-offered" className="font-semibold text-[#121731] mb-2">Skills Offered</label>
                <input 
                  type="text" 
                  id="skills-offered" 
                  value={formData.skillsOffered}
                  onChange={(e) => handleInputChange('skillsOffered', e.target.value)}
                  placeholder="What skills can you offer in return?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="schedule" className="font-semibold text-[#121731] mb-2">Schedule *</label>
                <input 
                  type="text" 
                  id="schedule" 
                  value={formData.schedule}
                  onChange={(e) => handleInputChange('schedule', e.target.value)}
                  required 
                  placeholder="When do you need this done?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="additional-notes" className="font-semibold text-[#121731] mb-2">Additional Notes</label>
                <textarea 
                  id="additional-notes" 
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows="2"
                  placeholder="Any other important information..."
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none resize-vertical"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="proof" className="font-semibold text-[#121731] mb-2">Proof (Optional)</label>
                <div className="file-upload flex items-center gap-3">
                  <input 
                    type="file" 
                    id="proof" 
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="proof" className="file-upload-label flex items-center p-3 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200">
                    <span className="material-icons mr-2 text-[#728a9c]">cloud_upload</span>
                    Upload Image
                  </label>
                  {formData.proof && <span className="file-name text-[#728a9c] text-sm italic">{formData.proof.name}</span>}
                </div>
              </div>
              
              <div className="form-actions flex justify-end gap-4 mt-5">
              <button 
  type="button" 
  className="btn cancel-btn px-4 py-2 border border-[#728a9c] text-[#728a9c] rounded-lg hover:bg-[#b7c8d4] hover:text-white transition-colors"
  onClick={cancelForm}
>
  Cancel
</button>
<button 
  type="submit" 
  className="btn submit-btn px-4 py-2 bg-[#121731] text-white rounded-lg hover:bg-[#728a9c] transition-colors"
>
  Submit Request
</button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* Report Modal */}
            {showReportModal && (
        <div
          className="modal-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1001] p-5"
          onClick={closeReportModal}
        >      
          <div className="modal-content report-modal bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[#121731] text-2xl text-center mb-6">Reason for reporting {reportUser}</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); submitReport(); }} className="report-form flex flex-col gap-5">
              <div className="report-reasons flex flex-col gap-3">
                {reportReasons.map((reason) => (
                  <label 
                    key={reason.value} 
                    className="reason-option flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:border-[#121731] hover:bg-gray-50"
                  >
                    <input 
                      type="radio" 
                      value={reason.value} 
                      checked={reportData.reason === reason.value}
                      onChange={(e) => handleReportChange('reason', e.target.value)}
                      className="reason-radio mr-3"
                    />
                    <span className="reason-label font-medium text-[#121731]">{reason.label}</span>
                  </label>
                ))}
              </div>
              
              {reportData.reason === 'other' && (
                <div className="form-group flex flex-col">
                  <textarea 
                    id="other-description" 
                    value={reportData.description}
                    onChange={(e) => handleReportChange('description', e.target.value)}
                    rows="3"
                    placeholder="Please describe the reason for reporting..."
                    required
                    className="p-3 border border-gray-300 rounded-lg text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none resize-vertical"
                  />
                </div>
              )}
              
              {/* Proof Upload Section */}
              <div className="proof-upload-section mb-4">
                <label className="proof-label block font-semibold text-[#121731] mb-2">Proof (Optional)</label>
                <div className="file-upload flex items-center gap-3 mb-1">
                  <input 
                    type="file" 
                    id="proof-upload"
                    onChange={handleProofUpload}
                    accept="image/*,.pdf,.doc,.docx"
                    className="file-input hidden"
                  />
                  <label htmlFor="proof-upload" className="file-upload-label flex items-center p-3 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200">
                    <span className="material-icons mr-2 text-[#728a9c]">cloud_upload</span>
                    Upload Proof
                  </label>
                  {reportData.proofFile && <span className="file-name text-[#728a9c] text-sm italic">{reportData.proofFile.name}</span>}
                </div>
                <p className="proof-hint text-[#728a9c] text-xs">You can upload images, PDFs, or documents as evidence</p>
              </div>
              
              <div className="form-actions1 flex justify-between gap-4 w-full text-center">
              <button 
  type="button" 
  className="cancel-btn1 flex-1 flex justify-center items-center px-4 py-3 bg-white text-[#728a9c] border border-[#728a9c] rounded-lg transition-colors hover:bg-[#728a9c] hover:text-white text-sm"
  onClick={closeReportModal}
>
  Cancel
</button>
<button 
  type="submit" 
  className="submit-btn1 flex-1 flex justify-center items-center px-4 py-3 bg-[#dc3545] text-white border border-[#dc3545] rounded-lg transition-colors hover:bg-[#c82333] hover:border-[#c82333] disabled:opacity-60 disabled:cursor-not-allowed text-sm"
  disabled={!reportData.reason || (reportData.reason === 'other' && !reportData.description)}
>
  Confirm Report
</button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div
  className="modal-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1000] p-5"
  onClick={closeProfileModal}
>
          <div className="modal-content profile-modal bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="profile-header flex items-center mb-8 pb-5 border-b border-gray-200">
              <img src={currentProfile.userPicture} alt={currentProfile.fullName} className="profile-picture w-20 h-20 rounded-full object-cover mr-5" />
              <div className="profile-info">
                <div className="name-verified flex items-center gap-2 mb-2">
                  <h2 className="text-[#121731] text-xl font-semibold text-left">{currentProfile.fullName}</h2>
                  {currentProfile.isVerified && (
                    <span className="verified-badge flex items-center gap-1 bg-green-100 text-green-800 py-1 px-2 rounded-xl text-xs font-medium">
                      <span className="material-icons text-base">verified</span>
                      Verified
                    </span>
                  )}
                </div>
                <p className="profile-email text-[#728a9c] text-sm">{currentProfile.email}</p>
                <p className="profile-phone text-[#728a9c] text-sm">{currentProfile.phone}</p>
              </div>
            </div>

            <div className="profile-sections flex flex-col gap-6">
              {/* Linked Accounts Section */}
              <div className="profile-section">
                <h3 className="text-[#121731] text-lg mb-4">Linked Accounts</h3>
                <div className="linked-accounts flex flex-col gap-2">
                  {currentProfile.linkedAccounts?.map((account) => (
                    <a 
                      key={account.platform}
                      href={account.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="account-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-inherit transition-colors duration-300 hover:bg-gray-100 hover:no-underline hover:text-inherit"
                    >
                      <span className="account-icon material-icons text-[#121731]">{account.icon}</span>
                      <span className="account-platform flex-1 font-medium">{account.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

{/* Skill Offer Posts Section */}
<div className="profile-section">
  <h3 className="text-[#121731] text-lg mb-4">Skill Offer Posts</h3>
  <div className="posts-list flex flex-col gap-5">
    {currentProfile.skillOffers?.map((offer) => (
      <div key={offer.id} className="profile-post-card bg-gray-50 rounded-lg p-5 border border-gray-200">
        <div className="post-header flex justify-between items-start mb-3">
          <h4 className="text-[#121731] flex-1">{offer.skills}</h4>
          <span className="post-time text-[#728a9c] text-sm">{offer.timePosted}</span>
        </div>
        <p className="post-description text-[#555] mb-4 leading-relaxed">{offer.description}</p>
        <div className="post-details grid grid-cols-2 gap-4 mb-4">
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
            <span className="detail-value text-[#555] text-base">{offer.category}</span>
          </div>
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
            <span className="detail-value text-[#555] text-base">{offer.location}</span>
          </div>
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Requested:</span>
            <span className="detail-value text-[#555] text-base">{offer.skillsRequested}</span>
          </div>
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
            <span className="detail-value text-[#555] text-base">{offer.schedule}</span>
          </div>
        </div>
        {offer.additionalNotes && (
          <div className="additional-notes mb-4">
            <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
            <p className="detail-value text-[#555] text-base mt-1">{offer.additionalNotes}</p>
          </div>
        )}
        {offer.proof && (
          <div className="proof-image my-4">
            <img src={offer.proof} alt="Proof" className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300" />
          </div>
        )}
        <div className="post-actions flex gap-2 mt-4">
          <button 
            className="btn report-btn flex items-center py-1 px-4 rounded-lg font-medium transition-all duration-300 text-[#e74c3c] border border-[#e74c3c] hover:bg-[#e74c3c] hover:text-white"
            onClick={() => openReportModalFromProfile(offer, currentProfile.fullName)}
          >
            <span className="material-icons mr-1 text-lg">flag</span>
            Report
          </button>
          <button className="btn contact-btn flex items-center py-1 px-4 rounded-lg font-medium transition-all duration-300 text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white">
            <span className="material-icons mr-1 text-lg">message</span>
            Contact
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Skill Request Posts Section */}
<div className="profile-section">
  <h3 className="text-[#121731] text-lg mb-4">Skill Request Posts</h3>
  <div className="posts-list flex flex-col gap-5">
    {currentProfile.skillRequests?.map((request) => (
      <div key={request.id} className="profile-post-card bg-gray-50 rounded-lg p-5 border border-gray-200">
        <div className="post-header flex justify-between items-start mb-3">
          <h4 className="text-[#121731] flex-1">{request.request}</h4>
          <span className="post-time text-[#728a9c] text-sm">{request.timePosted}</span>
        </div>
        <p className="post-description text-[#555] mb-4 leading-relaxed">{request.description}</p>
        <div className="post-details grid grid-cols-2 gap-4 mb-4">
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
            <span className="detail-value text-[#555] text-base">{request.category}</span>
          </div>
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
            <span className="detail-value text-[#555] text-base">{request.location}</span>
          </div>
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Offered:</span>
            <span className="detail-value text-[#555] text-base">{request.skillsOffered}</span>
          </div>
          <div className="detail-item flex flex-col">
            <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
            <span className="detail-value text-[#555] text-base">{request.schedule}</span>
          </div>
        </div>
        {request.additionalNotes && (
          <div className="additional-notes mb-4">
            <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
            <p className="detail-value text-[#555] text-base mt-1">{request.additionalNotes}</p>
          </div>
        )}
        {request.proof && (
          <div className="proof-image my-4">
            <img src={request.proof} alt="Proof" className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300" />
          </div>
        )}
        <div className="post-actions flex gap-2 mt-4">
          <button 
            className="btn report-btn flex items-center py-1 px-4 rounded-lg font-medium transition-all duration-300 text-[#e74c3c] border border-[#e74c3c] hover:bg-[#e74c3c] hover:text-white"
            onClick={() => openReportModalFromProfile(request, currentProfile.fullName)}
          >
            <span className="material-icons mr-1 text-lg">flag</span>
            Report
          </button>
          <button className="btn contact-btn flex items-center py-1 px-4 rounded-lg font-medium transition-all duration-300 text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white">
            <span className="material-icons mr-1 text-lg">message</span>
            Contact
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
            </div>

            <div className="profile-actions flex justify-end mt-8 pt-5 border-t border-gray-200">
<button 
  className="btn close-btn px-5 py-2 bg-[#121731] text-white rounded-lg transition-colors hover:bg-[#728a9c]"
  onClick={closeProfileModal}
>
  Close
</button>

            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .skill-request-platform {
          max-width: 1200px;
        }
        
        @media (max-width: 768px) {
          .posts-container {
            grid-template-columns: 1fr;
          }
          
          .header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .modal-content {
            padding: 20px;
          }
          
          .form-actions {
            flex-direction: column;
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .profile-picture {
            margin-right: 0;
            margin-bottom: 15px;
          }

          .post-details {
            grid-template-columns: 1fr;
          }

          .post-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}