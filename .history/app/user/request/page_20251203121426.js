'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

import SearchBar from '@/components/molecules/SearchBar'
import PostCard from '@/components/molecules/PostCard'
import Modal from '@/components/molecules/Modal'
import Button from '@/components/atoms/Button'
import Label from '@/components/atoms/Label'
import FileUpload from '@/components/atoms/FileUpload'
import Icon from '@/components/atoms/Icon'
import FormField from '@/components/molecules/FormField'
import EmptyState from '@/components/molecules/EmptyState'
import ReportModal from '@/components/molecules/ReportModal'
import ProfileModal from '@/components/molecules/ProfileModal'
import { postsDB } from '@/lib/firebaseDB'
import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const RequestActionButton = ({ type = 'report', onClick, children, className = '' }) => {
  const iconMap = {
    report: 'flag',
    contact: 'message',
    profile: 'account_circle'
  }

  const baseClasses = 'flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none rounded-lg font-medium py-2 px-3 text-xs sm:text-sm flex-1 sm:flex-none justify-center min-w-[100px]'

  const variants = {
    report: 'border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white',
    contact: 'border border-[#121731] text-[#121731] hover:bg-[#121731] hover:text-white',
    profile: 'border border-[#728a9c] text-[#728a9c] bg-white hover:bg-[#728a9c] hover:text-white'
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${variants[type]} ${className}`}
      onClick={onClick}
    >
      <Icon name={iconMap[type]} className="text-base mr-1" />
      {children}
    </button>
  )
}

export default function SkillRequestPlatform() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
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

  // Report state
  const [reportedUserName, setReportedUserName] = useState('')
  const [currentReportPost, setCurrentReportPost] = useState(null)
  const [currentProfile, setCurrentProfile] = useState({})
  
  // Posts state
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  // Category options for the form
  const categoryOptions = [
    { value: '', label: 'Select a category', disabled: true },
    { value: 'Technology', label: 'Technology' },
    { value: 'Design', label: 'Design' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Education', label: 'Education' },
    { value: 'Home Services', label: 'Home Services' },
    { value: 'Health & Wellness', label: 'Health & Wellness' },
    { value: 'Other', label: 'Other' }
  ]

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router])

  // Load posts from Firebase
  useEffect(() => {
    if (!session) return;

    const loadPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await postsDB.getPosts('requests', {
          searchQuery: searchQuery || ''
        });
        
        // Transform Firebase data to match your existing structure
        const transformedPosts = fetchedPosts.map(post => ({
          id: post.id,
          userName: post.userName || post.userDisplayName || 'Unknown User',
          userPicture: post.userPicture || post.userProfileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
          timePosted: formatTimeAgo(post.createdAt),
          request: post.title || post.request || '',
          description: post.description || '',
          category: post.category || '',
          location: post.location || '',
          skillsOffered: Array.isArray(post.skillsOffered) ? post.skillsOffered.join(', ') : post.skillsOffered || '',
          schedule: post.schedule || '',
          additionalNotes: post.additionalNotes || '',
          proof: post.proofImage || post.proof || null,
          userId: post.userId,
          status: post.status || 'active'
        }));
        
        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        // Fallback to sample data if Firebase fails
        setPosts(getSamplePosts());
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [session, searchQuery]);

  // Real-time listener for posts
  useEffect(() => {
    if (!session) return;

    const unsubscribe = postsDB.listenToPosts('requests', {
      searchQuery: searchQuery || ''
    }, (fetchedPosts) => {
      const transformedPosts = fetchedPosts.map(post => ({
        id: post.id,
        userName: post.userName || post.userDisplayName || 'Unknown User',
        userPicture: post.userPicture || post.userProfileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        timePosted: formatTimeAgo(post.createdAt),
        request: post.title || post.request || '',
        description: post.description || '',
        category: post.category || '',
        location: post.location || '',
        skillsOffered: Array.isArray(post.skillsOffered) ? post.skillsOffered.join(', ') : post.skillsOffered || '',
        schedule: post.schedule || '',
        additionalNotes: post.additionalNotes || '',
        proof: post.proofImage || post.proof || null,
        userId: post.userId,
        status: post.status || 'active'
      }));
      
      setPosts(transformedPosts);
    });

    return () => unsubscribe();
  }, [session, searchQuery]);

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

  // Sample data fallback
  const getSamplePosts = () => [
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
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
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
      proof: null,
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
      proof: null,
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
      proof: null,
    }
  ];

  // Filter posts based on search query (client-side fallback)
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

  // Handle file upload to Firebase Storage
  const handleFileUpload = async (file) => {
    if (!file || !session) return null;
    
    try {
      const storageRef = ref(storage, `proofs/${session.user.id}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, proof: file }));
    }
  };

  // Submit form to Firebase
  const submitForm = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('Please log in to submit a request');
      return;
    }

    setUploading(true);
    
    try {
      // Upload proof image if exists
      let proofUrl = null;
      if (formData.proof) {
        proofUrl = await handleFileUpload(formData.proof);
      }

      // Prepare post data for Firebase
      const postData = {
        title: formData.request,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        skillsOffered: formData.skillsOffered ? formData.skillsOffered.split(',').map(s => s.trim()) : [],
        schedule: formData.schedule,
        additionalNotes: formData.additionalNotes,
        proofImage: proofUrl,
        userId: session.user.id,
        userName: session.user.name || 'Current User',
        userPicture: session.user.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        userEmail: session.user.email,
        status: 'active'
      };

      // Save to Firebase
      const newPost = await postsDB.createPost('request', postData);
      
      // Update local state
      const localPost = {
        id: newPost.id,
        userName: postData.userName,
        userPicture: postData.userPicture,
        timePosted: 'Just now',
        request: postData.title,
        description: postData.description,
        category: postData.category,
        location: postData.location,
        skillsOffered: postData.skillsOffered.join(', '),
        schedule: postData.schedule,
        additionalNotes: postData.additionalNotes,
        proof: postData.proofImage
      };
      
      setPosts(prev => [localPost, ...prev]);
      
      // Reset form and close modal
      resetForm();
      setShowForm(false);
      
      alert('Your skill request has been posted successfully!');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to post request. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  // Open report modal
  const openReportModal = (post) => {
    setCurrentReportPost(post);
    setReportedUserName(post.userName);
    setShowReportModal(true);
  }

  // Close report modal
  const closeReportModal = () => {
    setShowReportModal(false);
    setReportedUserName('');
    setCurrentReportPost(null);
  }

  // Handle report submission
  const handleReportSubmit = async (reportData) => {
    if (!session || !currentReportPost) return;

    try {
      await postsDB.reportPost('request', currentReportPost.id, {
        ...reportData,
        reporterUserId: session.user.id,
        reporterName: session.user.name,
        reporterEmail: session.user.email,
        reportedUserId: currentReportPost.userId,
        reportedUserName: currentReportPost.userName,
        postTitle: currentReportPost.request,
        postDescription: currentReportPost.description
      });

      alert(`Report submitted for ${reportedUserName}. Thank you for helping keep our community safe.`);
      closeReportModal();
      
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  // Open profile modal
  const openProfileModal = (post) => {
    // For now, use sample profiles - you can implement Firebase user profile fetching
    const sampleProfiles = {
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
        skillOffers: [],
        skillRequests: []
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
        skillOffers: [],
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
        skillRequests: []
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
        skillOffers: [],
        skillRequests: []
      }
    };

    const profile = sampleProfiles[post.userName] || {
      fullName: post.userName,
      email: 'Not provided',
      phone: 'Not provided',
      isVerified: false,
      userPicture: post.userPicture,
      linkedAccounts: [],
      skillOffers: [],
      skillRequests: []
    };
    
    setCurrentProfile(profile);
    setShowProfileModal(true);
  }

  // Close profile modal
  const closeProfileModal = () => {
    setShowProfileModal(false);
    setCurrentProfile({});
  }

  // Cancel form
  const cancelForm = () => {
    resetForm();
    setShowForm(false);
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
    });
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  // Handle contact
  const handleContact = (post) => {
    console.log('Contacting:', post.userName);
    // Implement contact logic here (could open email or messaging)
  }

  // Handle image error
  const handleImageError = (event) => {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+';
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading User Page...</div>
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
          <div className="text-xl">Loading requests...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-5">
      {/* Search Bar */}
      <div className="mb-6 sm:mb-8">
        <SearchBar 
          placeholder="Search for skills, categories, or locations..."
          onSearch={handleSearch}
          className="w-full max-w-7xl mx-auto"
        />
      </div>

      {/* Header with Request Skill Button - FIXED: Only one button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-[#121731] text-xl sm:text-2xl font-semibold">Requests</h1>
        <Button 
          variant="primary"
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto justify-center"
        >
          <Icon name="add" className="mr-2" />
          Request Skill
        </Button>
      </div>

      {/* Posts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              type="request"
              onReport={() => openReportModal(post)}
              onContact={() => handleContact(post)}
              onViewProfile={() => openProfileModal(post)}
              showProofImage={true}
            />
          ))
        ) : (
         
        )}
      </div>

      {/* Request Skill Form Modal - FIXED: Added category options */}
      <Modal
        isOpen={showForm}
        onClose={cancelForm}
        title="Request a Skill"
        size="large"
      >
        <form onSubmit={submitForm} className="space-y-4">
          <FormField
            label="Request *"
            type="text"
            id="request"
            value={formData.request}
            onChange={handleInputChange}
            required
            placeholder="What skill are you looking for?"
          />
          
          <FormField
            label="Description *"
            type="textarea"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Describe what you need in detail..."
            rows={3}
          />
          
          <FormField
            label="Category *"
            type="select"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            options={categoryOptions} // FIXED: Added options prop
          />
          
          <FormField
            label="Location *"
            type="text"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="Where do you need this service?"
          />
          
          <FormField
            label="Skills Offered"
            type="text"
            id="skillsOffered"
            value={formData.skillsOffered}
            onChange={handleInputChange}
            placeholder="What skills can you offer in return? (comma separated)"
          />
          
          <FormField
            label="Schedule *"
            type="text"
            id="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            required
            placeholder="When do you need this done?"
          />
          
          <FormField
            label="Additional Notes"
            type="textarea"
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            placeholder="Any other important information..."
            rows={2}
          />
          
          <div className="flex flex-col">
            <Label htmlFor="proof">Proof (Optional)</Label>
            <FileUpload
              id="proof"
              onChange={handleFileSelect}
              accept="image/*"
              className="mt-2"
            >
              {formData.proof ? formData.proof.name : 'Upload Image'}
            </FileUpload>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
            <Button 
              type="button" 
              variant="secondary"
              onClick={cancelForm}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={uploading}
            >
              {uploading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </Modal>

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
    </div>
  )
}