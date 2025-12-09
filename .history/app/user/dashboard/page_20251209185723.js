'use client'

import { useState, useMemo, useEffect } from 'react' 
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

import SearchBar from '@/components/molecules/SearchBar'
import PostCard from '@/components/molecules/PostCard'
import Icon from '@/components/atoms/Icon'
import ReportModal from '@/components/molecules/ReportModal'
import ProfileModal from '@/components/molecules/ProfileModal'

// Import Firebase helpers
import { postsDB } from '@/lib/firebaseDB'

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
  const { data: session, status } = useSession()
  const router = useRouter() 
  
  // State variables
  const [searchQuery, setSearchQuery] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportedUserName, setReportedUserName] = useState('')
  const [currentReportPost, setCurrentReportPost] = useState(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [currentProfile, setCurrentProfile] = useState({})

  // Firebase data states
  const [requests, setRequests] = useState([])
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    myRequests: 0,
    myOffers: 0
  })

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  // Fetch data from Firebase
  useEffect(() => {
    if (!session?.user?.email) return;

    setLoading(true);

    // Get user ID from email (same format as used in posts)
    const userId = session.user.email.replace(/[^a-zA-Z0-9]/g, '_');

    // Listen to requests in real-time - CORRECTED to 'request' (singular)
    const unsubscribeRequests = postsDB.listenToPosts(
      'request', // CHANGED from 'requests' to 'request'
      { status: 'active' }, 
      (requestsData) => {
        // Sort by timestamp (newest first)
        const sortedRequests = requestsData.sort((a, b) => {
          const timeA = a.createdAt || a.timestamp || 0;
          const timeB = b.createdAt || b.timestamp || 0;
          return new Date(timeB) - new Date(timeA);
        });
        
        setRequests(sortedRequests);
        setStats(prev => ({
          ...prev,
          myRequests: sortedRequests.filter(req => req.userId === userId).length
        }));
      }
    );

    // Listen to offers in real-time
    const unsubscribeOffers = postsDB.listenToPosts(
      'offers', 
      { status: 'active' }, 
      (offersData) => {
        // Sort by timestamp (newest first)
        const sortedOffers = offersData.sort((a, b) => {
          const timeA = a.createdAt || a.timestamp || 0;
          const timeB = b.createdAt || b.timestamp || 0;
          return new Date(timeB) - new Date(timeA);
        });
        
        setOffers(sortedOffers);
        setStats(prev => ({
          ...prev,
          myOffers: sortedOffers.filter(offer => offer.userId === userId).length
        }));
      }
    );

    setLoading(false);

    // Cleanup subscriptions
    return () => {
      if (unsubscribeRequests) unsubscribeRequests();
      if (unsubscribeOffers) unsubscribeOffers();
    };
  }, [session?.user?.email]);

  // Format posts for display
  const formatPostForDisplay = (post, type) => {
    if (type === 'request') {
      return {
        id: post.id,
        userName: post.userName || post.userEmail?.split('@')[0] || 'User',
        userPicture: post.userPicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        timePosted: post.createdAt ? formatTimeAgo(post.createdAt) : 
                   post.timestamp ? formatTimeAgo(post.timestamp) : 'Recently',
        request: post.title || post.request || 'Untitled Request',
        description: post.description || 'No description provided',
        category: post.category || 'General',
        location: post.location || 'Not specified',
        skillsOffered: Array.isArray(post.skillsOffered) ? post.skillsOffered.join(', ') : 
                      (post.skillsOffered || 'Not specified'),
        schedule: post.schedule || 'Flexible',
        additionalNotes: post.additionalNotes || '',
        proof: post.proofImage || null,
        userId: post.userId,
        userEmail: post.userEmail
      };
    } else {
      return {
        id: post.id,
        userName: post.userName || post.userEmail?.split('@')[0] || 'User',
        userPicture: post.userPicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        timePosted: post.createdAt ? formatTimeAgo(post.createdAt) : 
                   post.timestamp ? formatTimeAgo(post.timestamp) : 'Recently',
        skills: post.title || post.skills || 'Untitled Offer',
        description: post.description || 'No description provided',
        category: post.category || 'General',
        location: post.location || 'Not specified',
        skillsRequested: Array.isArray(post.skillsRequested) ? post.skillsRequested.join(', ') : 
                        (post.skillsRequested || 'Not specified'),
        schedule: post.schedule || 'Flexible',
        additionalNotes: post.additionalNotes || '',
        proof: post.proofImage || null,
        userId: post.userId,
        userEmail: post.userEmail
      };
    }
  };

  const DashboardPostCard = ({ 
    post, 
    type = 'request',
    currentUserId,
    onReport,
    onContact,
    onViewProfile,
    onDelete,
    onEdit,
    className = ''
  }) => {
    // Determine if this is the current user's post
    const isOwnPost = post.userId === currentUserId;
    
    // Create custom actions array based on post ownership
    const customActions = isOwnPost
      ? [
          { type: 'delete', onClick: () => onDelete(post), label: 'Delete' },
          { type: 'edit', onClick: () => onEdit(post), label: 'Edit' }
        ]
      : [
          { type: 'report', onClick: () => onReport(post), label: 'Report' },
          { type: 'contact', onClick: () => onContact(post), label: 'Contact' },
          { type: 'profile', onClick: () => onViewProfile(post), label: 'View Profile' }
        ];
  
    return (
      <PostCard
        post={post}
        type={type}
        customActions={true}
        actions={customActions}
        className={className}
      />
    );
  };

  const handleDelete = async (post) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const postType = post.request ? 'request' : 'offers';
      await postsDB.deletePost(postType, post.id);
      
      // Remove from local state
      if (post.request) {
        setRequests(prev => prev.filter(p => p.id !== post.id));
      } else {
        setOffers(prev => prev.filter(p => p.id !== post.id));
      }
      
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };
  
  // Handle edit post
  const handleEdit = (post) => {
    // Determine which page to navigate to based on post type
    if (post.request) {
      router.push(`/user/request?edit=${post.id}`);
    } else {
      router.push(`/user/offer?edit=${post.id}`);
    }
  };

  const getCurrentUserId = () => {
    if (!session?.user?.email) return null;
    return session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
  };
  
  const currentUserId = getCurrentUserId();

  // Helper function to format time ago
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    let date;
    if (typeof timestamp === 'object' && timestamp.seconds) {
      // Firebase timestamp object
      date = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === 'string') {
      // ISO string
      date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      // Unix timestamp
      date = new Date(timestamp);
    } else {
      return 'Recently';
    }
    
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Report modal methods
  const openReportModal = (userName, post = null) => {
    setReportedUserName(userName);
    setCurrentReportPost(post);
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportedUserName('');
    setCurrentReportPost(null);
  };

  const handleReportSubmit = async (reportData) => {
    if (!currentReportPost) return;
    
    try {
      const reportPayload = {
        postId: currentReportPost.id,
        postType: currentReportPost.request ? 'request' : 'offer',
        reporterId: session.user.email.replace(/[^a-zA-Z0-9]/g, '_'),
        reporterEmail: session.user.email,
        reportedUserId: currentReportPost.userId,
        reportedUserName: reportedUserName,
        reason: reportData.reason,
        description: reportData.description,
        proof: reportData.proofFile ? reportData.proofFile.name : null,
        status: 'pending'
      };
      
      await postsDB.reportPost(
        currentReportPost.request ? 'request' : 'offers',
        currentReportPost.id,
        reportPayload
      );
      
      alert(`Report submitted for ${reportedUserName}`);
      closeReportModal();
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  // Profile modal methods
  const openProfileModal = async (post) => {
    try {
      // Create a mock profile based on the post
      const mockProfile = {
        fullName: post.userName,
        email: post.userEmail || `${post.userName.toLowerCase().replace(' ', '')}@example.com`,
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
          skills: post.skills,
          description: post.description,
          category: post.category,
          location: post.location,
          skillsRequested: post.skillsRequested,
          schedule: post.schedule,
          additionalNotes: post.additionalNotes,
          timePosted: post.timePosted,
          proof: post.proof || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
        }] : [],
        skillRequests: post.request ? [{
          id: post.id,
          request: post.request,
          description: post.description,
          category: post.category,
          location: post.location,
          skillsOffered: post.skillsOffered,
          schedule: post.schedule,
          additionalNotes: post.additionalNotes,
          timePosted: post.timePosted,
          proof: post.proof || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
        }] : []
      };
      
      setCurrentProfile(mockProfile);
      setShowProfileModal(true);
    } catch (error) {
      console.error('Error opening profile:', error);
    }
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setCurrentProfile({});
  };

  const handleContact = async (post) => {
    try {
      console.log('Contacting:', post.userName);
      
      // Navigate to message page with the user's info
      router.push(`/user/message?userId=${encodeURIComponent(post.userId)}&userName=${encodeURIComponent(post.userName)}&userEmail=${encodeURIComponent(post.userEmail || '')}&userPicture=${encodeURIComponent(post.userPicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')}`);
    } catch (error) {
      console.error('Error contacting user:', error);
      alert('Failed to start conversation. Please try again.');
    }
  };

  // Computed properties for filtered data - Show 3 most recent posts
  const filteredRequests = useMemo(() => {
    let filtered = requests;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = requests.filter(request => 
        (request.title && request.title.toLowerCase().includes(query)) ||
        (request.description && request.description.toLowerCase().includes(query)) ||
        (request.category && request.category.toLowerCase().includes(query)) ||
        (request.location && request.location.toLowerCase().includes(query)) ||
        (request.skillsOffered && request.skillsOffered.toString().toLowerCase().includes(query))
      );
    }
    
    // Take first 3 posts (already sorted by date in the useEffect)
    return filtered.slice(0, 3).map(req => formatPostForDisplay(req, 'request'));
  }, [searchQuery, requests]);

  const filteredOffers = useMemo(() => {
    let filtered = offers;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = offers.filter(offer => 
        (offer.title && offer.title.toLowerCase().includes(query)) ||
        (offer.description && offer.description.toLowerCase().includes(query)) ||
        (offer.category && offer.category.toLowerCase().includes(query)) ||
        (offer.location && offer.location.toLowerCase().includes(query)) ||
        (offer.skillsRequested && offer.skillsRequested.toString().toLowerCase().includes(query))
      );
    }
    
    // Take first 3 posts (already sorted by date in the useEffect)
    return filtered.slice(0, 3).map(offer => formatPostForDisplay(offer, 'offer'));
  }, [searchQuery, offers]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleViewProfile = (post) => {
    openProfileModal(post);
  };

  // Handle broken image links
  const handleImageError = (event) => {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+';
  };

  // Show loading state while checking authentication
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading User Dashboard...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
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
              <div className="flex gap-4 mt-3">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Your Requests: {stats.myRequests}
                </span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Your Offers: {stats.myOffers}
                </span>
              </div>
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
        onSubmit={handleReportSubmit}
      />

      {/* Profile Modal */}
      <ProfileModal
  isOpen={showProfileModal}
  onClose={closeProfileModal}
  profile={currentProfile}
  onReport={(post, userName) => {
    setReportedUserName(userName);
    setCurrentReportPost(post);
    setShowReportModal(true);
    setShowProfileModal(false);
  }}
  onContact={(post) => handleContact(post)}
  onDelete={(post) => handleDelete(post)}
  onEdit={(post) => handleEdit(post)}
