'use client'

import { useState, useMemo, useEffect } from 'react' 
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

// Import atomic design components
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
    if (!session) return;

    setLoading(true);

    const loadData = async () => {
      try {
        // Get user ID from session email
        const userId = session.user?.email?.replace(/[^a-zA-Z0-9]/g, '_');
        console.log('Dashboard - Current userId:', userId);

        // Load all active requests
        const fetchedRequests = await postsDB.getPosts('requests', {
          status: 'active'
        });
        console.log('Dashboard - Loaded requests:', fetchedRequests.length);

        // Load all active offers
        const fetchedOffers = await postsDB.getPosts('offers', {
          status: 'active'
        });
        console.log('Dashboard - Loaded offers:', fetchedOffers.length);

        // Update state
        setRequests(fetchedRequests);
        setOffers(fetchedOffers);
        
        // Calculate user stats
        if (userId) {
          const myRequestsCount = fetchedRequests.filter(req => req.userId === userId).length;
          const myOffersCount = fetchedOffers.filter(offer => offer.userId === userId).length;
          
          setStats({
            myRequests: myRequestsCount,
            myOffers: myOffersCount
          });
        }

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setRequests([]);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Set up real-time listeners
    let unsubscribeRequests, unsubscribeOffers;

    try {
      // Listen to requests in real-time
      unsubscribeRequests = postsDB.listenToPosts(
        'requests', 
        { status: 'active' }, 
        (requestsData) => {
          console.log('Dashboard - Real-time requests update:', requestsData.length);
          setRequests(requestsData);
          
          // Update stats
          if (session.user?.email) {
            const userId = session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
            const myRequestsCount = requestsData.filter(req => req.userId === userId).length;
            setStats(prev => ({ ...prev, myRequests: myRequestsCount }));
          }
        }
      );

      // Listen to offers in real-time
      unsubscribeOffers = postsDB.listenToPosts(
        'offers', 
        { status: 'active' }, 
        (offersData) => {
          console.log('Dashboard - Real-time offers update:', offersData.length);
          setOffers(offersData);
          
          // Update stats
          if (session.user?.email) {
            const userId = session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
            const myOffersCount = offersData.filter(offer => offer.userId === userId).length;
            setStats(prev => ({ ...prev, myOffers: myOffersCount }));
          }
        }
      );
    } catch (error) {
      console.error('Error setting up real-time listeners:', error);
    }

    // Cleanup subscriptions
    return () => {
      if (unsubscribeRequests) unsubscribeRequests();
      if (unsubscribeOffers) unsubscribeOffers();
    };
  }, [session]);

  // Helper function to format time ago
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    const now = new Date();
    let postDate;
    
    if (typeof timestamp === 'object' && timestamp.seconds) {
      // Firebase timestamp object
      postDate = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === 'string') {
      // ISO string
      postDate = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      // Unix timestamp
      postDate = new Date(timestamp);
    } else {
      return 'Recently';
    }
    
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
    
    return postDate.toLocaleDateString();
  }

  // Format posts for display
  const formatPostForDisplay = (post, type) => {
    if (type === 'request') {
      return {
        id: post.id,
        userName: post.userName || post.userEmail?.split('@')[0] || 'User',
        userPicture: post.userPicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        timePosted: formatTimeAgo(post.createdAt || post.timestamp),
        request: post.title || 'Untitled Request',
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
    } else { // type === 'offer'
      return {
        id: post.id,
        userName: post.userName || post.userEmail?.split('@')[0] || 'User',
        userPicture: post.userPicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        timePosted: formatTimeAgo(post.createdAt || post.timestamp),
        skills: post.title || 'Untitled Offer',
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

  // Report modal methods
  const openReportModal = (post, userName) => {
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
    if (!session || !currentReportPost) return;

    try {
      const userId = session.user?.id || session.user?.uid || session.userId || 'anonymous';
      const userName = session.user?.name || session.user?.username || 'Anonymous';
      const userEmail = session.user?.email || 'No email';
      
      // Determine post type based on content
      const postType = currentReportPost.request ? 'requests' : 'offers';
      
      await postsDB.reportPost(postType, currentReportPost.id, {
        ...reportData,
        reporterUserId: userId,
        reporterName: userName,
        reporterEmail: userEmail,
        reportedUserId: currentReportPost.userId || 'unknown',
        reportedUserName: reportedUserName,
        postTitle: currentReportPost.request || currentReportPost.skills,
        postDescription: currentReportPost.description
      });

      alert(`Report submitted for ${reportedUserName}. Thank you for helping keep our community safe.`);
      closeReportModal();
      
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  // Profile modal methods
  const openProfileModal = (post) => {
    const profile = {
      fullName: post.userName,
      email: post.userEmail || 'Not provided',
      phone: 'Not provided',
      isVerified: false,
      userPicture: post.userPicture,
      linkedAccounts: [],
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
        proof: post.proof
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
        proof: post.proof
      }] : []
    };
    
    setCurrentProfile(profile);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setCurrentProfile({});
  };

  const handleContact = (post) => {
    console.log('Contacting:', post.userName);
    alert(`Contacting ${post.userName}...`);
  };

  // Computed properties for filtered data - MAX 3 ITEMS EACH
  const filteredRequests = useMemo(() => {
    let filtered = requests;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        (request.title && request.title.toLowerCase().includes(query)) ||
        (request.description && request.description.toLowerCase().includes(query)) ||
        (request.category && request.category.toLowerCase().includes(query)) ||
        (request.location && request.location.toLowerCase().includes(query)) ||
        (request.skillsOffered && 
          (Array.isArray(request.skillsOffered) 
            ? request.skillsOffered.some(skill => skill.toLowerCase().includes(query))
            : request.skillsOffered.toLowerCase().includes(query)))
      );
    }
    
    // Get most recent 3 posts
    return filtered
      .slice(0, 3)
      .map(req => formatPostForDisplay(req, 'request'));
  }, [searchQuery, requests]);

  const filteredOffers = useMemo(() => {
    let filtered = offers;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(offer => 
        (offer.title && offer.title.toLowerCase().includes(query)) ||
        (offer.description && offer.description.toLowerCase().includes(query)) ||
        (offer.category && offer.category.toLowerCase().includes(query)) ||
        (offer.location && offer.location.toLowerCase().includes(query)) ||
        (offer.skillsRequested && 
          (Array.isArray(offer.skillsRequested) 
            ? offer.skillsRequested.some(skill => skill.toLowerCase().includes(query))
            : offer.skillsRequested.toLowerCase().includes(query)))
      );
    }
    
    // Get most recent 3 posts
    return filtered
      .slice(0, 3)
      .map(offer => formatPostForDisplay(offer, 'offer'));
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
  if (status === "loading") {
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

  // Show loading state while fetching posts
  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto p-4 sm:p-5">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
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
      />

      {/* Requests Section - Shows up to 3 items */}
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
              <PostCard
                key={request.id}
                post={request}
                type="request"
                onReport={() => openReportModal(request, request.userName)}
                onContact={() => handleContact(request)}
                onViewProfile={() => handleViewProfile(request)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Offers Section - Shows up to 3 items */}
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
              <PostCard
                key={offer.id}
                post={offer}
                type="offer"
                onReport={() => openReportModal(offer, offer.userName)}
                onContact={() => handleContact(offer)}
                onViewProfile={() => handleViewProfile(offer)}
              />
            ))}
          </div>
        )}
      </section>

      <style jsx>{`
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