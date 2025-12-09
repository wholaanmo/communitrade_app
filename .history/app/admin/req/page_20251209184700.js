'use client'

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminRequestsTemplate from '@/components/templates/AdminRequestsTemplate'
import ProfileModalAdmin from '@/components/molecules/ProfileModalAdmin'
import DeleteModal from '@/components/molecules/DeleteModal'
import RemoveModal from '@/components/molecules/RemoveModal'
import KeepModal from '@/components/molecules/KeepModal'

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
        proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
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
        proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
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
  'John Doe': {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 567-8901',
    isVerified: false,
    userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [],
    skillOffers: [],
    skillRequests: [
      {
        id: 203,
        request: 'Need help with illegal software',
        description: 'Looking for someone to help me crack software licenses.',
        category: 'Technology',
        location: 'Remote',
        skillsOffered: 'Graphic design services',
        schedule: 'ASAP',
        additionalNotes: 'Must be discreet about this.',
        timePosted: '3 days ago',
        proof: null
      }
    ]
  },
  'Jane Smith': {
    fullName: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 678-9012',
    isVerified: false,
    userPicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [],
    skillOffers: [],
    skillRequests: [
      {
        id: 204,
        request: 'Fake certificate creation',
        description: 'Need someone to create fake educational certificates for job applications.',
        category: 'Education',
        location: 'Remote',
        skillsOffered: 'Data entry work',
        schedule: 'Within 1 week',
        additionalNotes: 'Need to look authentic.',
        timePosted: '1 day ago',
        proof: null
      }
    ]
  }
}

const initialPosts = [
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
    additionalNotes: 'Prefer someone with experience in e-commerce sites.',
    proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
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
    additionalNotes: 'Can meet at local libraries or cafes.',
    proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
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
    additionalNotes: 'Tech background preferred but not required.',
    proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
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
    additionalNotes: 'Experience with Instagram and TikTok preferred.',
    proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  }
]

const initialReportedPosts = [
  {
    id: 5,
    userName: 'John Doe',
    userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '3 days ago',
    request: 'Need help with illegal software',
    description: 'Looking for someone to help me crack software licenses.',
    category: 'Technology',
    location: 'Remote',
    skillsOffered: 'Graphic design services',
    schedule: 'ASAP',
    additionalNotes: 'Must be discreet about this.',
    reportReason: 'Requesting illegal services - software piracy'
  },
  {
    id: 6,
    userName: 'Jane Smith',
    userPicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '1 day ago',
    request: 'Fake certificate creation',
    description: 'Need someone to create fake educational certificates for job applications.',
    category: 'Education',
    location: 'Remote',
    skillsOffered: 'Data entry work',
    schedule: 'Within 1 week',
    additionalNotes: 'Need to look authentic.',
    reportReason: 'Fraudulent activity - creating fake documents'
  }
]

export default function AdminRequestsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
  const [currentProfileName, setCurrentProfileName] = useState('')

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  
    if (session.user?.email !== "floresjamaicamae30@gmail.com") {
      router.push("/user/dashboard"); 
      return;
    }
  }, [session, status, router]);
  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading Admin Page...</div>
      </div>
    );
  }

  // Don't render if not authenticated or not admin
  if (!session || session.user?.email !== "floresjamaicamae30@gmail.com") {
    return null;
  }


  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      post.request.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      post.skillsOffered.toLowerCase().includes(query)
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
    alert(`Contacting ${post.userName}...`)
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
    setCurrentProfileName(profile.fullName)
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
      if (postToDelete.type === 'offer') {
        setPosts(prev => prev.filter(p => p.id !== postToDelete.id))
        setReportedPosts(prev => prev.filter(p => p.id !== postToDelete.id))
      } else if (postToDelete.type === 'request') {
        setPosts(prev => prev.filter(p => p.id !== postToDelete.id))
        setReportedPosts(prev => prev.filter(p => p.id !== postToDelete.id))
      } else {
        setPosts(prev => prev.filter(p => p.id !== postToDelete.id))
        setReportedPosts(prev => prev.filter(p => p.id !== postToDelete.id))
      }
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
      const postWithoutReportReason = { ...postToKeep }
      delete postWithoutReportReason.reportReason
      setPosts(prev => [postWithoutReportReason, ...prev])
      console.log('Post kept:', postToKeep)
    }
    setShowKeepModal(false)
    setPostToKeep(null)
  }

  const closeProfileModal = () => {
    setShowProfileModal(false)
    setCurrentProfile({})
    setCurrentProfileName('')
  }

  // Handle delete from profile modal
  const handleDeleteFromProfile = (post, type) => {
    setPostToDelete({ ...post, type })
    setShowDeleteModal(true)
    setShowProfileModal(false)
  }

  return (
    <>
      <AdminRequestsTemplate
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
      <KeepModal
        isOpen={showKeepModal}
        onClose={() => setShowKeepModal(false)}
        onConfirm={confirmKeep}
        post={postToKeep}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        post={postToDelete}
        profileName={currentProfileName}
      />

      <RemoveModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={confirmRemove}
        post={postToRemove}
      />

      {/* Profile Modal */}
      <ProfileModalAdmin
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        profile={currentProfile}
        onReport={(post, userName) => {
          console.log('Report:', post, userName)
          alert(`Report submitted for ${userName}`)
        }}
        onContact={(post) => {
          console.log('Contact:', post)
          alert(`Contacting user about: ${post.skills || post.request}`)
        }}
        onDeletePost={handleDeleteFromProfile}
      />
    </>
  )
}