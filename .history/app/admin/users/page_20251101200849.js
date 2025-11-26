'use client';

import { useState, useEffect } from 'react';

export default function UsersManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});
  const [selectedDuration, setSelectedDuration] = useState('7');
  const [postToDelete, setPostToDelete] = useState(null);
  const [postType, setPostType] = useState('');
  
  const allUsers = [
    {
      id: 1,
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      userPicture: '/default-avatar.jpg',
      isVerified: true,
      isDeactivated: false,
      linkedAccounts: [
        { platform: 'GitHub', icon: 'code', url: 'https://github.com/johnsmith' },
        { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/johnsmith' }
      ],
      skillOffers: [
        {
          id: 1,
          skills: 'Web Development',
          timePosted: '2 days ago',
          description: 'Full-stack web development services',
          category: 'Technology',
          location: 'Remote',
          skillsRequested: 'JavaScript, Vue.js, Node.js',
          schedule: 'Flexible'
        }
      ],
      skillRequests: [
        {
          id: 1,
          request: 'Graphic Design Help',
          timePosted: '1 week ago',
          description: 'Need logo design for my startup',
          category: 'Design',
          location: 'New York',
          skillsOffered: 'Web Development in exchange',
          schedule: 'Weekends'
        }
      ]
    },
    {
      id: 2,
      fullName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      userPicture: '/default-avatar2.jpg',
      isVerified: false,
      isDeactivated: false,
      linkedAccounts: [],
      skillOffers: [],
      skillRequests: []
    },
    {
      id: 3,
      fullName: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 456-7890',
      userPicture: '/default-avatar3.jpg',
      isVerified: true,
      isDeactivated: false,
      linkedAccounts: [
        { platform: 'Twitter', icon: 'link', url: 'https://twitter.com/michaelchen' }
      ],
      skillOffers: [
        {
          id: 1,
          skills: 'UI/UX Design',
          timePosted: '3 days ago',
          description: 'Professional UI/UX design services',
          category: 'Design',
          location: 'San Francisco',
          skillsRequested: 'Figma, Adobe XD',
          schedule: 'Weekdays'
        }
      ],
      skillRequests: []
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '+1 (555) 234-5678',
      userPicture: '/default-avatar4.jpg',
      isVerified: false,
      isDeactivated: false,
      linkedAccounts: [],
      skillOffers: [],
      skillRequests: [
        {
          id: 1,
          request: 'Marketing Strategy',
          timePosted: '5 days ago',
          description: 'Need help with digital marketing strategy',
          category: 'Marketing',
          location: 'Chicago',
          skillsOffered: 'Content Writing',
          schedule: 'Flexible'
        }
      ]
    },
    {
      id: 5,
      fullName: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1 (555) 345-6789',
      userPicture: '/default-avatar5.jpg',
      isVerified: true,
      isDeactivated: false,
      linkedAccounts: [
        { platform: 'GitHub', icon: 'code', url: 'https://github.com/davidbrown' },
        { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/davidbrown' },
        { platform: 'Portfolio', icon: 'person', url: 'https://davidbrown.dev' }
      ],
      skillOffers: [
        {
          id: 1,
          skills: 'Mobile App Development',
          timePosted: '1 day ago',
          description: 'iOS and Android app development',
          category: 'Technology',
          location: 'Remote',
          skillsRequested: 'React Native, Swift',
          schedule: 'Flexible'
        }
      ],
      skillRequests: []
    },
    {
      id: 6,
      fullName: 'Lisa Garcia',
      email: 'lisa.garcia@example.com',
      phone: '+1 (555) 567-8901',
      userPicture: '/default-avatar6.jpg',
      isVerified: false,
      isDeactivated: false,
      linkedAccounts: [],
      skillOffers: [],
      skillRequests: []
    }
  ];

  useEffect(() => {
    setFilteredUsers([...allUsers]);
  }, []);

  const filterUsers = () => {
    if (!searchQuery) {
      setFilteredUsers([...allUsers]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = allUsers.filter(user => 
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query)
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers();
  }, [searchQuery]);

  const openProfileModal = (user) => {
    setCurrentProfile(user);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setCurrentProfile({});
  };

  const openDeactivateModal = () => {
    if (currentProfile.isDeactivated) {
      reactivateAccount();
    } else {
      setShowDeactivateModal(true);
    }
  };

  const closeDeactivateModal = () => {
    setShowDeactivateModal(false);
    setSelectedDuration('7');
  };

  const confirmDeactivation = () => {
    // Find the user in allUsers and update their deactivation status
    const userIndex = allUsers.findIndex(u => u.id === currentProfile.id);
    if (userIndex !== -1) {
      allUsers[userIndex].isDeactivated = true;
      allUsers[userIndex].deactivationDuration = selectedDuration;
      setCurrentProfile({
        ...currentProfile,
        isDeactivated: true,
        deactivationDuration: selectedDuration
      });
      
      // Update filteredUsers to reflect the change
      const filteredIndex = filteredUsers.findIndex(u => u.id === currentProfile.id);
      if (filteredIndex !== -1) {
        const updatedFilteredUsers = [...filteredUsers];
        updatedFilteredUsers[filteredIndex].isDeactivated = true;
        updatedFilteredUsers[filteredIndex].deactivationDuration = selectedDuration;
        setFilteredUsers(updatedFilteredUsers);
      }
    }
    
    closeDeactivateModal();
    console.log(`Account deactivated for ${selectedDuration} days`);
  };

  const reactivateAccount = () => {
    // Find the user in allUsers and update their deactivation status
    const userIndex = allUsers.findIndex(u => u.id === currentProfile.id);
    if (userIndex !== -1) {
      allUsers[userIndex].isDeactivated = false;
      allUsers[userIndex].deactivationDuration = null;
      setCurrentProfile({
        ...currentProfile,
        isDeactivated: false,
        deactivationDuration: null
      });
      
      // Update filteredUsers to reflect the change
      const filteredIndex = filteredUsers.findIndex(u => u.id === currentProfile.id);
      if (filteredIndex !== -1) {
        const updatedFilteredUsers = [...filteredUsers];
        updatedFilteredUsers[filteredIndex].isDeactivated = false;
        updatedFilteredUsers[filteredIndex].deactivationDuration = null;
        setFilteredUsers(updatedFilteredUsers);
      }
    }
    
    console.log('Account reactivated');
  };

  const openDeleteModal = (post, type) => {
    setPostToDelete(post);
    setPostType(type);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
    setPostType('');
  };

  const confirmDelete = () => {
    if (postToDelete && postType) {
      // Find the user in allUsers and remove the post
      const userIndex = allUsers.findIndex(u => u.id === currentProfile.id);
      if (userIndex !== -1) {
        if (postType === 'offer') {
          allUsers[userIndex].skillOffers = allUsers[userIndex].skillOffers.filter(
            offer => offer.id !== postToDelete.id
          );
          setCurrentProfile({
            ...currentProfile,
            skillOffers: currentProfile.skillOffers.filter(
              offer => offer.id !== postToDelete.id
            )
          });
        } else if (postType === 'request') {
          allUsers[userIndex].skillRequests = allUsers[userIndex].skillRequests.filter(
            request => request.id !== postToDelete.id
          );
          setCurrentProfile({
            ...currentProfile,
            skillRequests: currentProfile.skillRequests.filter(
              request => request.id !== postToDelete.id
            )
          });
        }
        
        // Update filteredUsers to reflect the change
        const filteredIndex = filteredUsers.findIndex(u => u.id === currentProfile.id);
        if (filteredIndex !== -1) {
          const updatedFilteredUsers = [...filteredUsers];
          if (postType === 'offer') {
            updatedFilteredUsers[filteredIndex].skillOffers = updatedFilteredUsers[filteredIndex].skillOffers.filter(
              offer => offer.id !== postToDelete.id
            );
          } else if (postType === 'request') {
            updatedFilteredUsers[filteredIndex].skillRequests = updatedFilteredUsers[filteredIndex].skillRequests.filter(
              request => request.id !== postToDelete.id
            );
          }
          setFilteredUsers(updatedFilteredUsers);
        }
      }
      
      console.log(`Deleted ${postType} post:`, postToDelete);
    }
    
    closeDeleteModal();
  };

  const toggleVerification = () => {
    // Find the user in allUsers and update their verification status
    const userIndex = allUsers.findIndex(u => u.id === currentProfile.id);
    if (userIndex !== -1) {
      allUsers[userIndex].isVerified = !allUsers[userIndex].isVerified;
      setCurrentProfile({
        ...currentProfile,
        isVerified: allUsers[userIndex].isVerified
      });
      
      // Update filteredUsers to reflect the change
      const filteredIndex = filteredUsers.findIndex(u => u.id === currentProfile.id);
      if (filteredIndex !== -1) {
        const updatedFilteredUsers = [...filteredUsers];
        updatedFilteredUsers[filteredIndex].isVerified = allUsers[userIndex].isVerified;
        setFilteredUsers(updatedFilteredUsers);
      }
    }
  };

  return (
    <div className="users-management-page">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <span className="material-icons">search</span>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Header with Count */}
      <div className="users-header">
        <h1>User Management</h1>
        <div className="users-count-container">
          <div className="users-count">
            Total Users: <span>{filteredUsers.length}</span>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="users-grid">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-profile-container">
            <div className="user-main-info">
              <div className="name-verified">
                <h3 className="user-name">{user.fullName}</h3>
                {user.isVerified && (
                  <span className="verified-badge">
                    <i className="fas fa-check-circle"></i>
                    Verified
                  </span>
                )}
              </div>
              <button 
                className="view-records-btn" 
                onClick={() => openProfileModal(user)}
              >
                View Records
              </button>
            </div>
            
            <div className="user-details">
              <img 
                src={user.userPicture} 
                alt={user.fullName} 
                className="profile-picture"
              />
              <div className="contact-info">
                <p className="user-email">
                  <i className="fas fa-envelope"></i>
                  {user.email}
                </p>
                <p className="user-phone">
                  <i className="fas fa-phone"></i>
                  {user.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={closeProfileModal}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-header">
              <img src={currentProfile.userPicture} alt={currentProfile.fullName} className="profile-picture" />
              <div className="profile-info">
                <div className="name-verified">
                  <h2>{currentProfile.fullName}</h2>
                  {currentProfile.isVerified && (
                    <span className="verified-badge">
                      <span className="material-icons">verified</span>
                      Verified
                    </span>
                  )}
                </div>
                <div className="verification-controls">
                  <p className="profile-email">{currentProfile.email}</p>
                </div>
                <div className="verification-controls">
                  <p className="profile-phone">{currentProfile.phone}</p>
                  <button className="verify-btn" onClick={toggleVerification}>
                    {currentProfile.isVerified ? 'Remove Verify' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>

            <div className="profile-sections">
              {/* Linked Accounts Section */}
              <div className="profile-section">
                <h3>Linked Accounts</h3>
                <div className="linked-accounts">
                  {currentProfile.linkedAccounts && currentProfile.linkedAccounts.map(account => (
                    <a 
                      key={account.platform}
                      href={account.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="account-item"
                    >
                      <span className="material-icons account-icon">{account.icon}</span>
                      <span className="account-platform">{account.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Skill Offer Posts Section */}
              <div className="profile-section">
                <h3>Skill Offer Posts</h3>
                <div className="posts-list">
                  {currentProfile.skillOffers && currentProfile.skillOffers.map(offer => (
                    <div key={offer.id} className="profile-post-card">
                      <div className="post-header">
                        <h4>{offer.skills}</h4>
                        <span className="post-time">{offer.timePosted}</span>
                      </div>
                      <p className="post-description">{offer.description}</p>
                      <div className="post-details">
                        <div className="detail-item">
                          <span className="detail-label">Category:</span>
                          <span className="detail-value">{offer.category}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Location:</span>
                          <span className="detail-value">{offer.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Skills Requested:</span>
                          <span className="detail-value">{offer.skillsRequested}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Schedule:</span>
                          <span className="detail-value">{offer.schedule}</span>
                        </div>
                      </div>
                      {offer.additionalNotes && (
                        <div className="additional-notes">
                          <span className="detail-label">Additional Notes:</span>
                          <p className="detail-value">{offer.additionalNotes}</p>
                        </div>
                      )}
                      {offer.proof && (
                        <div className="proof-image">
                          <img src={offer.proof} alt="Proof" className="proof-thumbnail" />
                        </div>
                      )}
                      <div className="post-actions">
                        <button className="btn report-btn" onClick={() => openDeleteModal(offer, 'offer')}>
                          <span className="material-icons">delete</span>
                          Delete
                        </button>
                        <button className="btn contact-btn">
                          <span className="material-icons">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Request Posts Section */}
              <div className="profile-section">
                <h3>Skill Request Posts</h3>
                <div className="posts-list">
                  {currentProfile.skillRequests && currentProfile.skillRequests.map(request => (
                    <div key={request.id} className="profile-post-card">
                      <div className="post-header">
                        <h4>{request.request}</h4>
                        <span className="post-time">{request.timePosted}</span>
                      </div>
                      <p className="post-description">{request.description}</p>
                      <div className="post-details">
                        <div className="detail-item">
                          <span className="detail-label">Category:</span>
                          <span className="detail-value">{request.category}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Location:</span>
                          <span className="detail-value">{request.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Skills Offered:</span>
                          <span className="detail-value">{request.skillsOffered}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Schedule:</span>
                          <span className="detail-value">{request.schedule}</span>
                        </div>
                      </div>
                      {request.additionalNotes && (
                        <div className="additional-notes">
                          <span className="detail-label">Additional Notes:</span>
                          <p className="detail-value">{request.additionalNotes}</p>
                        </div>
                      )}
                      {request.proof && (
                        <div className="proof-image">
                          <img src={request.proof} alt="Proof" className="proof-thumbnail" />
                        </div>
                      )}
                      <div className="post-actions">
                        <button className="btn report-btn" onClick={() => openDeleteModal(request, 'request')}>
                          <span className="material-icons">delete</span>
                          Delete
                        </button>
                        <button className="btn contact-btn">
                          <span className="material-icons">message</span>
                          Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="profile-actions">
  <button
    onClick={openDeactivateModal}
    className={`btn ${currentProfile.isDeactivated ? 'reactivate-btn' : 'deactivate-btn'}`}
  >
    {currentProfile.isDeactivated ? 'Reactivate Account' : 'Deactivate This Account'}
  </button>
  <button className="btn close-btn" onClick={closeProfileModal}>
    Close
  </button>
</div>

          </div>
        </div>
      )}

      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div className="modal-overlay" onClick={closeDeactivateModal}>
          <div className="modal-content deactivate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="deactivate-header">
              <h2>Deactivate User Account</h2>
            </div>
            
            <div className="deactivate-content">
              <p className="deactivate-warning">
                Are you sure you want to deactivate this user's account?
              </p>
              <p className="deactivate-info">
                Please select how many days the account will remain deactivated before it's automatically reactivated.
              </p>
              
              <div className="duration-selection">
                <label htmlFor="deactivation-duration">Deactivation Duration:</label>
                <select 
                  id="deactivation-duration" 
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="duration-dropdown"
                >
                  <option value="1">1 day</option>
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
              
              <div className="deactivate-note">
                <span className="material-icons warning-icon">warning</span>
                <p>
                  <strong>Note:</strong> During the deactivation period, the user will not be able to log in or access their account.
                  You can manually reactivate the account at any time.
                </p>
              </div>
            </div>
            
            <div className="deactivate-actions">
              <button className="btn confirm-deactivate-btn" onClick={confirmDeactivation}>
                Confirm Deactivation
              </button>
              <button className="btn cancel-btn" onClick={closeDeactivateModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-header">
              <h2>Delete Post</h2>
            </div>
            
            <div className="delete-content">
              <div className="delete-warning-icon">
                <span className="material-icons">warning</span>
              </div>
              <p className="delete-warning">
                Are you sure you want to delete this post?
              </p>
              <p className="delete-info">
                This action cannot be undone. The post will be permanently removed from the user's profile.
              </p>
            </div>
            
            <div className="delete-actions">
              <button className="btn confirm-delete-btn" onClick={confirmDelete}>
                Confirm Delete
              </button>
              <button className="btn cancel-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .users-management-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Search Bar Styles - Updated to match the image */
        .search-container {
          margin-bottom: 32px;
          display: flex;
          justify-content: center; /* centers horizontally */
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 10px;
          padding: 12px 18px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
          width: 100%; /* keeps it wide and centered */
          max-width: 1100px; /* optional limit so it doesn't stretch too much */
        }

        .search-bar .material-icons {
          color: #728a9c;
          margin-right: 12px;
          font-size: 22px; /* increased icon size */
        }

        .search-bar input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 17px; /* slightly bigger text */
          background: transparent;
        }

        /* Users Header Styles */
        .users-header {
          display: flex;
          justify-content: space-between; /* keeps title left and total right */
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
          width: 95%; /* control how wide the section is */
          margin: 0 auto 2rem auto; /* centers the header horizontally */
        }

        .users-header h1 {
          color: #121731;
          margin: 0;
        }

        .users-count-container {
          background-color: #f5f5f5;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .users-count {
          text-align: right;
          color: #728a9c;
        }

        .users-count span {
          font-weight: bold;
          color: #121731;
        }

        /* Users Grid Styles - 3 containers per row */
        .users-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .user-profile-container {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .user-profile-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .user-main-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .name-verified {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .user-name {
          margin: 0;
          color: #121731;
          font-size: 1.2rem;
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background-color: #e8f5e8;
          color: #2e7d32;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .verified-badge i {
          font-size: 0.9rem;
        }

        .view-records-btn {
          background: linear-gradient(135deg, #121731, #728a9c);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .view-records-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(18, 23, 49, 0.3);
        }

        .user-details {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .profile-picture {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f0f0f0;
        }

        .contact-info {
          flex: 1;
        }

        .user-email,
        .user-phone {
          margin: 0.25rem 0;
          color: #728a9c;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .user-email i,
        .user-phone i {
          width: 16px;
          color: #888;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        /* Profile Modal Styles */
        .profile-modal {
          max-width: 600px;
          max-height: 90vh;
          padding: 2rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .profile-picture {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 20px;
        }

        .profile-info h2 {
          margin: 0 0 8px 0;
          color: #121731;
          text-align: left;
        }

        .name-verified {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: #d4edda;
          color: #155724;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .material-icons {
          font-size: 18px;
          margin-right: 2px;
        }

        .verification-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .profile-email, .profile-phone {
          margin: 0;
          color: #728a9c;
          flex: 1;
        }

        .verify-btn {
          background: #121731;
          border: 1px solid #728a9c;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s;
          margin-left: 10px;
          float: right;
          color: #fff;
        }

        .verify-btn:hover {
          background: #728a9c;
        }

        .profile-sections {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .profile-section h3 {
          margin: 0 0 15px 0;
          color: #121731;
          font-size: 1.25rem;
        }

        .linked-accounts {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .account-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background-color: #f8f9fa;
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.3s;
        }

        .account-item:hover {
          background-color: #e9ecef;
          text-decoration: none;
          color: inherit;
        }

        .account-icon {
          color: #121731;
          font-size: 20px;
        }

        .account-platform {
          flex: 1;
          font-weight: 500;
        }

        .posts-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .profile-post-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #e9ecef;
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .post-header h4 {
          margin: 0;
          color: #121731;
          flex: 1;
        }

        .post-time {
          color: #728a9c;
          font-size: 0.875rem;
        }

        .post-description {
          margin: 0 0 15px 0;
          color: #555;
          line-height: 1.5;
        }

        .post-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 15px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-weight: 600;
          color: #121731;
          font-size: 0.875rem;
          margin-bottom: 4px;
        }

        .detail-value {
          color: #555;
        }

        .additional-notes {
          margin-bottom: 15px;
        }

        .proof-image {
          margin: 15px 0;
        }

        .proof-thumbnail {
          width: 100%;
          max-width: 200px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .post-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .post-actions {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          font-size: 0.830rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-left: -14px;
          margin-bottom: -10px;
        }

        .btn {
          display: flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s;
          font-size: 0.900rem;
        }

        .report-btn {
          color: #e74c3c;
          border: 1px solid #e74c3c;
        }

        .report-btn:hover {
          background: #e74c3c;
          color: white;
        }

        .contact-btn {
          color: #121731;
          border: 1px solid #121731;
        }

        .contact-btn:hover {
          background: #121731;
          color: white;
        }

        .profile-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .deactivate-btn {
          padding: 12px 20px;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .deactivate-btn:hover {
          background: #c0392b;
        }

        .reactivate-btn {
          background: #27ae60;
        }

        .reactivate-btn:hover {
          background: #219a52;
        }

        .close-btn {
          padding: 12px 30px;
          background: #121731;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .close-btn:hover {
          background: #0a0f23;
        }

        /* Deactivate Modal Styles */
        .deactivate-modal {
          max-width: 500px;
          padding: 2rem;
        }

        .deactivate-header {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .deactivate-header h2 {
          color: #121731;
          margin: 0;
          font-size: 1.5rem;
        }

        .deactivate-content {
          margin-bottom: 2rem;
        }

        .deactivate-warning {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
        }

        .deactivate-info {
          color: #728a9c;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .duration-selection {
          margin-bottom: 1.5rem;
        }

        .duration-selection label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #121731;
        }

        .duration-dropdown {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          background-color: white;
        }

        .deactivate-note {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          color: #856404;
        }

        .warning-icon {
          color: #f39c12;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .deactivate-note p {
          margin: 0;
          line-height: 1.5;
        }

        .deactivate-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .confirm-deactivate-btn {
          padding: 12px 24px;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .confirm-deactivate-btn:hover {
          background: #c0392b;
        }

        .cancel-btn {
          padding: 12px 24px;
          background: #95a5a6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .cancel-btn:hover {
          background: #7f8c8d;
        }

        /* Delete Confirmation Modal Styles */
        .delete-modal {
          max-width: 450px;
          padding: 2rem;
        }

        .delete-header {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .delete-header h2 {
          color: #121731;
          margin: 0;
          font-size: 1.5rem;
        }

        .delete-content {
          margin-bottom: 2rem;
          text-align: center;
        }

        .delete-warning-icon {
          margin-bottom: 1rem;
        }

        .delete-warning-icon .material-icons {
          font-size: 3rem;
          color: #e74c3c;
        }

        .delete-warning {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
        }

        .delete-info {
          color: #728a9c;
          line-height: 1.5;
          margin-bottom: 0;
        }

        .delete-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .confirm-delete-btn {
          padding: 12px 24px;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .confirm-delete-btn:hover {
          background: #c0392b;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .users-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .users-management-page {
            padding: 1rem;
          }
          
          .users-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .users-count-container {
            width: 100%;
          }
          
          .users-count {
            text-align: left;
          }
          
          .users-grid {
            grid-template-columns: 1fr;
          }
          
          .user-main-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .user-details {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .contact-info {
            width: 100%;
          }
          
          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .profile-picture {
            margin-right: 0;
            margin-bottom: 15px;
          }

          .verification-controls {
            flex-direction: column;
            align-items: flex-start;
          }

          .verify-btn {
            margin-left: 0;
            margin-top: 5px;
          }

          .post-details {
            grid-template-columns: 1fr;
          }

          .post-actions {
            flex-direction: column;
          }

          .profile-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .deactivate-actions {
            flex-direction: column;
          }

          .delete-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}