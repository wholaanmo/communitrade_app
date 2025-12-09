'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'

import { useRouter } from "next/navigation";

// Import atomic design components
import SearchBar from '@/components/molecules/SearchBar'
import PostCard from '@/components/molecules/PostCard'
import Icon from '@/components/atoms/Icon'
import ReportModal from '@/components/molecules/ReportModal'
import ProfileModal from '@/components/molecules/ProfileModal'

// Custom button components for dashboard
const DashboardActionButton = ({ type = 'report', onClick, children, className = '' }) => {
  const iconMap = {
    report: 'flag',
    contact: 'message',
    profile: 'account_circle'
  }

  const baseClasses = 'flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none rounded-lg font-medium py-1.5 px-4 flex-1 min-w-[110px]'

  const variants = {
    report: 'text-red-600 border border-red-600 hover:bg-red-600 hover:text-white',
    contact: 'text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white',
    profile: 'text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white'
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${variants[type]} ${className}`}
      onClick={onClick}
    >
      <Icon name={iconMap[type]} className="text-lg mr-2" />
      {children}
    </button>
  )
}

const SeeAllButton = ({ href, children = 'See All', className = '' }) => {
  return (
    <Link 
      href={href} 
      className={`flex items-center text-[#121731] font-semibold text-base transition-colors duration-300 hover:text-[#728a9c] py-2 px-4 rounded-lg hover:bg-gray-50 no-underline hover:no-underline ${className}`}
    >
      {children}
      <Icon name="chevron_right" className="text-lg ml-1" />
    </Link>
  )
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  // Report modal state
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportedUserName, setReportedUserName] = useState('')
  const [currentReportPost, setCurrentReportPost] = useState(null)
  const [selectedReason, setSelectedReason] = useState('')
  const [otherDescription, setOtherDescription] = useState('')
  const [proofFile, setProofFile] = useState(null)

  // Profile modal state
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [currentProfile, setCurrentProfile] = useState({})

  const reportReasons = [
    { value: 'fraud', label: 'Fraud/Dishonesty' },
    { value: 'harassment', label: 'Harassment/Abuse' },
    { value: 'safety', label: 'Safety Concerns' },
    { value: 'spam', label: 'Spam/Misuse' },
    { value: 'other', label: 'Other' }
  ]

  // Report modal methods
  const openReportModal = (userName) => {
    setReportedUserName(userName)
    setSelectedReason('')
    setOtherDescription('')
    setProofFile(null)
    setShowReportModal(true)
  }

  const closeReportModal = () => {
    setShowReportModal(false)
    setReportedUserName('')
    setSelectedReason('')
    setOtherDescription('')
    setProofFile(null)
  }

  const handleProofUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setProofFile(file)
    }
  }

  const submitReport = () => {
    if (!selectedReason || (selectedReason === 'other' && !otherDescription.trim())) {
      return
    }
    
    const reportData = {
      userName: reportedUserName,
      reason: selectedReason,
      description: selectedReason === 'other' ? otherDescription : reportReasons.find(r => r.value === selectedReason)?.label,
      proof: proofFile
    }
    
    console.log('Submitting report:', reportData)
    alert(`Report submitted for ${reportedUserName}`)
    closeReportModal()
  }

  // Profile modal methods
  const openProfileModal = (post) => {
    setCurrentProfile({
      fullName: post.userName,
      email: `${post.userName.toLowerCase().replace(' ', '')}@example.com`,
      phone: '+1 (555) 123-4567',
      isVerified: true,
      userPicture: post.userPicture,
      linkedAccounts: [
        { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/' + post.userName.replace(' ', '') },
        { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/' + post.userName.replace(' ', '') },
        { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/' + post.userName.replace(' ', '') }
      ],
      skillOffers: post.skills ? [{
        id: post.id,
        skills: Array.isArray(post.skills) ? post.skills.join(', ') : post.skills,
        description: post.description,
        category: post.category,
        location: post.location,
        skillsRequested: Array.isArray(post.skillsRequested) ? post.skillsRequested.join(', ') : post.skillsRequested,
        schedule: post.schedule,
        additionalNotes: post.additionalNotes,
        timePosted: post.timePosted,
        proof: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
      }] : [],
      skillRequests: post.request ? [{
        id: post.id,
        request: post.request,
        description: post.description,
        category: post.category,
        location: post.location,
        skillsOffered: Array.isArray(post.skillsOffered) ? post.skillsOffered.join(', ') : post.skillsOffered,
        schedule: post.schedule,
        additionalNotes: post.additionalNotes,
        timePosted: post.timePosted,
        proof: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
      }] : []
    })
    setShowProfileModal(true)
  }

  const closeProfileModal = () => {
    setShowProfileModal(false)
    setCurrentProfile({})
  }

  // Sample data for requests
  const [requests] = useState([
    {
      id: 1,
      userName: 'Alex Johnson',
      userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      timePosted: '2 hours ago',
      request: 'Web Development Help',
      description: 'Need help building a responsive website for my small business. Looking for someone with experience in modern web technologies.',
      category: 'Technology',
      location: 'New York, NY',
      skillsOffered: ['Graphic Design', 'Content Writing', 'Social Media Management'],
      schedule: 'Weekends preferred, 10am-4pm',
      additionalNotes: 'Must have experience with Vue.js and responsive design principles. Long-term collaboration possible.'
    },
    {
      id: 2,
      userName: 'Sarah Smith',
      userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      timePosted: '5 hours ago',
      request: 'Gardening Assistance',
      description: 'Help with backyard garden maintenance and planting seasonal flowers and vegetables.',
      category: 'Home & Garden',
      location: 'Los Angeles, CA',
      skillsOffered: ['Cooking', 'Pet Sitting', 'House Cleaning'],
      schedule: 'Flexible, 2-3 times per week',
      additionalNotes: 'Organic gardening experience preferred. Tools and materials will be provided.'
    },
    {
      id: 3,
      userName: 'Michael Brown',
      userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      timePosted: '1 day ago',
      request: 'Math Tutoring',
      description: 'Looking for a tutor to help with high school calculus and algebra concepts.',
      category: 'Education',
      location: 'Chicago, IL',
      skillsOffered: ['Spanish Tutoring', 'Music Lessons', 'Essay Editing'],
      schedule: 'Weekday evenings after 5pm',
      additionalNotes: 'Patient and experienced tutors preferred. Online sessions acceptable.'
    }
  ])

  // Sample data for offers
  const [offers] = useState([
    {
      id: 1,
      userName: 'Mike Johnson',
      userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      timePosted: '1 hour ago',
      skills: ['Web Development', 'Vue.js', 'JavaScript', 'CSS', 'API Integration'],
      description: 'Experienced web developer offering help with Vue.js projects. I can assist with component development, state management, and deployment.',
      category: 'Technology',
      location: 'Chicago, IL',
      skillsRequested: ['UI/UX Design', 'Project Management', 'Backend Development'],
      schedule: 'Evenings and weekends, flexible hours',
      additionalNotes: '5+ years of experience. Portfolio available upon request.'
    },
    {
      id: 2,
      userName: 'Emma Wilson',
      userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      timePosted: '3 hours ago',
      skills: ['Gardening', 'Landscaping', 'Plant Care', 'Organic Farming', 'Irrigation Systems'],
      description: 'Professional gardener offering landscaping services and plant care advice for residential properties.',
      category: 'Home & Garden',
      location: 'Miami, FL',
      skillsRequested: ['General Labor', 'Photography', 'Marketing'],
      schedule: 'Weekdays only, 9am-5pm',
      additionalNotes: 'Specialized in tropical plants and sustainable gardening practices.'
    },
    {
      id: 3,
      userName: 'David Chen',
      userPicture: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      timePosted: '6 hours ago',
      skills: ['Math Tutoring', 'Test Preparation', 'Online Teaching', 'Curriculum Development'],
      description: 'Certified math teacher offering tutoring services for middle school and high school students.',
      category: 'Education',
      location: 'Boston, MA',
      skillsRequested: ['English Tutoring', 'Computer Skills', 'Study Techniques'],
      schedule: 'Afternoons and weekends',
      additionalNotes: 'Patient and experienced with students of all learning styles. Remote sessions available.'
    }
  ])

  // Computed properties for filtered data
  const filteredRequests = useMemo(() => {
    if (!searchQuery) return requests
    const query = searchQuery.toLowerCase()
    return requests.filter(request => 
      request.request.toLowerCase().includes(query) ||
      request.description.toLowerCase().includes(query) ||
      request.category.toLowerCase().includes(query) ||
      request.location.toLowerCase().includes(query) ||
      request.skillsOffered.some(skill => skill.toLowerCase().includes(query))
    )
  }, [searchQuery, requests])

  const filteredOffers = useMemo(() => {
    if (!searchQuery) return offers
    const query = searchQuery.toLowerCase()
    return offers.filter(offer => 
      offer.skills.some(skill => skill.toLowerCase().includes(query)) ||
      offer.description.toLowerCase().includes(query) ||
      offer.category.toLowerCase().includes(query) ||
      offer.location.toLowerCase().includes(query) ||
      offer.skillsRequested.some(skill => skill.toLowerCase().includes(query))
    )
  }, [searchQuery, offers])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleContact = (post) => {
    console.log('Contacting:', post.userName)
    // Implement contact logic here
  }

  const handleViewProfile = (post) => {
    openProfileModal(post)
  }

  // Handle broken image links
  const handleImageError = (event) => {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
  }

  return (
    <div className="dashboard p-8 max-w-7xl mx-auto ml-8 mr-0">
      {/* Welcome Section with User Info */}
      {session && (
        <div className="welcome-section mb-8 p-6 bg-gradient-to-r from-[#121731] to-[#728a9c] rounded-lg text-white">
          <div className="flex items-center space-x-4">
            {session.user?.image && (
              <img 
                src={session.user.image} 
                alt={session.user?.name || 'User'} 
                className="w-16 h-16 rounded-full border-2 border-white"
                onError={handleImageError}
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {session.user?.name || 'User'}!</h1>
              <p className="text-blue-100">{session.user?.email}</p>
              <p className="text-sm text-blue-200 mt-1">
                Ready to explore skills and opportunities in your community?
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar 
          placeholder="Search for skills, categories, or locations..."
          onSearch={handleSearch}
          className="w-full max-w-7xl mx-auto"
        />
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={closeReportModal}
        reportedUserName={reportedUserName}
        onSubmit={(reportData) => {
          console.log('Report submitted:', reportData)
          alert(`Report submitted for ${reportedUserName}`)
          closeReportModal()
        }}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        profile={currentProfile}
        onReport={(post, userName) => {
          setReportedUserName(userName)
          setCurrentReportPost(post)
          setShowReportModal(true)
          setShowProfileModal(false)
        }}
        onContact={(post) => handleContact(post)}
      />

      {/* Requests Section */}
      <section className="requests-section mb-12">
        <div className="section-header flex justify-between items-center mb-8">
          <h2 className="text-[#121731] text-xl font-semibold">Recent Requests</h2>
          <SeeAllButton href="/user/request" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.slice(0, 3).map((request) => (
            <PostCard
              key={request.id}
              post={request}
              type="request"
              onReport={() => openReportModal(request.userName)}
              onContact={() => handleContact(request)}
              onViewProfile={() => handleViewProfile(request)}
            />
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section">
        <div className="section-header flex justify-between items-center mb-8">
          <h2 className="text-[#121731] text-xl font-semibold">Recent Offers</h2>
          <SeeAllButton href="/user/offer" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.slice(0, 3).map((offer) => (
            <PostCard
              key={offer.id}
              post={offer}
              type="offer"
              onReport={() => openReportModal(offer.userName)}
              onContact={() => handleContact(offer)}
              onViewProfile={() => handleViewProfile(offer)}
            />
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes popupFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 1200px) {
          .dashboard {
            margin-left: 1rem;
            margin-right: 1rem;
          }
        }

        @media (max-width: 1024px) {
          .dashboard {
            margin-left: 1.5rem;
            margin-right: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 1rem;
            margin-left: 1rem;
            margin-right: 1rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .welcome-section .flex {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .dashboard {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}