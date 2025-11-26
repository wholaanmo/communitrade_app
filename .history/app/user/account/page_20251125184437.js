'use client';

import { useState, useEffect } from 'react';
import { useUserRequest } from '@/hooks/useUserRequest';
import { User, SkillOffer, SkillRequest } from '@/types';
import UserProfileCard from '@/components/organisms/UserProfileCard';
import PostCard from '@/components/molecules/PostCard';
import EmptyState from '@/components/molecules/EmptyState';
import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import FormField from '@/components/molecules/FormField';

export default function AccountPage() {
  const { getUsers, getUserById, loading, error } = useUserRequest();
  const [user, setUser] = useState(User);
  const [activeTab, setActiveTab] = useState('offers');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockUser = {
      id: 1,
      firstName: 'Kathryn',
      lastName: 'Bernardo',
      email: 'kathryn.bernardo@example.com',
      username: 'kathryn_b',
      phoneNumber: '+1 (555) 123-4567',
      role: 'user',
      status: 'active',
      avatar: '',
      joinDate: '2024-01-15',
      isVerified: true,
      governmentId: 'XXX-XX-XXXX',
      linkedAccounts: [],
      idPhotoUrl: '',
      hasProfilePicture: true
    };
    
    setUser(mockUser);
  }, []);

  const skillOffers = [
    {
      id: 1,
      title: 'Web Development & UI/UX Design',
      description: 'Experienced full-stack developer offering website development and design services.',
      category: 'Technology',
      location: 'Remote',
      skills: ['React', 'Vue.js', 'UI/UX Design'],
      schedule: 'Weekdays, 9 AM - 6 PM',
      additionalNotes: 'Portfolio available upon request.',
      proof: '',
      timePosted: '2 days ago',
      userName: 'Kathryn Bernardo',
      userPicture: '',
      type: 'offer',
      skillsOffered: ['Web Development', 'UI/UX Design'],
      skillsRequested: ['Digital Marketing', 'Content Writing']
    }
  ];

  const skillRequests = [
    {
      id: 1,
      title: 'Need help with mobile app design',
      description: 'Looking for a designer to help create a mobile app interface for my startup.',
      category: 'Design',
      location: 'Remote',
      skills: ['Figma', 'Mobile Design'],
      schedule: 'Within 3 weeks',
      additionalNotes: 'Experience with Figma preferred.',
      proof: null,
      timePosted: '1 day ago',
      userName: 'Kathryn Bernardo',
      userPicture: '',
      type: 'request',
      request: 'Mobile App Design',
      skillsOffered: ['Backend Development'],
      skillsRequested: ['Mobile Design']
    }
  ];

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    setShowEditModal(false);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleDeletePost = (postId, type) => {
    // Implement delete logic
    console.log(`Delete ${type} with ID:`, postId);
  };

  const renderPosts = () => {
    const posts = activeTab === 'offers' ? skillOffers : skillRequests;
    
    if (posts.length === 0) {
      return (
        <EmptyState
          icon="inbox"
          title={`No ${activeTab === 'offers' ? 'Skill Offers' : 'Skill Requests'}`}
          description={`You haven't posted any ${activeTab === 'offers' ? 'skill offers' : 'skill requests'} yet.`}
          actionText={`Create ${activeTab === 'offers' ? 'Offer' : 'Request'}`}
          onAction={() => console.log('Create new post')}
        />
      );
    }

    return (
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            type={activeTab === 'offers' ? 'offer' : 'request'}
            onEdit={() => handleEditPost(post)}
            onDelete={() => handleDeletePost(post.id, post.type)}
            onContact={(post) => console.log('Contact:', post)}
            onReport={(post) => console.log('Report:', post)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Section */}
      <UserProfileCard
        user={user}
        onEdit={handleEditProfile}
        onUploadPhoto={() => console.log('Upload photo')}
      />

      {/* Posts Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#121731]">My Posts</h2>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'offers' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('offers')}
          >
            My Skill Offers
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('requests')}
          >
            My Skill Requests
          </Button>
        </div>

        {/* Posts Content */}
        {renderPosts()}
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
        size="large"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First Name"
              value={user.firstName}
              onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))}
            />
            <FormField
              label="Last Name"
              value={user.lastName}
              onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
          <FormField
            label="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
          />
          <FormField
            label="Phone Number"
            type="tel"
            value={user.phoneNumber}
            onChange={(e) => setUser(prev => ({ ...prev, phoneNumber: e.target.value }))}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSaveProfile(user)}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}