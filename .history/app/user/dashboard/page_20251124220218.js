'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PostCard } from '../../../components/molecules/PostCard'
import { ReportModal } from '../../../components/organisms/ReportModal'
//import { ProfileModal } from '../../../components/organisms/ProfileModal'
import { SearchBar } from '../../../components/molecules/SearchBar'

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [reportedUserName, setReportedUserName] = useState('')
  const [currentProfile, setCurrentProfile] = useState({})

  // Sample data - replace with API calls
  const [requests] = useState([
    {
      id: "1",
      userName: "Juan",
      request: "Fix laptop",
      description: "Need help repairing",
      category: "Electronics",
      location: "Olongapo",
      skillsOffered: ["Coding", "Repair"],
    }
  ]);
  
  const [offers] = useState([
    {
      id: "2",
      userName: "Mary",
      skills: ["Graphic Design"],
      skillsRequested: ["Video Editing"],
      description: "I can do graphic design",
      category: "Design",
      location: "Gordon College",
    }
  ]);
  

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

  const openReportPopup = (userName) => {
    setReportedUserName(userName)
    setShowReportModal(true)
  }

  const closeReportPopup = () => {
    setShowReportModal(false)
    setReportedUserName('')
  }

  const handleReportSubmit = (reportData) => {
    // Handle report submission
    console.log('Submitting report:', reportData)
    alert(`Report submitted for ${reportData.userName}`)
  }

  const openProfileModal = (post) => {
    setCurrentProfile({
      name: post.userName,
      picture: post.userPicture,
      description: post.description,
      category: post.category
    });
    setCurrentProfile({}); 
    setShowProfileModal(true);
  };


  const closeProfileModal = () => {
    setShowProfileModal(false)
    setCurrentProfile({})
  }

  return (
    <div className="dashboard p-8 max-w-7xl mx-auto ml-8 mr-0">
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search for skills, categories, or locations..."
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={closeReportPopup}
        reportedUserName={reportedUserName}
        onSubmit={handleReportSubmit}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        profile={currentProfile}
      />

      {/* Requests Section */}
      <section className="requests-section">
        <div className="section-header flex justify-between items-center mb-8 px-2">
          <h2 className="text-primary text-xl font-semibold">Recent Requests</h2>
          <Link href="/user/request" className="see-all-btn">
            See All
            <span className="material-icons text-lg ml-1">chevron_right</span>
          </Link>
        </div>

        <div className="cards-container grid grid-cols-3 gap-8 mb-12">
          {filteredRequests.slice(0, 3).map((request) => (
            <PostCard
              key={request.id}
              post={request}
              type="request"
              onReport={openReportPopup}
              onContact={() => console.log('Contact', request.userName)}
              onViewProfile={openProfileModal}
            />
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section">
        <div className="section-header flex justify-between items-center mb-8 px-2">
          <h2 className="text-primary text-xl font-semibold">Recent Offers</h2>
          <Link href="/user/offer" className="see-all-btn">
            See All
            <span className="material-icons text-lg ml-1">chevron_right</span>
          </Link>
        </div>

        <div className="cards-container grid grid-cols-3 gap-8 mb-12">
          {filteredOffers.slice(0, 3).map((offer) => (
            <PostCard
              key={offer.id}
              post={offer}
              type="offer"
              onReport={openReportPopup}
              onContact={() => console.log('Contact', offer.userName)}
              onViewProfile={openProfileModal}
            />
          ))}
        </div>
      </section>
    </div>
  )
}