/>

{/* Requests Section */}
<section className="requests-section mb-12">
  <div className="section-header flex justify-between items-center mb-8">
    <h2 className="text-[#121731] text-xl font-semibold">Recent Requests</h2>
    <SeeAllButton href="/user/request" />
  </div>

  {filteredRequests.length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      <p>No requests found. Be the first to create one!</p>
      <Link href="/user/request" className="text-[#728a9c] hover:text-[#121731] mt-2 inline-block">
        Create a request →
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRequests.map((request) => (
        <DashboardPostCard
          key={request.id}
          post={request}
          type="request"
          currentUserId={currentUserId}
          onReport={() => openReportModal(request.userName, request)}
          onContact={() => handleContact(request)}
          onViewProfile={() => handleViewProfile(request)}
          onDelete={() => handleDelete(request)}
          onEdit={() => handleEdit(request)}
        />
      ))}
    </div>
  )}
</section>

{/* Offers Section */}
<section className="offers-section">
  <div className="section-header flex justify-between items-center mb-8">
    <h2 className="text-[#121731] text-xl font-semibold">Recent Offers</h2>
    <SeeAllButton href="/user/offer" />
  </div>

  {filteredOffers.length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      <p>No offers found. Create your first offer!</p>
      <Link href="/user/offer" className="text-[#728a9c] hover:text-[#121731] mt-2 inline-block">
        Create an offer →
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredOffers.map((offer) => (
        <DashboardPostCard
          key={offer.id}
          post={offer}
          type="offer"
          currentUserId={currentUserId}
          onReport={() => openReportModal(offer.userName, offer)}
          onContact={() => handleContact(offer)}
          onViewProfile={() => handleViewProfile(offer)}
          onDelete={() => handleDelete(offer)}
          onEdit={() => handleEdit(offer)}
        />
      ))}
    </div>
  )}
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
  );
}