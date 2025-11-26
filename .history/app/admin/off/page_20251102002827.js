'use client';

import { useState, useEffect } from 'react';

export default function SkillOfferPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportedPosts, setShowReportedPosts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  
  const [formData, setFormData] = useState({
    skills: '',
    description: '',
    category: '',
    location: '',
    skillsRequested: '',
    schedule: '',
    additionalNotes: '',
    proof: null
  });
  
  const [reportData, setReportData] = useState({
    reason: '',
    description: ''
  });
  
  const [reportUser, setReportUser] = useState('');
  const [currentReportPost, setCurrentReportPost] = useState(null);
  const [currentProfile, setCurrentProfile] = useState({});
  const [postToDelete, setPostToDelete] = useState(null);
  const [postToRemove, setPostToRemove] = useState(null);

  const reportReasons = [
    { value: 'fraud', label: 'Fraud/Dishonesty' },
    { value: 'harassment', label: 'Harassment/Abuse' },
    { value: 'safety', label: 'Safety Concerns' },
    { value: 'spam', label: 'Spam/Misuse' },
    { value: 'other', label: 'Other' }
  ];

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
          proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
        }
      ],
      skillOffers: [
        {
          id: 201,
          skills: 'Web Development & UI/UX Design',
          description: 'Experienced full-stack developer offering website development and design services.',
          category: 'Technology',
          location: 'Remote',
          skillsRequested: 'Digital marketing, Content writing',
          schedule: 'Weekdays, 9 AM - 6 PM',
          additionalNotes: 'Portfolio available upon request.',
          timePosted: '1 day ago',
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
      skillOffers: []
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
      skillOffers: [
        {
          id: 202,
          skills: 'Photography Lessons',
          description: 'Professional photographer offering basic photography techniques and camera operation lessons.',
          category: 'Education',
          location: 'Chicago, IL',
          skillsRequested: 'Video editing',
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
      skillOffers: []
    }
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: 'Alex Johnson',
      userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '2 hours ago',
      skills: 'Web Development & UI/UX Design',
      description: 'Experienced full-stack developer offering website development and design services.',
      category: 'Technology',
      location: 'Remote',
      skillsRequested: 'Digital marketing, Content writing',
      schedule: 'Within 2 weeks',
      additionalNotes: 'Portfolio available upon request.'
    },
    {
      id: 2,
      userName: 'Maria Garcia',
      userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '5 hours ago',
      skills: 'Spanish & French Tutoring',
      description: 'Native Spanish speaker with fluent French offering language tutoring for all levels.',
      category: 'Education',
      location: 'New York, NY',
      skillsRequested: 'English proofreading',
      schedule: 'Weekends preferred',
      additionalNotes: 'Materials provided.'
    },
    {
      id: 3,
      userName: 'James Wilson',
      userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '1 day ago',
      skills: 'Content Writing & SEO',
      description: 'Professional writer offering blog content creation and SEO optimization services.',
      category: 'Writing',
      location: 'Remote',
      skillsRequested: 'Social media management',
      schedule: '2-3 articles per week',
      additionalNotes: 'Tech background preferred but not required.'
    },
    {
      id: 4,
      userName: 'Sarah Chen',
      userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '2 days ago',
      skills: 'Social Media Marketing',
      description: 'Digital marketing specialist offering social media campaign creation and management.',
      category: 'Marketing',
      location: 'Los Angeles, CA',
      skillsRequested: 'Graphic design',
      schedule: 'Flexible, ongoing',
      additionalNotes: 'Experience with Instagram and TikTok preferred.'
    }
  ]);

  const [reportedPosts, setReportedPosts] = useState([
    {
      id: 5,
      userName: 'John Doe',
      userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '3 days ago',
      skills: 'Illegal Software Services',
      description: 'Offering help with cracking software licenses.',
      category: 'Technology',
      location: 'Remote',
      skillsRequested: 'Graphic design services',
      schedule: 'ASAP',
      additionalNotes: 'Must be discreet about this.',
      reportReason: 'Offering illegal services - software piracy'
    },
    {
      id: 6,
      userName: 'Jane Smith',
      userPicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: '1 day ago',
      skills: 'Fake Certificate Creation',
      description: 'Offering fake educational certificates for job applications.',
      category: 'Education',
      location: 'Remote',
      skillsRequested: 'Data entry work',
      schedule: 'Within 1 week',
      additionalNotes: 'Need to look authentic.',
      reportReason: 'Fraudulent activity - creating fake documents'
    }
  ]);

  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.skills.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      post.skillsRequested.toLowerCase().includes(query)
    );
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, proof: file }));
    }
  };

  const openDeleteModal = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      setPosts(prev => prev.filter(p => p.id !== postToDelete.id));
      setReportedPosts(prev => prev.filter(p => p.id !== postToDelete.id));
      console.log('Post deleted:', postToDelete);
    }
    closeDeleteModal();
  };

  const openRemoveModal = (post) => {
    setPostToRemove(post);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
    setPostToRemove(null);
  };

  const confirmRemove = () => {
    if (postToRemove) {
      setReportedPosts(prev => prev.filter(p => p.id !== postToRemove.id));
      setPosts(prev => prev.filter(p => p.id !== postToRemove.id));
      console.log('Post removed:', postToRemove);
    }
    closeRemoveModal();
  };

  const keepPost = (post) => {
    setReportedPosts(prev => prev.filter(p => p.id !== post.id));
    console.log('Post kept:', post);
  };

  const openProfileModal = (post) => {
    const profile = userProfiles[post.userName] || {
      fullName: post.userName,
      email: 'Not provided',
      phone: 'Not provided',
      isVerified: false,
      userPicture: post.userPicture,
      linkedAccounts: [],
      skillOffers: [],
      skillOffers: []
    };
    setCurrentProfile(profile);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setCurrentProfile({});
  };

  const submitReport = (e) => {
    e.preventDefault();
    console.log('Report submitted:', {
      post: currentReportPost,
      reason: reportData.reason,
      description: reportData.description
    });
    
    alert(`Report submitted for ${reportUser}. Thank you for helping keep our community safe.`);
    closeReportModal();
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportData({ reason: '', description: '' });
    setCurrentReportPost(null);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const newPost = {
      id: posts.length + 1,
      userName: 'Current User',
      userPicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      timePosted: 'Just now',
      skills: formData.skills,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      skillsRequested: formData.skillsRequested,
      schedule: formData.schedule,
      additionalNotes: formData.additionalNotes
    };
    
    setPosts(prev => [newPost, ...prev]);
    resetForm();
    setShowForm(false);
  };

  const cancelForm = () => {
    resetForm();
    setShowForm(false);
  };

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
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateReportData = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="skill-offer-platform max-w-[1200px] mx-auto p-5">
      {/* Search Bar and Reported Posts Button */}
      <div className="search-report-container flex items-center gap-5 mb-8">
        <div className="search-bar flex items-center bg-white rounded-lg p-3 shadow-sm flex-1">
          <span className="material-icons text-[#728a9c] mr-3">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for skills, categories, or locations..."
            className="flex-1 border-none outline-none text-base bg-transparent"
          />
        </div>
        <button 
          className={`reported-posts-btn flex items-center text-white px-5 py-3 rounded-lg font-medium transition-colors duration-300 whitespace-nowrap ${
            showReportedPosts ? 'bg-[#728a9c] hover:bg-[#5a7284] offer-posts-btn' : 'bg-[#e74c3c] hover:bg-[#c0392b]'
          }`}
          onClick={() => setShowReportedPosts(!showReportedPosts)}
        >
          {!showReportedPosts && <span className="material-icons mr-2">flag</span>}
          {showReportedPosts ? 'Offer Posts' : 'Reported Posts'}
        </button>
      </div>

      {/* Header with Offer Count */}
      <div className="header-container flex justify-between items-center mb-8">
        <h1 className="offers-header text-[#121731] text-2xl font-semibold">
          {showReportedPosts ? 'Reported Posts' : 'Offers'}
        </h1>
        <div className="offer-count bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 font-medium">
          {showReportedPosts ? 'Total Reported:' : 'Total Offers:'} <span className="font-bold text-[#121731]">
            {showReportedPosts ? reportedPosts.length : filteredPosts.length}
          </span>
        </div>
      </div>

      {/* Regular Posts Container */}
      {!showReportedPosts && (
        <div className="posts-container grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {/* User Info */}
              <div className="user-info flex items-center p-5 border-b border-gray-200">
                <img src={post.userPicture} alt={post.userName} className="user-picture w-12 h-12 rounded-full object-cover mr-4"/>
                <div className="user-details flex-1">
                  <h3 className="user-name m-0 mb-1 text-lg text-[#121731]">{post.userName}</h3>
                  <span className="post-time text-[#728a9c] text-sm">{post.timePosted}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="post-content p-5">
                <h2 className="offer-title m-0 mb-4 text-xl text-[#121731]">{post.skills}</h2>
                <p className="description m-0 mb-5 text-gray-700 leading-relaxed">{post.description}</p>
                
                <div className="details-grid grid grid-cols-2 gap-4 mb-5">
                  <div className="detail-item flex flex-col">
                    <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
                    <span className="detail-value text-gray-700">{post.category}</span>
                  </div>
                  <div className="detail-item flex flex-col">
                    <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
                    <span className="detail-value text-gray-700">{post.location}</span>
                  </div>
                  <div className="detail-item flex flex-col">
                    <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Requested:</span>
                    <span className="detail-value text-gray-700">{post.skillsRequested}</span>
                  </div>
                  <div className="detail-item flex flex-col">
                    <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
                    <span className="detail-value text-gray-700">{post.schedule}</span>
                  </div>
                </div>
                
                {post.additionalNotes && (
                  <div className="additional-notes mt-4">
                    <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
                    <p className="detail-value text-gray-700 m-0 mt-1">{post.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons flex p-4 border-t border-gray-200 gap-3">
                <button 
                  className="btn delete-btn flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => openDeleteModal(post)}
                >
                  <span className="material-icons text-lg mr-1">delete</span>
                  Delete
                </button>
                <button className="btn contact-btn flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white">
                  <span className="material-icons text-lg mr-1">message</span>
                  Contact
                </button>
                <button 
                  className="btn profile-btn flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 text-[#728a9c] border border-[#728a9c] bg-white hover:bg-[#728a9c] hover:text-white"
                  onClick={() => openProfileModal(post)}
                >
                  <span className="material-icons text-lg mr-1">account_circle</span>
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reported Posts Container */}
      {showReportedPosts && (
        <div className="reported-posts-container">
          <div className="posts-container grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportedPosts.map(post => (
              <div key={post.id} className="post-card reported-post bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4 border-red-600">
                {/* User Info */}
                <div className="user-info flex items-center p-5 border-b border-gray-200">
                  <img src={post.userPicture} alt={post.userName} className="user-picture w-12 h-12 rounded-full object-cover mr-4"/>
                  <div className="user-details flex-1">
                    <h3 className="user-name m-0 mb-1 text-lg text-[#121731]">{post.userName}</h3>
                    <span className="post-time text-[#728a9c] text-sm">{post.timePosted}</span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="post-content p-5">
                  <h2 className="offer-title m-0 mb-4 text-xl text-[#121731]">{post.skills}</h2>
                  <p className="description m-0 mb-5 text-gray-700 leading-relaxed">{post.description}</p>
                  
                  <div className="details-grid grid grid-cols-2 gap-4 mb-5">
                    <div className="detail-item flex flex-col">
                      <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
                      <span className="detail-value text-gray-700">{post.category}</span>
                    </div>
                    <div className="detail-item flex flex-col">
                      <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
                      <span className="detail-value text-gray-700">{post.location}</span>
                    </div>
                    <div className="detail-item flex flex-col">
                      <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Requested:</span>
                      <span className="detail-value text-gray-700">{post.skillsRequested}</span>
                    </div>
                    <div className="detail-item flex flex-col">
                      <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
                      <span className="detail-value text-gray-700">{post.schedule}</span>
                    </div>
                  </div>
                  
                  {post.additionalNotes && (
                    <div className="additional-notes mt-4">
                      <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
                      <p className="detail-value text-gray-700 m-0 mt-1">{post.additionalNotes}</p>
                    </div>
                  )}

                  {/* Reason for Report */}
                  <div className="report-reason mt-5 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800">
                    <span className="detail-label font-bold text-yellow-800">Reason for Report:</span>
                    <p className="detail-value m-0 mt-1">{post.reportReason}</p>
                  </div>
                </div>

                {/* Action Buttons for Reported Posts */}
                <div className="action-buttons flex p-4 border-t border-gray-200 gap-3">
                  <button 
                    className="btn keep-btn flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 text-green-600 border border-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => keepPost(post)}
                  >
                    <span className="material-icons text-lg mr-1">check_circle</span>
                    Keep
                  </button>
                  <button 
                    className="btn remove-btn flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => openRemoveModal(post)}
                  >
                    <span className="material-icons text-lg mr-1">delete_forever</span>
                    Remove
                  </button>
                  <button 
                    className="btn profile-btn flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 text-[#728a9c] border border-[#728a9c] bg-white hover:bg-[#728a9c] hover:text-white"
                    onClick={() => openProfileModal(post)}
                  >
                    <span className="material-icons text-lg mr-1">account_circle</span>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
        className="modal-overlay delete-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center p-5 z-[2000]" 
        onClick={closeDeleteModal}
      >
      
          <div className="modal-content delete-modal bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="delete-header mb-6 text-center">
              <h2 className="m-0 text-[#121731] text-2xl">Delete Post</h2>
            </div>
            
            <div className="delete-content mb-8 text-center">
              <div className="delete-warning-icon mb-4">
                <span className="material-icons text-red-600 text-5xl">warning</span>
              </div>
              <p className="delete-warning text-xl font-semibold text-gray-900 mb-4">
                Are you sure you want to delete this post?
              </p>
              <p className="delete-info text-[#728a9c] leading-relaxed mb-0">
                This action cannot be undone. The post will be permanently removed.
              </p>
            </div>
            
            <div className="delete-actions flex gap-4 justify-center">
  <button 
    className="btn confirm-delete-btn px-4 py-2 bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-700" 
    onClick={confirmDelete}
  >
    Confirm Delete
  </button>
  <button 
    className="btn cancel-btn px-4 py-2 border border-[#728a9c] text-[#728a9c] rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#b7c8d4] hover:text-white" 
    onClick={closeDeleteModal}
  >
    Cancel
  </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div 
        className="modal-overlay remove-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center p-5 z-[2000]" 
        onClick={closeRemoveModal}
      >      
          <div className="modal-content remove-modal bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="remove-header mb-6 text-center">
              <h2 className="m-0 text-[#121731] text-2xl">Remove Reported Post</h2>
            </div>
            
            <div className="remove-content mb-8 text-center">
              <div className="remove-warning-icon mb-4">
                <span className="material-icons text-red-600 text-5xl">warning</span>
              </div>
              <p className="remove-warning text-xl font-semibold text-gray-900 mb-4">
                Are you sure you want to remove this reported post?
              </p>
              <p className="remove-info text-[#728a9c] leading-relaxed mb-0">
                This action cannot be undone. The post will be permanently removed from the platform.
              </p>
            </div>
            
            <div className="remove-actions flex gap-4 justify-center">
            <button 
  className="btn confirm-remove-btn px-4 py-2 bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-700" 
  onClick={confirmRemove}
>
  Confirm Remove
</button>
<button 
  className="btn cancel-btn px-4 py-2 border border-[#728a9c] text-[#728a9c] rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#b7c8d4] hover:text-white" 
  onClick={closeRemoveModal}
>
  Cancel
</button>

            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div 
        className="modal-overlay profile-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center p-5 z-[1000]" 
        onClick={closeProfileModal}
      >
      
          <div className="modal-content profile-modal bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="profile-header flex items-center mb-8 pb-5 border-b border-gray-300">
              <img src={currentProfile.userPicture} alt={currentProfile.fullName} className="profile-picture w-20 h-20 rounded-full object-cover mr-5"/>
              <div className="profile-info">
                <div className="name-verified flex items-center gap-3 mb-2">
                  <h2 className="m-0 text-[#121731] text-left text-2xl font-semibold">{currentProfile.fullName}</h2>
                  {currentProfile.isVerified && (
                    <span className="verified-badge flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      <span className="material-icons text-base mr-0.5">verified</span>
                      Verified
                    </span>
                  )}
                </div>
                <p className="profile-email m-1 text-[#728a9c]">{currentProfile.email}</p>
                <p className="profile-phone m-1 text-[#728a9c]">{currentProfile.phone}</p>
              </div>
            </div>

            <div className="profile-sections flex flex-col gap-6">
              {/* Linked Accounts Section */}
              <div className="profile-section">
                <h3 className="m-0 mb-4 text-[#121731] text-xl">Linked Accounts</h3>
                <div className="linked-accounts flex flex-col gap-3">
                  {currentProfile.linkedAccounts?.map(account => (
                    <a 
                      key={account.platform}
                      href={account.url} 
                      target="_blank" 
                      className="account-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-inherit transition-colors duration-300 hover:bg-gray-200"
                    >
                      <span className="material-icons account-icon text-[#121731] text-xl">{account.icon}</span>
                      <span className="account-platform flex-1 font-medium">{account.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Skill Offer Posts Section */}
              <div className="profile-section">
                <h3 className="m-0 mb-4 text-[#121731] text-xl">Skill Offer Posts</h3>
                <div className="posts-list flex flex-col gap-5">
                  {currentProfile.skillOffers?.map(offer => (
                    <div key={offer.id} className="profile-post-card bg-gray-50 rounded-lg p-5 border border-gray-300">
                      <div className="post-header flex justify-between items-start mb-3">
                        <h4 className="m-0 text-[#121731] flex-1">{offer.skills}</h4>
                        <span className="post-time text-[#728a9c] text-sm">{offer.timePosted}</span>
                      </div>
                      <p className="post-description m-0 mb-4 text-gray-700 leading-relaxed">{offer.description}</p>
                      <div className="post-details grid grid-cols-2 gap-3 mb-4">
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
                          <span className="detail-value text-gray-700">{offer.category}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
                          <span className="detail-value text-gray-700">{offer.location}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Requested:</span>
                          <span className="detail-value text-gray-700">{offer.skillsRequested}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
                          <span className="detail-value text-gray-700">{offer.schedule}</span>
                        </div>
                      </div>
                      {offer.additionalNotes && (
                        <div className="additional-notes mb-4">
                          <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
                          <p className="detail-value text-gray-700 m-0 mt-1">{offer.additionalNotes}</p>
                        </div>
                      )}
                      {offer.proof && (
                        <div className="proof-image my-4">
                          <img src={offer.proof} alt="Proof" className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300"/>
                        </div>
                      )}
                      <div className="post-actions flex gap-3 mt-4">
                        <button className="btn delete-btn flex items-center px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white text-sm">
                          <span className="material-icons text-base mr-1">delete</span>
                          Delete
                        </button>
                        <button className="btn contact-btn flex items-center px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white text-sm">
                          <span className="material-icons text-base mr-1">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Offer Posts Section */}
              <div className="profile-section">
                <h3 className="m-0 mb-4 text-[#121731] text-xl">Skill Offer Posts</h3>
                <div className="posts-list flex flex-col gap-5">
                  {currentProfile.skillOffers?.map(offer => (
                    <div key={offer.id} className="profile-post-card bg-gray-50 rounded-lg p-5 border border-gray-300">
                      <div className="post-header flex justify-between items-start mb-3">
                        <h4 className="m-0 text-[#121731] flex-1">{offer.skills}</h4>
                        <span className="post-time text-[#728a9c] text-sm">{offer.timePosted}</span>
                      </div>
                      <p className="post-description m-0 mb-4 text-gray-700 leading-relaxed">{offer.description}</p>
                      <div className="post-details grid grid-cols-2 gap-3 mb-4">
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
                          <span className="detail-value text-gray-700">{offer.category}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
                          <span className="detail-value text-gray-700">{offer.location}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Requested:</span>
                          <span className="detail-value text-gray-700">{offer.skillsRequested}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
                          <span className="detail-value text-gray-700">{offer.schedule}</span>
                        </div>
                      </div>
                      {offer.additionalNotes && (
                        <div className="additional-notes mb-4">
                          <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
                          <p className="detail-value text-gray-700 m-0 mt-1">{offer.additionalNotes}</p>
                        </div>
                      )}
                      {offer.proof && (
                        <div className="proof-image my-4">
                          <img src={offer.proof} alt="Proof" className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300"/>
                        </div>
                      )}
                      <div className="post-actions flex gap-3 mt-4">
                        <button className="btn delete-btn flex items-center px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white text-sm">
                          <span className="material-icons text-base mr-1">delete</span>
                          Delete
                        </button>
                        <button className="btn contact-btn flex items-center px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-[#121731] border border-[#121731] hover:bg-[#121731] hover:text-white text-sm">
                          <span className="material-icons text-base mr-1">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-actions flex justify-end mt-8 pt-5 border-t border-gray-300">
            <button 
  className="btn close-btn px-5 py-2 bg-[#121731] text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#728a9c]" 
  onClick={closeProfileModal}
>
  Close
</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}