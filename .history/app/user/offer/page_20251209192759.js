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
import { ref, get, update, serverTimestamp } from "firebase/database"
import { db } from '@/lib/firebase'

const OfferCardWithButtons = ({ 
  post, 
  isOwnPost, 
  onReport, 
  onContact, 
  onViewProfile, 
  onDelete, 
  onEdit,
  ...props 
}) => {

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
      {...props}

      customActions={true}
      actions={customActions}
    />
  );
}

export default function SkillOfferPlatform() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  
  const [showForm, setShowForm] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

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

  const [editingPostId, setEditingPostId] = useState(null)

  const [reportedUserName, setReportedUserName] = useState('')
  const [currentReportPost, setCurrentReportPost] = useState(null)
  const [currentProfile, setCurrentProfile] = useState({})
  
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const [currentUserId, setCurrentUserId] = useState(null)

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

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    let userId = null;
    if (session?.user?.email) {

      userId = session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
      console.log('Current userId from email:', userId);
      setCurrentUserId(userId);
    }

    if (!userId) {
      console.error('Cannot determine user ID from session email');
      return;
    }

    const loadPosts = async () => {
      setLoading(true);
      try {
        console.log('Loading ALL offer posts (no filter)');
 
        const fetchedPosts = await postsDB.getPosts('offers', {
          searchQuery: searchQuery || ''
        });
        
        console.log('Number of fetched offer posts:', fetchedPosts.length);

        const transformedPosts = fetchedPosts.map(post => ({
          id: post.id,
          userName: post.userName || 'Unknown User',
          userPicture: post.userPicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
          timePosted: formatTimeAgo(post.createdAt || post.timestamp),
          skills: post.title || '',
          description: post.description || '',
          category: post.category || '',
          location: post.location || '',
          skillsRequested: Array.isArray(post.skillsRequested) ? post.skillsRequested.join(', ') : post.skillsRequested || '',
          schedule: post.schedule || '',
          additionalNotes: post.additionalNotes || '',
          proof: post.proofImage || null,
          userId: post.userId,
          status: post.status || 'active'
        }));
        
        console.log('Transformed offer posts:', transformedPosts);
        setPosts(transformedPosts);
        
      } catch (error) {
        console.error('Error loading offer posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    const unsubscribe = postsDB.listenToPosts('offers', {
      searchQuery: searchQuery || ''
    }, (fetchedPosts) => {
      console.log('Real-time update received for offers:', fetchedPosts.length, 'posts');
      
      const transformedPosts = fetchedPosts.map(post => ({
        id: post.id,
        userName: post.userName || 'Unknown User',
        userPicture: post.userPicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        timePosted: formatTimeAgo(post.createdAt || post.timestamp),
        skills: post.title || '',
        description: post.description || '',
        category: post.category || '',
        location: post.location || '',
        skillsRequested: Array.isArray(post.skillsRequested) ? post.skillsRequested.join(', ') : post.skillsRequested || '',
        schedule: post.schedule || '',
        additionalNotes: post.additionalNotes || '',
        proof: post.proofImage || null,
        userId: post.userId,
        status: post.status || 'active'
      }));
      
      setPosts(transformedPosts);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [session, searchQuery, status, router]);

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    const now = new Date();
    let postDate;
    
    if (typeof timestamp === 'object' && timestamp.seconds) {

      postDate = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === 'string') {

      postDate = new Date(timestamp);
    } else if (typeof timestamp === 'number') {

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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {

      if (file.size > 500 * 1024) {
        alert('File size should be less than 500KB for Base64 encoding');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }
      
      setFormData(prev => ({ ...prev, proof: file }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('Please log in to submit an offer');
      return;
    }
  
    setUploading(true);
    
    try {
      let proofBase64 = null;
      if (formData.proof) {
        proofBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.proof);
        });

        if (proofBase64.length > 500000) {
          alert('Image is too large. Please use an image under 500KB.');
          setUploading(false);
          return;
        }
      }

      let userId = null;
      let userName = 'Current User';
      let userEmail = 'No email';
      let userPicture = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80';
  
      if (session?.user) {
        userId = session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
        userName = session.user.name || userName;
        userEmail = session.user.email || userEmail;
        userPicture = session.user.image || userPicture;
      }

      const postData = {
        title: formData.skills || '',
        description: formData.description || '',
        category: formData.category || '',
        location: formData.location || '',
        skillsRequested: formData.skillsRequested 
          ? formData.skillsRequested.split(',').map(s => s.trim()).filter(s => s)
          : [],
        schedule: formData.schedule || '',
        additionalNotes: formData.additionalNotes || '',
        proofImage: proofBase64,
        userId: userId,
        userName: userName,
        userPicture: userPicture,
        userEmail: userEmail,
        status: 'active',
        timestamp: new Date().toISOString()
      };

      if (!postData.title.trim() || 
          !postData.description.trim() || 
          !postData.category.trim() || 
          !postData.location.trim() || 
          !postData.schedule.trim()) {
        alert('Please fill in all required fields (*)');
        setUploading(false);
        return;
      }
  
      let updatedPosts = [...posts];
      let newPost = null;
      
      if (editingPostId) {

        await postsDB.updatePost('offers', editingPostId, postData);

        try {
          const userRef = ref(db, `users/${userId}`);
          const userSnapshot = await get(userRef);
          
          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const updatedSkillOffers = userData.skillOffers?.map(offer => 
              offer.id === editingPostId 
                ? {
                    ...offer,
                    skills: postData.title,
                    description: postData.description,
                    category: postData.category,
                    location: postData.location,
                    skillsRequested: postData.skillsRequested.join(', '),
                    schedule: postData.schedule,
                    additionalNotes: postData.additionalNotes,
                    proof: proofBase64 || offer.proof,
                    timePosted: 'Updated just now'
                  }
                : offer
            ) || [];
            
            await update(userRef, {
              skillOffers: updatedSkillOffers,
              updatedAt: serverTimestamp()
            });
            console.log('Offer updated in user profile');
          }
        } catch (error) {
          console.error('Error updating user profile on edit:', error);
        }

        updatedPosts = posts.map(post => 
          post.id === editingPostId 
            ? { 
                ...post, 
                ...postData,
                timePosted: 'Updated just now',
                skills: postData.title,
                description: postData.description,
                category: postData.category,
                location: postData.location,
                skillsRequested: postData.skillsRequested.join(', '),
                schedule: postData.schedule,
                additionalNotes: postData.additionalNotes,
                proof: proofBase64 || post.proof
              }
            : post
        );
        
        alert('Post updated successfully!');
        setEditingPostId(null);
      } else {

        newPost = await postsDB.createPost('offers', postData);

        try {
          const userRef = ref(db, `users/${userId}`);

          const userSnapshot = await get(userRef);
          const currentUserData = userSnapshot.exists() ? userSnapshot.val() : { skillOffers: [] };
          
          const userOfferData = {
            id: newPost.id,
            skills: postData.title,
            description: postData.description,
            category: postData.category,
            location: postData.location,
            skillsRequested: postData.skillsRequested.join(', '),
            schedule: postData.schedule,
            additionalNotes: postData.additionalNotes,
            proof: proofBase64,
            timePosted: 'Just now',
            postType: 'offer'
          };

          const updatedSkillOffers = [
            ...(currentUserData.skillOffers || []),
            userOfferData
          ];

          await update(userRef, {
            skillOffers: updatedSkillOffers,
            updatedAt: serverTimestamp()
          });
          
          console.log('Offer added to user profile');
          
        } catch (error) {
          console.error('Error updating user profile with offer:', error);

        }
        
        const localPost = {
          id: newPost.id,
          userName: postData.userName,
          userPicture: postData.userPicture,
          timePosted: 'Just now',
          skills: postData.title,
          description: postData.description,
          category: postData.category,
          location: postData.location,
          skillsRequested: postData.skillsRequested.join(', '),
          schedule: postData.schedule,
          additionalNotes: postData.additionalNotes,
          proof: proofBase64,
          userId: userId
        };
        
        updatedPosts = [localPost, ...posts];
        alert('Offer posted successfully!');
      }
      
      setPosts(updatedPosts);
      resetForm();
      setShowForm(false);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Failed to ${editingPostId ? 'update' : 'post'}: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postsDB.deletePost('offers', post.id);

      try {
        const userId = session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
        const userRef = ref(db, `users/${userId}`);
        const userSnapshot = await get(userRef);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const updatedSkillOffers = userData.skillOffers?.filter(
            offer => offer.id !== post.id
          ) || [];
          
          await update(userRef, {
            skillOffers: updatedSkillOffers,
            updatedAt: serverTimestamp()
          });
          console.log('Offer removed from user profile');
        }
      } catch (userError) {
        console.error('Error removing from user profile:', userError);
      }

      setPosts(prev => prev.filter(p => p.id !== post.id));
      
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const handleEdit = (post) => {
    setFormData({
      skills: post.skills || '',
      description: post.description || '',
      category: post.category || '',
      location: post.location || '',
      skillsRequested: post.skillsRequested || '',
      schedule: post.schedule || '',
      additionalNotes: post.additionalNotes || '',
      proof: null 
    });

    setEditingPostId(post.id);

    setShowForm(true);
  };

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
      const userId = session.user?.id || session.user?.uid || session.userId || 'anonymous';
      const userName = session.user?.name || session.user?.username || 'Anonymous';
      const userEmail = session.user?.email || 'No email';
      
      await postsDB.reportPost('offers', currentReportPost.id, {
        ...reportData,
        reporterUserId: userId,
        reporterName: userName,
        reporterEmail: userEmail,
        reportedUserId: currentReportPost.userId || 'unknown',
        reportedUserName: currentReportPost.userName,
        postTitle: currentReportPost.skills,
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
      skills: '',
      description: '',
      category: '',
      location: '',
      skillsRequested: '',
      schedule: '',
      additionalNotes: '',
      proof: null
    });
    setEditingPostId(null);
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
    try {
      console.log('Contacting:', post.userName);
      
      // Navigate to message page with the user's info
      router.push(`/user/message?userId=${encodeURIComponent(post.userId)}&userName=${encodeURIComponent(post.userName)}&userEmail=${encodeURIComponent(post.userEmail || '')}&userPicture=${encodeURIComponent(post.userPicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')}`);
    } catch (error) {
      console.error('Error contacting user:', error);
      alert('Failed to start conversation. Please try again.');
    }
  };

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
          <div className="text-xl">Loading offers...</div>
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

      {/* Header with Offer Skill Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-[#121731] text-xl sm:text-2xl font-semibold">Offers</h1>
        <Button 
          variant="primary"
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto justify-center"
        >
          <Icon name="add" className="mr-2" />
          Offer Skill
        </Button>
      </div>

      {/* Posts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            // Determine if this is the current user's post
            const isOwnPost = post.userId === currentUserId;
            
            return (
              <OfferCardWithButtons
                key={post.id}
                post={post}
                isOwnPost={isOwnPost}
                type="offer"
                onReport={openReportModal}
                onContact={handleContact}
                onViewProfile={openProfileModal}
                onDelete={handleDelete}
                onEdit={handleEdit}
                showProofImage={true}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No posts found.
          </p>
        )}
      </div>

      {/* Offer Skill Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={cancelForm}
        title={editingPostId ? "Edit Offer" : "Offer a Skill"}
        size="large"
      >
        <form onSubmit={submitForm} className="space-y-4">
          <FormField
            label="Skills *"
            type="text"
            id="skills"
            value={formData.skills}
            onChange={handleInputChange}
            required
            placeholder="What skills are you offering?"
          />
          
          <FormField
            label="Description *"
            type="textarea"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Describe what you can offer in detail..."
            rows={3}
          />
          
          <FormField
            label="Category *"
            type="select"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            options={categoryOptions}
          />
          
          <FormField
            label="Location *"
            type="text"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="Where can you provide this service?"
          />
          
          <FormField
            label="Skills Requested"
            type="text"
            id="skillsRequested"
            value={formData.skillsRequested}
            onChange={handleInputChange}
            placeholder="What skills are you looking for in return?"
          />
          
          <FormField
            label="Schedule *"
            type="text"
            id="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            required
            placeholder="When are you available?"
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
            <Label htmlFor="proof">
              Proof (Optional)
            </Label>
            <FileUpload
              id="proof"
              onChange={handleFileSelect}
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="mt-2"
            >
              {formData.proof ? formData.proof.name : 'Upload Image'}
            </FileUpload>
            {formData.proof && (
              <small className="text-gray-500 mt-1 block">
                Selected: {formData.proof.name} ({(formData.proof.size / 1024).toFixed(1)} KB)
              </small>
            )}
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
              {uploading ? (
                editingPostId ? 'Updating...' : 'Submitting...'
              ) : (
                editingPostId ? 'Update Offer' : 'Submit Offer'
              )}
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