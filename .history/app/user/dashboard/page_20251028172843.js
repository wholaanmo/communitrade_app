'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  // Report popup state
  const [showReportPopup, setShowReportPopup] = useState(false)
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

  // Report popup methods
  const openReportPopup = (userName) => {
    setReportedUserName(userName)
    setSelectedReason('')
    setOtherDescription('')
    setProofFile(null)
    setShowReportPopup(true)
  }

  const closeReportPopup = () => {
    setShowReportPopup(false)
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
    
    closeReportPopup()
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

  const openReportModalFromProfile = (post, userName) => {
    setReportedUserName(userName)
    setSelectedReason('')
    setOtherDescription('')
    setProofFile(null)
    setShowReportPopup(true)
  }

  // Sample data for requests with profile pictures
  const [requests] = useState([
    {
      id: 1,
      accountName: 'Alex Johnson',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
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
      accountName: 'Sarah Smith',
      profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
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
      accountName: 'Michael Brown',
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
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

  // Sample data for offers with profile pictures
  const [offers] = useState([
    {
      id: 1,
      accountName: 'Mike Johnson',
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
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
      accountName: 'Emma Wilson',
      profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
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
      accountName: 'David Chen',
      profilePic: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
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

  // Handle broken image links
  const handleImageError = (event) => {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
  }

  return (
    <div className="dashboard p-8 max-w-7xl mx-auto ml-8 mr-0">
      {/* Report Pop-up */}
      {showReportPopup && (
       <div
       className="report-popup-overlay fixed inset-0 bg-[rgba(211,211,211,0.1)] backdrop-blur-sm flex justify-center items-center z-[1001]"
       onClick={closeReportPopup}
     >
     
          <div className="report-popup-container bg-white rounded-2xl p-8 w-11/12 max-w-lg max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="report-popup-header flex justify-center items-center mb-6 pb-4 border-b border-gray-300">
              <h3 className="text-primary text-xl font-semibold m-0 text-center">Reason for reporting {reportedUserName}</h3>
            </div>
            <div className="report-popup-content">
              <div className="report-reasons flex flex-col gap-4 mb-6">
                {reportReasons.map((reason) => (
                  <label key={reason.value} className="reason-option flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:border-primary hover:bg-gray-50">
                    <input 
                      type="radio" 
                      value={reason.value} 
                      checked={selectedReason === reason.value}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="reason-radio mr-3"
                    />
                    <span className="reason-label font-medium text-dark">{reason.label}</span>
                  </label>
                ))}
              </div>
              {selectedReason === 'other' && (
                <div className="description-box mb-6">
                  <textarea 
                    value={otherDescription}
                    onChange={(e) => setOtherDescription(e.target.value)}
                    placeholder="Please describe the reason for reporting..."
                    className="description-textarea w-full p-3 border border-gray-300 rounded-lg font-inherit text-sm resize-y transition-colors duration-300 focus:border-primary focus:outline-none"
                    rows="4"
                  ></textarea>
                </div>
              )}
              {/* Proof Upload Section */}
              <div className="proof-upload-section mb-6">
                <label className="proof-label block font-semibold text-primary mb-3 text-sm">Proof (Optional)</label>
                <div className="file-upload flex items-center gap-2.5 mb-2">
                  <input 
                    type="file" 
                    id="proof-upload"
                    onChange={handleProofUpload}
                    accept="image/*,.pdf,.doc,.docx"
                    className="file-input hidden"
                  />
                  <label htmlFor="proof-upload" className="file-upload-label flex items-center p-2.5 bg-gray-100 border border-dashed border-gray-400 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200 text-sm">
                    <span className="material-icons mr-2 text-gray-500 text-lg">cloud_upload</span>
                    Upload Proof
                  </label>
                  {proofFile && <span className="file-name text-gray-500 text-sm italic">{proofFile.name}</span>}
                </div>
                <p className="proof-hint text-gray-500 text-xs m-0">You can upload images, PDFs, or documents as evidence</p>
              </div>
              <div className="report-actions flex gap-4 justify-end">
                <button className="cancel-btn1 bg-white text-gray-500 border border-gray-500 rounded-lg py-2 px-4 transition-colors duration-300 hover:bg-gray-500 hover:text-white" onClick={closeReportPopup}>Cancel</button>
                <button 
                  className="submit-btn bg-red-600 text-white border border-red-600 rounded-lg py-2 px-4 transition-colors duration-300 hover:bg-red-700 hover:border-red-700 disabled:opacity-60 disabled:cursor-not-allowed" 
                  onClick={submitReport} 
                  disabled={!selectedReason || (selectedReason === 'other' && !otherDescription.trim())}
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] p-5" onClick={closeProfileModal}>
          <div className="modal-content profile-modal bg-gray-100 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="close-btn absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-gray-400 z-10"
              onClick={closeProfileModal}
            >
              <span className="material-icons text-gray-700 text-lg">close</span>
            </button>

            <div className="profile-header flex items-center mb-8 pb-5 border-b border-gray-200">
              <img src={currentProfile.userPicture} alt={currentProfile.fullName} className="profile-picture w-20 h-20 rounded-full object-cover mr-5" />
              <div className="profile-info">
                <div className="name-verified flex items-center gap-2.5 mb-2">
                  <h2 className="text-primary text-xl font-semibold m-0 text-left">{currentProfile.fullName}</h2>
                  {currentProfile.isVerified && (
                    <span className="verified-badge flex items-center gap-1 bg-green-100 text-green-800 py-1 px-2 rounded-xl text-xs font-medium">
                      <span className="material-icons text-base">verified</span>
                      Verified
                    </span>
                  )}
                </div>
                <p className="profile-email text-gray-700 text-sm m-0">{currentProfile.email}</p>
                <p className="profile-phone text-gray-700 text-sm m-0">{currentProfile.phone}</p>
              </div>
            </div>

            <div className="profile-sections flex flex-col gap-6">
              {/* Linked Accounts Section */}
              <div className="profile-section">
                <h3 className="text-primary text-lg m-0 mb-4">Linked Accounts</h3>
                <div className="linked-accounts flex flex-col gap-2.5">
                  {currentProfile.linkedAccounts?.map((account) => (
                    <a 
                      key={account.platform}
                      href={account.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="account-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-inherit transition-colors duration-300 hover:bg-gray-100 hover:no-underline hover:text-inherit"
                    >
                      <span className="account-icon material-icons text-primary">{account.icon}</span>
                      <span className="account-platform flex-1 font-medium">{account.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Skill Offer Posts Section */}
              <div className="profile-section">
                <h3 className="text-primary text-lg m-0 mb-4">Skill Offer Posts</h3>
                <div className="posts-list flex flex-col gap-5">
                  {currentProfile.skillOffers?.map((offer) => (
                    <div key={offer.id} className="profile-post-card bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <div className="post-header flex justify-between items-start mb-3">
                        <h4 className="text-primary m-0 flex-1">{offer.skills}</h4>
                        <span className="post-time text-gray-500 text-sm">{offer.timePosted}</span>
                      </div>
                      <p className="post-description text-gray-700 m-0 mb-4 leading-relaxed">{offer.description}</p>
                      <div className="post-details grid grid-cols-2 gap-2.5 mb-4">
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Category:</span>
                          <span className="detail-value text-dark text-base">{offer.category}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Location:</span>
                          <span className="detail-value text-dark text-base">{offer.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Skills Requested:</span>
                          <span className="detail-value text-dark text-base">{offer.skillsRequested}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Schedule:</span>
                          <span className="detail-value text-dark text-base">{offer.schedule}</span>
                        </div>
                      </div>
                      {offer.additionalNotes && (
                        <div className="additional-notes mb-4">
                          <span className="detail-label font-semibold text-primary text-sm">Additional Notes:</span>
                          <p className="detail-value text-dark text-base m-0">{offer.additionalNotes}</p>
                        </div>
                      )}
                      {offer.proof && (
                        <div className="proof-image my-4">
                          <img src={offer.proof} alt="Proof" className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300" />
                        </div>
                      )}
                      <div className="post-actions flex gap-2.5 mt-4">
                        <button className="btn2 report-btn2 flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white" onClick={() => openReportModalFromProfile(offer, currentProfile.fullName)}>
                          <span className="material-icons mr-1.5 text-lg">flag</span>
                          Report
                        </button>
                        <button className="btn2 contact-btn2 flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-primary border border-primary hover:bg-[#121731] hover:text-white">
                          <span className="material-icons mr-1.5 text-lg">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Request Posts Section */}
              <div className="profile-section">
                <h3 className="text-primary text-lg m-0 mb-4">Skill Request Posts</h3>
                <div className="posts-list flex flex-col gap-5">
                  {currentProfile.skillRequests?.map((request) => (
                    <div key={request.id} className="profile-post-card bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <div className="post-header flex justify-between items-start mb-3">
                        <h4 className="text-primary m-0 flex-1">{request.request}</h4>
                        <span className="post-time text-gray-500 text-sm">{request.timePosted}</span>
                      </div>
                      <p className="post-description text-gray-700 m-0 mb-4 leading-relaxed">{request.description}</p>
                      <div className="post-details grid grid-cols-2 gap-2.5 mb-4">
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Category:</span>
                          <span className="detail-value text-dark text-base">{request.category}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Location:</span>
                          <span className="detail-value text-dark text-base">{request.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Skills Offered:</span>
                          <span className="detail-value text-dark text-base">{request.skillsOffered}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label font-semibold text-primary text-sm">Schedule:</span>
                          <span className="detail-value text-dark text-base">{request.schedule}</span>
                        </div>
                      </div>
                      {request.additionalNotes && (
                        <div className="additional-notes mb-4">
                          <span className="detail-label font-semibold text-primary text-sm">Additional Notes:</span>
                          <p className="detail-value text-dark text-base m-0">{request.additionalNotes}</p>
                        </div>
                      )}
                      {request.proof && (
                        <div className="proof-image my-4">
                          <img src={request.proof} alt="Proof" className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300" />
                        </div>
                      )}
                      <div className="post-actions flex gap-2.5 mt-4">
                        <button className="btn2 report-btn2 flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white" onClick={() => openReportModalFromProfile(request, currentProfile.fullName)}>
                          <span className="material-icons mr-1.5 text-lg">flag</span>
                          Report
                        </button>
                        <button className="btn2 contact-btn2 flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-primary border border-primary hover:bg-[#121731] hover:text-white">
                          <span className="material-icons mr-1.5 text-lg">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-actions flex justify-end mt-8 pt-5 border-t border-gray-200">
              <button className="close-btn py-2 px-6 bg-primary text-white rounded-lg transition-colors duration-300 hover:bg-dark" onClick={closeProfileModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Requests Section */}
      <section className="requests-section">
        <div className="section-header flex justify-between items-center mb-8 px-2">
          <h2 className="text-primary text-xl font-semibold">Recent Requests</h2>
          <Link href="/request" className="see-all-btn flex items-center text-primary font-semibold text-base transition-colors duration-300 hover:text-dark py-2 px-4 rounded-lg hover:bg-gray-50 no-underline hover:no-underline">
            See All
            <span className="material-icons text-lg ml-1">chevron_right</span>
          </Link>
        </div>

        <div className="cards-container grid grid-cols-3 gap-8 mb-12">
          {filteredRequests.slice(0, 3).map((request) => (
            <div key={request.id} className="request-card bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[580px] flex flex-col">
              {/* Card Header */}
              <div className="card-header flex items-start mb-6 pb-4 border-b border-gray-300">
                <div className="user-info flex items-start gap-3 w-full">
                  <div className="profile-pic-container w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img 
                      src={request.profilePic} 
                      alt={request.accountName}
                      className="profile-pic w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="user-details flex flex-col gap-1 flex-1">
                    <span className="account-name text-primary font-semibold text-lg leading-tight">{request.accountName}</span>
                    <span className="posted-time text-gray-500 text-sm leading-tight">{request.timePosted}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content mb-8 flex-1 flex flex-col gap-4">
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Request:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{request.request}</span>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Description:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{request.description}</span>
                </div>
                <div className="detail-row flex gap-6">
                  <div className="detail-item flex-1 flex flex-col gap-2">
                    <label className="font-bold text-primary text-sm">Category:</label>
                    <span className="detail-value text-dark text-base leading-relaxed">{request.category}</span>
                  </div>
                  <div className="detail-item flex-1 flex flex-col gap-2">
                    <label className="font-bold text-primary text-sm">Location:</label>
                    <span className="detail-value text-dark text-base leading-relaxed">{request.location}</span>
                  </div>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Skills Offered:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{request.skillsOffered.join(', ')}</span>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Schedule:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{request.schedule}</span>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Additional Notes:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{request.additionalNotes}</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="card-actions flex gap-3 flex-wrap mt-auto">
                <button className="btn1 report-btn flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white flex-1 justify-center min-w-[110px]" onClick={() => openReportPopup(request.accountName)}>
                  <span className="material-icons text-lg mr-2">flag</span>
                  Report
                </button>
                <button className="btn1 contact-btn flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-primary border border-primary hover:bg-[#121731] hover:text-white flex-1 justify-center min-w-[110px]">
                  <span className="material-icons text-lg mr-2">message</span>
                  Contact
                </button>
                <button className="btn1 profile-btn flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white flex-1 justify-center min-w-[110px]" onClick={() => openProfileModal(request)}>
                  <span className="material-icons text-lg mr-2">account_circle</span>
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section">
        <div className="section-header flex justify-between items-center mb-8 px-2">
          <h2 className="text-primary text-xl font-semibold">Recent Offers</h2>
          <Link href="/offer" className="see-all-btn flex items-center text-primary font-semibold text-base transition-colors duration-300 hover:text-dark py-2 px-4 rounded-lg hover:bg-gray-50 no-underline hover:no-underline">
            See All
            <span className="material-icons text-lg ml-1">chevron_right</span>
          </Link>
        </div>

        <div className="cards-container grid grid-cols-3 gap-8 mb-12">
          {filteredOffers.slice(0, 3).map((offer) => (
            <div key={offer.id} className="offer-card bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[580px] flex flex-col">
              {/* Card Header */}
              <div className="card-header flex items-start mb-6 pb-4 border-b border-gray-300">
                <div className="user-info flex items-start gap-3 w-full">
                  <div className="profile-pic-container w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img 
                      src={offer.profilePic} 
                      alt={offer.accountName}
                      className="profile-pic w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="user-details flex flex-col gap-1 flex-1">
                    <span className="account-name text-primary font-semibold text-lg leading-tight">{offer.accountName}</span>
                    <span className="posted-time text-gray-500 text-sm leading-tight">{offer.timePosted}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content mb-8 flex-1 flex flex-col gap-4">
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Skills:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{offer.skills.join(', ')}</span>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Description:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{offer.description}</span>
                </div>
                <div className="detail-row flex gap-6">
                  <div className="detail-item flex-1 flex flex-col gap-2">
                    <label className="font-bold text-primary text-sm">Category:</label>
                    <span className="detail-value text-dark text-base leading-relaxed">{offer.category}</span>
                  </div>
                  <div className="detail-item flex-1 flex flex-col gap-2">
                    <label className="font-bold text-primary text-sm">Location:</label>
                    <span className="detail-value text-dark text-base leading-relaxed">{offer.location}</span>
                  </div>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Skills Requested:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{offer.skillsRequested.join(', ')}</span>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Schedule:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{offer.schedule}</span>
                </div>
                <div className="detail-item flex flex-col gap-2">
                  <label className="font-bold text-primary text-sm">Additional Notes:</label>
                  <span className="detail-value text-dark text-base leading-relaxed">{offer.additionalNotes}</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="card-actions flex gap-3 flex-wrap mt-auto">
                <button className="btn1 report-btn flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white flex-1 justify-center min-w-[110px]" onClick={() => openReportPopup(offer.accountName)}>
                  <span className="material-icons text-lg mr-2">flag</span>
                  Report
                </button>
                <button className="btn1 contact-btn flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-primary border border-primary hover:bg-[#121731] hover:text-white flex-1 justify-center min-w-[110px]">
                  <span className="material-icons text-lg mr-2">message</span>
                  Contact
                </button>
                <button className="btn1 profile-btn flex items-center py-1.5 px-4 rounded-lg font-medium transition-all duration-300 text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white flex-1 justify-center min-w-[110px]" onClick={() => openProfileModal(offer)}>
                  <span className="material-icons text-lg mr-2">account_circle</span>
                  View Profile
                </button>
              </div>
            </div>
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

        .report-popup-container {
          animation: popupFadeIn 0.3s ease;
        }

        @media (max-width: 1200px) {
          .cards-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
          
          .request-card,
          .offer-card {
            padding: 1.5rem;
            min-height: 550px;
          }
        }

        @media (max-width: 1024px) {
          .cards-container {
            grid-template-columns: repeat(2, 1fr);
          }
          
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

          .cards-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .request-card,
          .offer-card {
            padding: 1.5rem;
            min-height: auto;
          }

          .card-actions {
            flex-direction: column;
          }

          .detail-row {
            flex-direction: column;
            gap: 1rem;
          }

          .btn1 {
            min-width: auto;
          }
          
          .report-popup-container {
            padding: 1.5rem;
            margin: 1rem;
          }
          
          .report-actions {
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

        @media (max-width: 480px) {
          .dashboard {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }

          .request-card,
          .offer-card {
            padding: 1.25rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .user-info {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  )
}