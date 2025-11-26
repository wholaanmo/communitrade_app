'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
import DashboardActionButton from '@/components/molecules/DashboardActionButton'
import SeeAllButton from '@/components/molecules/SeeAllButton'

export default function Dashboard() {
  const router = useRouter()
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
    
    // Here you would typically send the report data to your backend
    console.log('Submitting report:', reportData)
    
    // Show success message or handle response
    alert(`Report submitted for ${reportedUserName}`)
    
    closeReportModal()
  }

  // Profile modal methods
  const openProfileModal = (post) => {
    // Mock profile data - in a real app, you would fetch this from an API based on the user ID
    setCurrentProfile({
      fullName: post.accountName,
      email: `${post.accountName.toLowerCase()}@example.com`,
      phone: '+1 (555) 123-4567',
      isVerified: true,
      userPicture: post.profilePic,
      linkedAccounts: [
        { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/' + post.accountName },
        { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/' + post.accountName },
        { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/' + post.accountName }
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

  // Sample data for requests with profile pictures
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
    }
  ])

  // Sample data for offers with profile pictures
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
    // Handle contact logic
    console.log('Contacting:', post.userName)
  }

  const handleViewProfile = (post) => {
    openProfileModal(post)
  }

  return (
    <div className="dashboard p-8 max-w-7xl mx-auto ml-8 mr-0">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar 
          placeholder="Search for skills, categories, or locations..."
          onSearch={handleSearch}
          className="max-w-2xl"
        />
      </div>

      {/* Report Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={closeReportModal}
        title={`Reason for reporting ${reportedUserName}`}
        size="medium"
      >
        <div className="space-y-6">
          <div className="report-reasons flex flex-col gap-4">
            {reportReasons.map((reason) => (
              <label key={reason.value} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:border-[#121731] hover:bg-gray-50">
                <Input
                  type="radio"
                  value={reason.value}
                  checked={selectedReason === reason.value}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="mr-3"
                />
                <span className="font-medium text-[#121731]">{reason.label}</span>
              </label>
            ))}
          </div>
          
          {selectedReason === 'other' && (
            <div className="description-box">
              <Label htmlFor="report-description">Description</Label>
              <TextArea
                id="report-description"
                value={otherDescription}
                onChange={(e) => setOtherDescription(e.target.value)}
                placeholder="Please describe the reason for reporting..."
                rows={4}
              />
            </div>
          )}
          
          <div className="proof-upload-section">
            <Label htmlFor="proof-upload">Proof (Optional)</Label>
            <FileUpload
              id="proof-upload"
              onChange={handleProofUpload}
              accept="image/*,.pdf,.doc,.docx"
              className="mt-2"
            >
              {proofFile ? proofFile.name : 'Upload Proof'}
            </FileUpload>
            <SmallText className="mt-1">
              You can upload images, PDFs, or documents as evidence
            </SmallText>
          </div>
          
          <div className="report-actions flex gap-4 justify-end">
            <Button variant="secondary" onClick={closeReportModal}>
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={submitReport} 
              disabled={!selectedReason || (selectedReason === 'other' && !otherDescription.trim())}
            >
              Submit Report
            </Button>
          </div>
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        title="User Profile"
        size="large"
      >
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="profile-header flex items-center gap-4">
            <img 
              src={currentProfile.userPicture} 
              alt={currentProfile.fullName} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[#121731] text-lg font-semibold">{currentProfile.fullName}</h3>
                {currentProfile.isVerified && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Icon name="verified" size="sm" />
                    Verified
                  </span>
                )}
              </div>
              <SmallText>{currentProfile.email}</SmallText>
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
          {currentProfile.skillOffers?.length > 0 && (
            <div>
              <h4 className="text-[#121731] font-semibold mb-3">Skill Offers</h4>
              <div className="space-y-4">
                {currentProfile.skillOffers.map(offer => (
                  <Card key={offer.id} className="p-4">
                    <PostCard
                      post={offer}
                      type="offer"
                      onReport={() => openReportModal(currentProfile.fullName)}
                      onContact={() => handleContact(offer)}
                    />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Skill Requests */}
          {currentProfile.skillRequests?.length > 0 && (
            <div>
              <h4 className="text-[#121731] font-semibold mb-3">Skill Requests</h4>
              <div className="space-y-4">
                {currentProfile.skillRequests.map(request => (
                  <Card key={request.id} className="p-4">
                    <PostCard
                      post={request}
                      type="request"
                      onReport={() => openReportModal(currentProfile.fullName)}
                      onContact={() => handleContact(request)}
                    />
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
          <Link href="/user/request" className="flex items-center text-[#121731] font-semibold hover:text-[#728a9c] transition-colors no-underline">
            See All
            <Icon name="chevron_right" className="ml-1" />
          </Link>
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
          <Link href="/user/offer" className="flex items-center text-[#121731] font-semibold hover:text-[#728a9c] transition-colors no-underline">
            See All
            <Icon name="chevron_right" className="ml-1" />
          </Link>
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
    </div>
  )
}