'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// Import atomic design components
import SearchBar from '@/components/molecules/SearchBar'
import PostCard from '@/components/molecules/PostCard'
import Modal from '@/components/molecules/Modal'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import TextArea from '@/components/atoms/TextArea'
import Label from '@/components/atoms/Label'
import FileUpload from '@/components/atoms/FileUpload'
import Icon from '@/components/atoms/Icon'
import SmallText from '@/components/atoms/SmallText'
import Avatar from '@/components/atoms/Avatar'

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
  const [searchQuery, setSearchQuery] = useState('')

  // Report modal state
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportedUserName, setReportedUserName] = useState('')
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
      {/* Search Bar */}
      <div className="mb-8">
      <SearchBar 
  placeholder="Search for skills, categories, or locations..."
  onSearch={handleSearch}
  className="w-full max-w-7xl mx-auto"
/>
      </div>

      {/* Report Modal */}
      <Modal
  isOpen={showReportModal}
  onClose={closeReportModal}
  size="custom"
  className="fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1001] p-4"
>
  <div
    className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
    onClick={(e) => e.stopPropagation()}
  >
    <h2 className="text-[#121731] text-xl sm:text-2xl text-center mb-6">
      Reason for reporting {reportedUserName}
    </h2>

    <div className="flex flex-col gap-4 sm:gap-5">
      
      {/* Reasons List */}
      <div className="flex flex-col gap-3">
        {reportReasons.map((reason) => (
          <ReportReasonItem
            key={reason.value}
            reason={reason}
            selected={selectedReason === reason.value}
            onSelect={(value) => setSelectedReason(value)}
          />
        ))}
      </div>

      {/* Other Description */}
      {selectedReason === 'other' && (
        <div className="flex flex-col">
          <Label htmlFor="report-description">Description</Label>
          <TextArea
            id="report-description"
            value={otherDescription}
            onChange={(e) => setOtherDescription(e.target.value)}
            placeholder="Please describe the reason for reporting..."
            rows={4}
            required
            className="resize-vertical"
          />
        </div>
      )}

      {/* Proof Upload */}
      <div className="mb-4">
        <Label className="text-xs sm:text-sm block mb-2">
          Proof (Optional)
        </Label>

        <FileUpload
          id="proof-upload"
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleProofUpload}
          className="flex items-center gap-3 mb-2"
        >
          {proofFile ? proofFile.name : 'Upload Proof'}
        </FileUpload>

        <p className="text-[#728a9c] text-xs">
          You can upload images, PDFs, or documents as evidence
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 w-full text-center">
        <Button
          variant="secondary"
          className="flex-1 bg-white text-[#728a9c] border border-[#728a9c] hover:bg-[#728a9c] hover:text-white"
          onClick={closeReportModal}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          className="flex-1"
          disabled={!selectedReason || (selectedReason === 'other' && !otherDescription)}
          onClick={submitReport}
        >
          Confirm Report
        </Button>
      </div>

    </div>
  </div>
</Modal>

      {/* Profile Modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        title="User Profile"
        size="xlarge"
      >
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="profile-header flex items-center gap-4 pb-4 border-b border-gray-200">
            <Avatar 
              src={currentProfile.userPicture} 
              alt={currentProfile.fullName}
              size="large"
              onError={handleImageError}
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[#121731] text-xl font-semibold">{currentProfile.fullName}</h3>
                {currentProfile.isVerified && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Icon name="verified" size="sm" />
                    Verified
                  </span>
                )}
              </div>
              <SmallText className="block mb-1">{currentProfile.email}</SmallText>
              <SmallText>{currentProfile.phone}</SmallText>
            </div>
          </div>

          {/* Linked Accounts */}
          <div>
            <h4 className="text-[#121731] font-semibold mb-3">Linked Accounts</h4>
            <div className="space-y-2">
              {currentProfile.linkedAccounts?.map((account, index) => (
                <a
                  key={index}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-current transition-colors hover:bg-gray-200"
                >
                  <Icon name={account.icon} />
                  <span className="font-medium">{account.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Skill Offers */}
          {currentProfile.skillOffers && currentProfile.skillOffers.length > 0 && (
            <div>
              <h4 className="text-[#121731] font-semibold mb-3">Skill Offers</h4>
              <div className="space-y-4">
                {currentProfile.skillOffers.map(offer => (
                  <Card key={offer.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h5 className="text-[#121731] font-semibold">{offer.skills}</h5>
                        <SmallText>{offer.timePosted}</SmallText>
                      </div>
                      <p className="text-gray-600">{offer.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <SmallText weight="semibold">Category:</SmallText>
                          <SmallText>{offer.category}</SmallText>
                        </div>
                        <div>
                          <SmallText weight="semibold">Location:</SmallText>
                          <SmallText>{offer.location}</SmallText>
                        </div>
                        <div>
                          <SmallText weight="semibold">Skills Requested:</SmallText>
                          <SmallText>{offer.skillsRequested}</SmallText>
                        </div>
                        <div>
                          <SmallText weight="semibold">Schedule:</SmallText>
                          <SmallText>{offer.schedule}</SmallText>
                        </div>
                      </div>
                      {offer.additionalNotes && (
                        <div>
                          <SmallText weight="semibold">Additional Notes:</SmallText>
                          <SmallText>{offer.additionalNotes}</SmallText>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <DashboardActionButton 
                          type="report" 
                          onClick={() => openReportModal(currentProfile.fullName)}
                        >
                          Report
                        </DashboardActionButton>
                        <DashboardActionButton 
                          type="contact" 
                          onClick={() => handleContact(offer)}
                        >
                          Contact
                        </DashboardActionButton>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Skill Requests */}
          {currentProfile.skillRequests && currentProfile.skillRequests.length > 0 && (
            <div>
              <h4 className="text-[#121731] font-semibold mb-3">Skill Requests</h4>
              <div className="space-y-4">
                {currentProfile.skillRequests.map(request => (
                  <Card key={request.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h5 className="text-[#121731] font-semibold">{request.request}</h5>
                        <SmallText>{request.timePosted}</SmallText>
                      </div>
                      <p className="text-gray-600">{request.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <SmallText weight="semibold">Category:</SmallText>
                          <SmallText>{request.category}</SmallText>
                        </div>
                        <div>
                          <SmallText weight="semibold">Location:</SmallText>
                          <SmallText>{request.location}</SmallText>
                        </div>
                        <div>
                          <SmallText weight="semibold">Skills Offered:</SmallText>
                          <SmallText>{request.skillsOffered}</SmallText>
                        </div>
                        <div>
                          <SmallText weight="semibold">Schedule:</SmallText>
                          <SmallText>{request.schedule}</SmallText>
                        </div>
                      </div>
                      {request.additionalNotes && (
                        <div>
                          <SmallText weight="semibold">Additional Notes:</SmallText>
                          <SmallText>{request.additionalNotes}</SmallText>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <DashboardActionButton 
                          type="report" 
                          onClick={() => openReportModal(currentProfile.fullName)}
                        >
                          Report
                        </DashboardActionButton>
                        <DashboardActionButton 
                          type="contact" 
                          onClick={() => handleContact(request)}
                        >
                          Contact
                        </DashboardActionButton>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

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