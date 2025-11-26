'use client'

import { useState, useMemo } from 'react'

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
      additionalNotes: 'Portfolio available upon request. Can work with tight deadlines.'
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
      additionalNotes: 'Experience teaching both children and adults. Materials provided.'
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
      additionalNotes: 'Fast turnaround time. Samples available.'
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
      additionalNotes: 'Can work within brand guidelines. Multiple revisions included.'
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
      additionalNotes: 'Licensed and insured. Free estimates.'
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
      additionalNotes: 'Virtual sessions available. First session free.'
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
    
    // In a real app, you would send this data to a backend
    alert(`Report submitted for ${reportUser}. Thank you for helping keep our community safe.`)
    
    closeReportModal()
  }

  // Submit form
  const submitForm = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to a backend
    console.log('Form submitted:', formData)
    
    // Add the new post to the posts array
    const newPost = {
      id: posts.length + 1,
      userName: 'Current User', // In a real app, this would come from user data
      userPicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: 'Just now',
      skills: formData.skills,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      skillsRequested: formData.skillsRequested,
      schedule: formData.schedule,
      additionalNotes: formData.additionalNotes
    }
    
    setPosts(prev => [newPost, ...prev])
    
    // Reset form and close modal
    resetForm()
    setShowForm(false)
    
    // Show success message (in a real app)
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

  return (
    <div className="max-w-[1200px] mx-auto p-5">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex items-center bg-white rounded-lg p-3 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
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

      {/* Header with Offer Skill Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#121731] text-2xl font-semibold">Offers</h1>
        <button 
  className="flex items-center bg-[#121731] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#728a9c]"
  onClick={() => setShowForm(true)}
>
  <span className="material-icons mr-2">add</span>
  Offer Skill
</button>
      </div>

      {/* Posts Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] overflow-hidden transition-all hover:translate-y-[-5px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
            {/* User Info */}
            <div className="flex items-center p-5 border-b border-gray-200">
              <img src={post.userPicture} alt={post.userName} className="w-12 h-12 rounded-full object-cover mr-4" />
              <div className="flex-1">
                <h3 className="text-[#121731] text-lg mb-1">{post.userName}</h3>
                <span className="text-[#728a9c] text-sm">{post.timePosted}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-5">
              <h2 className="text-[#121731] text-xl mb-3">{post.skills}</h2>
              <p className="text-gray-600 mb-5 leading-relaxed">{post.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="flex flex-col">
                  <span className="text-[#121731] font-semibold text-sm mb-1">Category:</span>
                  <span className="text-gray-600">{post.category}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#121731] font-semibold text-sm mb-1">Location:</span>
                  <span className="text-gray-600">{post.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#121731] font-semibold text-sm mb-1">Skills Requested:</span>
                  <span className="text-gray-600">{post.skillsRequested}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#121731] font-semibold text-sm mb-1">Schedule:</span>
                  <span className="text-gray-600">{post.schedule}</span>
                </div>
              </div>
              
              {post.additionalNotes && (
                <div className="mt-4">
                  <span className="text-[#121731] font-semibold text-sm">Additional Notes:</span>
                  <p className="text-gray-600 mt-1">{post.additionalNotes}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 p-5 border-t border-gray-200">
              <button 
                className="flex items-center px-4 py-2 rounded-lg font-medium border border-[#e74c3c] text-[#e74c3c] transition-all hover:bg-[#e74c3c] hover:text-white"
                onClick={() => openReportModal(post)}
              >
                <span className="material-icons mr-1 text-lg">flag</span>
                Report
              </button>
              <button className="flex items-center px-4 py-2 rounded-lg font-medium border border-[#121731] text-[#121731] transition-all hover:bg-[#121731] hover:text-white">
                <span className="material-icons mr-1 text-lg">message</span>
                Contact
              </button>
              <button 
                className="flex items-center px-4 py-2 rounded-lg font-medium border border-[#728a9c] text-[#728a9c] bg-white transition-all hover:bg-[#728a9c] hover:text-white"
                onClick={() => openProfileModal(post)}
              >
                <span className="material-icons mr-1 text-lg">account_circle</span>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Skill Form Modal */}
      {showForm && (
       <div
       className="modal-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1000] p-5"
       onClick={() => setShowForm(false)}
     >     
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]" onClick={e => e.stopPropagation()}>
            <h2 className="text-[#121731] text-2xl text-center mb-6">Offer a Skill</h2>
            
            <form onSubmit={submitForm} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="skills" className="text-[#121731] font-semibold mb-2">Skills *</label>
                <input 
                  type="text" 
                  id="skills" 
                  value={formData.skills}
                  onChange={handleInputChange}
                  required 
                  placeholder="What skills are you offering?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="description" className="text-[#121731] font-semibold mb-2">Description *</label>
                <textarea 
                  id="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  required 
                  rows={3}
                  placeholder="Describe what you can offer in detail..."
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none resize-vertical"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="category" className="text-[#121731] font-semibold mb-2">Category *</label>
                <select 
                  id="category" 
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none"
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
              
              <div className="flex flex-col">
                <label htmlFor="location" className="text-[#121731] font-semibold mb-2">Location *</label>
                <input 
                  type="text" 
                  id="location" 
                  value={formData.location}
                  onChange={handleInputChange}
                  required 
                  placeholder="Where can you provide this service?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="skills-requested" className="text-[#121731] font-semibold mb-2">Skills Requested</label>
                <input 
                  type="text" 
                  id="skills-requested" 
                  value={formData.skillsRequested}
                  onChange={handleInputChange}
                  placeholder="What skills are you looking for in return?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="schedule" className="text-[#121731] font-semibold mb-2">Schedule *</label>
                <input 
                  type="text" 
                  id="schedule" 
                  value={formData.schedule}
                  onChange={handleInputChange}
                  required 
                  placeholder="When are you available?"
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="additional-notes" className="text-[#121731] font-semibold mb-2">Additional Notes</label>
                <textarea 
                  id="additional-notes" 
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Any other important information..."
                  className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none resize-vertical"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="proof" className="text-[#121731] font-semibold mb-2">Proof (Optional)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="file" 
                    id="proof" 
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="proof" className="flex items-center px-4 py-2 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition-colors hover:bg-gray-200">
                    <span className="material-icons mr-2 text-[#728a9c]">cloud_upload</span>
                    Upload Image
                  </label>
                  {formData.proof && <span className="text-[#728a9c] text-sm">{formData.proof.name}</span>}
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-5">
              <button 
  type="button" 
  className="px-4 py-2 border border-[#728a9c] text-[#728a9c] rounded-lg hover:bg-[#b7c8d4] hover:text-white transition-colors"
  onClick={cancelForm}
>
  Cancel
</button>
<button 
  type="submit" 
  className="px-4 py-2 bg-[#121731] text-white rounded-lg hover:bg-[#728a9c] transition-colors"
>
  Submit Offer
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
       <div
         className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
         onClick={(e) => e.stopPropagation()}
       >     
            <h2 className="text-[#121731] text-2xl text-center mb-6">Reason for reporting {reportUser}</h2>
            
            <form onSubmit={submitReport} className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                {reportReasons.map(reason => (
                  <label key={reason.value} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all hover:border-[#121731] hover:bg-gray-50">
                    <input 
                      type="radio" 
                      value={reason.value} 
                      checked={reportData.reason === reason.value}
                      onChange={handleReportChange}
                      className="mr-3"
                    />
                    <span className="text-[#121731] font-medium">{reason.label}</span>
                  </label>
                ))}
              </div>
              
              {reportData.reason === 'other' && (
                <div className="flex flex-col">
                  <textarea 
                    id="other-description" 
                    value={reportData.description}
                    onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    placeholder="Please provide details about your report..."
                    required
                    className="p-3 border border-gray-300 rounded-lg text-base transition-colors focus:border-[#121731] outline-none resize-vertical"
                  />
                </div>
              )}
              
              {/* Proof Upload Section */}
              <div className="mb-4">
                <label className="text-[#121731] font-semibold text-sm block mb-2">Proof (Optional)</label>
                <div className="flex items-center gap-3 mb-2">
                  <input 
                    type="file" 
                    id="proof-upload"
                    onChange={handleProofUpload}
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <label htmlFor="proof-upload" className="flex items-center px-4 py-2 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition-colors hover:bg-gray-200 text-sm">
                    <span className="material-icons mr-2 text-[#728a9c] text-base">cloud_upload</span>
                    Upload Proof
                  </label>
                  {reportData.proofFile && <span className="text-[#728a9c] text-sm italic">{reportData.proofFile.name}</span>}
                </div>
                <p className="text-[#728a9c] text-xs">You can upload images, PDFs, or documents as evidence</p>
              </div>
              
              <div className="flex justify-between gap-4 w-full text-center">
                <button 
                  type="button" 
                  className="flex-1 flex justify-center items-center px-4 py-3 bg-white text-[#728a9c] border border-[#728a9c] rounded-lg transition-colors hover:bg-[#728a9c] hover:text-white text-sm"
                  onClick={closeReportModal}
                >
                  Cancel
                </button>
                <button 
  type="submit" 
  className="flex-1 flex justify-center items-center px-4 py-3 bg-[#dc3545] text-white border border-[#dc3545] rounded-lg transition-colors hover:bg-[#c82333] hover:border-[#c82333] disabled:opacity-60 disabled:cursor-not-allowed text-sm"
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
       <div
         className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
         onClick={(e) => e.stopPropagation()}
       >
         <div className="flex items-center mb-8 pb-5 border-b border-gray-200">
     
              <img src={currentProfile.userPicture} alt={currentProfile.fullName} className="w-20 h-20 rounded-full object-cover mr-5" />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-[#121731] text-xl font-semibold">{currentProfile.fullName}</h2>
                  {currentProfile.isVerified && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <span className="material-icons text-base">verified</span>
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-[#728a9c] mb-1">{currentProfile.email}</p>
                <p className="text-[#728a9c]">{currentProfile.phone}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Linked Accounts Section */}
              <div>
                <h3 className="text-[#121731] text-lg mb-4">Linked Accounts</h3>
                <div className="flex flex-col gap-3">
                  {currentProfile.linkedAccounts?.map((account, index) => (
                    <a 
                      key={index}
                      href={account.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-current transition-colors hover:bg-gray-200"
                    >
                      <span className="material-icons text-[#121731]">{account.icon}</span>
                      <span className="flex-1 font-medium">{account.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Skill Offer Posts Section */}
              <div>
                <h3 className="text-[#121731] text-lg mb-4">Skill Offer Posts</h3>
                <div className="flex flex-col gap-5">
                  {currentProfile.skillOffers?.map(offer => (
                    <div key={offer.id} className="bg-gray-50 rounded-lg p-5 border border-gray-300">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-[#121731] flex-1">{offer.skills}</h4>
                        <span className="text-[#728a9c] text-sm">{offer.timePosted}</span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{offer.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Category:</span>
                          <span className="text-gray-600">{offer.category}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Location:</span>
                          <span className="text-gray-600">{offer.location}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Skills Requested:</span>
                          <span className="text-gray-600">{offer.skillsRequested}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Schedule:</span>
                          <span className="text-gray-600">{offer.schedule}</span>
                        </div>
                      </div>
                      {offer.additionalNotes && (
                        <div className="mb-4">
                          <span className="text-[#121731] font-semibold text-sm">Additional Notes:</span>
                          <p className="text-gray-600 mt-1">{offer.additionalNotes}</p>
                        </div>
                      )}
                      {offer.proof && (
                        <div className="my-4">
                          <img src={offer.proof} alt="Proof" className="w-full max-w-[200px] rounded-lg border border-gray-300" />
                        </div>
                      )}
                      <div className="flex gap-3 mt-4">
                        <button 
                          className="flex items-center px-3 py-1.5 rounded-lg font-medium border border-[#e74c3c] text-[#e74c3c] transition-all hover:bg-[#e74c3c] hover:text-white text-sm"
                          onClick={() => openReportModalFromProfile(offer, currentProfile.fullName)}
                        >
                          <span className="material-icons mr-1 text-base">flag</span>
                          Report
                        </button>
                        <button className="flex items-center px-3 py-1.5 rounded-lg font-medium border border-[#121731] text-[#121731] transition-all hover:bg-[#121731] hover:text-white text-sm">
                          <span className="material-icons mr-1 text-base">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Request Posts Section */}
              <div>
                <h3 className="text-[#121731] text-lg mb-4">Skill Request Posts</h3>
                <div className="flex flex-col gap-5">
                  {currentProfile.skillRequests?.map(request => (
                    <div key={request.id} className="bg-gray-50 rounded-lg p-5 border border-gray-300">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-[#121731] flex-1">{request.request}</h4>
                        <span className="text-[#728a9c] text-sm">{request.timePosted}</span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{request.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Category:</span>
                          <span className="text-gray-600">{request.category}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Location:</span>
                          <span className="text-gray-600">{request.location}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Skills Offered:</span>
                          <span className="text-gray-600">{request.skillsOffered}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#121731] font-semibold text-sm mb-1">Schedule:</span>
                          <span className="text-gray-600">{request.schedule}</span>
                        </div>
                      </div>
                      {request.additionalNotes && (
                        <div className="mb-4">
                          <span className="text-[#121731] font-semibold text-sm">Additional Notes:</span>
                          <p className="text-gray-600 mt-1">{request.additionalNotes}</p>
                        </div>
                      )}
                      {request.proof && (
                        <div className="my-4">
                          <img src={request.proof} alt="Proof" className="w-full max-w-[200px] rounded-lg border border-gray-300" />
                        </div>
                      )}
                      <div className="flex gap-3 mt-4">
                        <button 
                          className="flex items-center px-3 py-1.5 rounded-lg font-medium border border-[#e74c3c] text-[#e74c3c] transition-all hover:bg-[#e74c3c] hover:text-white text-sm"
                          onClick={() => openReportModalFromProfile(request, currentProfile.fullName)}
                        >
                          <span className="material-icons mr-1 text-base">flag</span>
                          Report
                        </button>
                        <button className="flex items-center px-3 py-1.5 rounded-lg font-medium border border-[#121731] text-[#121731] transition-all hover:bg-[#121731] hover:text-white text-sm">
                          <span className="material-icons mr-1 text-base">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-5 border-t border-gray-200">
              <button className="px-8 py-3 bg-[#121731] text-white rounded-lg transition-colors hover:bg-[#555555]" onClick={closeProfileModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}