'use client';

import { useState, useEffect } from 'react';

export default function UsersManagement() {
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
    // Create updated arrays
    const updatedAllUsers = allUsers.map(user =>
      user.id === currentProfile.id
        ? { ...user, isDeactivated: true, deactivationDuration: selectedDuration }
        : user
    );

    const updatedFilteredUsers = filteredUsers.map(user =>
      user.id === currentProfile.id
        ? { ...user, isDeactivated: true, deactivationDuration: selectedDuration }
        : user
    );

    setCurrentProfile(prev => ({
      ...prev,
      isDeactivated: true,
      deactivationDuration: selectedDuration
    }));

    setFilteredUsers(updatedFilteredUsers);
    
    closeDeactivateModal();
    console.log(`Account deactivated for ${selectedDuration} days`);
  };

  const reactivateAccount = () => {
    // Create updated arrays
    const updatedAllUsers = allUsers.map(user =>
      user.id === currentProfile.id
        ? { ...user, isDeactivated: false, deactivationDuration: null }
        : user
    );

    const updatedFilteredUsers = filteredUsers.map(user =>
      user.id === currentProfile.id
        ? { ...user, isDeactivated: false, deactivationDuration: null }
        : user
    );

    setCurrentProfile(prev => ({
      ...prev,
      isDeactivated: false,
      deactivationDuration: null
    }));

    setFilteredUsers(updatedFilteredUsers);
    
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
      // Create updated arrays
      const updatedAllUsers = allUsers.map(user => {
        if (user.id === currentProfile.id) {
          if (postType === 'offer') {
            return {
              ...user,
              skillOffers: user.skillOffers.filter(offer => offer.id !== postToDelete.id)
            };
          } else if (postType === 'request') {
            return {
              ...user,
              skillRequests: user.skillRequests.filter(request => request.id !== postToDelete.id)
            };
          }
        }
        return user;
      });

      const updatedFilteredUsers = filteredUsers.map(user => {
        if (user.id === currentProfile.id) {
          if (postType === 'offer') {
            return {
              ...user,
              skillOffers: user.skillOffers.filter(offer => offer.id !== postToDelete.id)
            };
          } else if (postType === 'request') {
            return {
              ...user,
              skillRequests: user.skillRequests.filter(request => request.id !== postToDelete.id)
            };
          }
        }
        return user;
      });

      setCurrentProfile(prev => {
        if (postType === 'offer') {
          return {
            ...prev,
            skillOffers: prev.skillOffers.filter(offer => offer.id !== postToDelete.id)
          };
        } else if (postType === 'request') {
          return {
            ...prev,
            skillRequests: prev.skillRequests.filter(request => request.id !== postToDelete.id)
          };
        }
        return prev;
      });

      setFilteredUsers(updatedFilteredUsers);
      
      console.log(`Deleted ${postType} post:`, postToDelete);
    }
    
    closeDeleteModal();
  };

  const toggleVerification = () => {
    // Create a new array with updated user
    const updatedAllUsers = allUsers.map(user => 
      user.id === currentProfile.id 
        ? { ...user, isVerified: !user.isVerified }
        : user
    );
    
    // Update filteredUsers to reflect the change
    const updatedFilteredUsers = filteredUsers.map(user =>
      user.id === currentProfile.id
        ? { ...user, isVerified: !user.isVerified }
        : user
    );
    
    // Update currentProfile
    setCurrentProfile(prev => ({
      ...prev,
      isVerified: !prev.isVerified
    }));
    
    // Update state
    setFilteredUsers(updatedFilteredUsers);
    
    // Note: Since allUsers is a constant, we can't update it with setState
    // But the updated data will be reflected in filteredUsers and currentProfile
    console.log(`User verification ${!currentProfile.isVerified ? 'added' : 'removed'}`);
  };

  return (
    <div className="users-management-page p-8 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="search-container mb-8 flex justify-center">
        <div className="search-bar flex items-center bg-white rounded-xl p-3 shadow-lg w-full max-w-[1100px]">
          <span className="material-icons text-[#728a9c] mr-3 text-[22px]">search</span>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none outline-none text-[17px] bg-transparent"
          />
        </div>
      </div>

      {/* Users Header with Count */}
      <div className="users-header flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200 w-[95%] mx-auto">
        <h1 className="text-[#121731] m-0">User Management</h1>
        <div className="users-count-container bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
          <div className="users-count text-right text-[#728a9c]">
            Total Users: <span className="font-bold text-[#121731]">{filteredUsers.length}</span>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="users-grid grid grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-profile-container bg-white rounded-xl p-6 shadow-sm border border-gray-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="user-main-info flex justify-between items-start mb-4">
              <div className="name-verified flex items-center gap-2 flex-wrap min-h-[2.5rem]">
                <h3 className="user-name m-0 text-[#121731] text-xl">{user.fullName}</h3>
                {user.isVerified && (
                  <span className="verified-badge flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                    <i className="fas fa-check-circle text-sm"></i>
                    Verified
                  </span>
                )}
              </div>
              <button 
                className="view-records-btn bg-gradient-to-br from-[#121731] to-[#728a9c] text-white border-none px-6 py-3 rounded-lg cursor-pointer text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg whitespace-nowrap min-w-[120px] text-center"
                onClick={() => openProfileModal(user)}
              >
                View Records
              </button>
            </div>
            
            <div className="user-details flex gap-4 items-center">
              <img 
                src={user.userPicture} 
                alt={user.fullName} 
                className="profile-picture w-15 h-15 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="contact-info flex-1">
                <p className="user-email m-1 text-[#728a9c] flex items-center gap-2">
                  <i className="fas fa-envelope w-4 text-gray-500"></i>
                  {user.email}
                </p>
                <p className="user-phone m-1 text-[#728a9c] flex items-center gap-2">
                  <i className="fas fa-phone w-4 text-gray-500"></i>
                  {user.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
       <div 
       className="modal-overlay fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-50 p-5" 
       onClick={closeProfileModal}
     >
     
          <div className="modal-content profile-modal bg-white rounded-2xl w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl max-w-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="profile-header flex items-center mb-8 pb-5 border-b border-gray-300">
              <img src={currentProfile.userPicture} alt={currentProfile.fullName} className="profile-picture w-20 h-20 rounded-full object-cover mr-5"/>
              <div className="profile-info">
                <div className="name-verified flex items-center gap-3 mb-2">
                  <h2 className="m-0 text-[#121731] text-left">{currentProfile.fullName}</h2>
                  {currentProfile.isVerified && (
                    <span className="verified-badge flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      <span className="material-icons text-lg mr-0.5">verified</span>
                      Verified
                    </span>
                  )}
                </div>
                <div className="verification-controls flex items-center justify-between mb-2">
                  <p className="profile-email m-0 text-[#728a9c] flex-1">{currentProfile.email}</p>
                </div>
                <div className="verification-controls flex items-center justify-between mb-2">
                  <p className="profile-phone m-0 text-[#728a9c] flex-1">{currentProfile.phone}</p>
                  <button className="verify-btn bg-[#121731] border border-[#728a9c] rounded px-2 py-1 text-sm cursor-pointer transition-all duration-300 ml-3 text-white" onClick={toggleVerification}>
                    {currentProfile.isVerified ? 'Remove Verify' : 'Verify'}
                  </button>
                </div>
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
                          <img src={offer.proof} alt="Proof" className="proof-thumbnail w-full max-w-50 rounded-lg border border-gray-300"/>
                        </div>
                      )}
                      <div className="post-actions flex gap-3 mt-4">
                        <button className="btn report-btn flex items-center px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white text-sm" onClick={() => openDeleteModal(offer, 'offer')}>
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

              {/* Skill Request Posts Section */}
              <div className="profile-section">
                <h3 className="m-0 mb-4 text-[#121731] text-xl">Skill Request Posts</h3>
                <div className="posts-list flex flex-col gap-5">
                  {currentProfile.skillRequests?.map(request => (
                    <div key={request.id} className="profile-post-card bg-gray-50 rounded-lg p-5 border border-gray-300">
                      <div className="post-header flex justify-between items-start mb-3">
                        <h4 className="m-0 text-[#121731] flex-1">{request.request}</h4>
                        <span className="post-time text-[#728a9c] text-sm">{request.timePosted}</span>
                      </div>
                      <p className="post-description m-0 mb-4 text-gray-700 leading-relaxed">{request.description}</p>
                      <div className="post-details grid grid-cols-2 gap-3 mb-4">
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Category:</span>
                          <span className="detail-value text-gray-700">{request.category}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Location:</span>
                          <span className="detail-value text-gray-700">{request.location}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Skills Offered:</span>
                          <span className="detail-value text-gray-700">{request.skillsOffered}</span>
                        </div>
                        <div className="detail-item flex flex-col">
                          <span className="detail-label font-semibold text-[#121731] text-sm mb-1">Schedule:</span>
                          <span className="detail-value text-gray-700">{request.schedule}</span>
                        </div>
                      </div>
                      {request.additionalNotes && (
                        <div className="additional-notes mb-4">
                          <span className="detail-label font-semibold text-[#121731] text-sm">Additional Notes:</span>
                          <p className="detail-value text-gray-700 m-0 mt-1">{request.additionalNotes}</p>
                        </div>
                      )}
                      {request.proof && (
                        <div className="proof-image my-4">
                          <img src={request.proof} alt="Proof" className="proof-thumbnail w-full max-w-50 rounded-lg border border-gray-300"/>
                        </div>
                      )}
                      <div className="post-actions flex gap-3 mt-4">
                        <button className="btn report-btn flex items-center px-3 py-1.5 rounded-lg font-medium transition-all duration-300 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white text-sm" onClick={() => openDeleteModal(request, 'request')}>
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

            <div className="profile-actions flex justify-between mt-8 pt-5 border-t border-gray-300"> 
  <button 
    className={`btn px-5 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${currentProfile.isDeactivated ? 'reactivate-btn bg-green-600 hover:bg-green-700' : 'deactivate-btn bg-red-600 hover:bg-red-700'} text-white border-none`}
    onClick={openDeactivateModal}
  >
    {currentProfile.isDeactivated ? 'Reactivate Account' : 'Deactivate This Account'}
  </button>
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

      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div 
        className="modal-overlay fixed top-0 left-0 w-full h-full bg-[rgba(211,211,211,0.5)] flex justify-center items-center z-50 backdrop-blur-[1px]" 
        onClick={closeDeactivateModal}
      >
      
          <div className="modal-content deactivate-modal bg-white rounded-2xl w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl max-w-lg p-8" onClick={(e) => e.stopPropagation()}>
            <div className="deactivate-header mb-6 text-center">
              <h2 className="m-0 text-[#121731] text-2xl">Deactivate User Account</h2>
            </div>
            
            <div className="deactivate-content mb-8">
              <p className="deactivate-warning text-lg font-semibold text-gray-900 mb-4">
                Are you sure you want to deactivate this user's account?
              </p>
              <p className="deactivate-info text-[#728a9c] mb-6 leading-relaxed">
                Please select how many days the account will remain deactivated before it's automatically reactivated.
              </p>
              
              <div className="duration-selection mb-6">
                <label htmlFor="deactivation-duration" className="block mb-2 font-semibold text-[#121731]">Deactivation Duration:</label>
                <select 
                  id="deactivation-duration" 
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="duration-dropdown w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
                >
                  <option value="1">1 day</option>
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
              
              <div className="deactivate-note flex items-start gap-3 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800">
                <span className="material-icons warning-icon text-orange-500 text-2xl flex-shrink-0">warning</span>
                <p className="m-0 leading-relaxed">
                  <strong>Note:</strong> During the deactivation period, the user will not be able to log in or access their account.
                  You can manually reactivate the account at any time.
                </p>
              </div>
            </div>
            
            <div className="deactivate-actions flex gap-4 justify-end">
              <button className="btn confirm-deactivate-btn px-6 py-3 bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-700" onClick={confirmDeactivation}>
                Confirm Deactivation
              </button>
              <button className="btn cancel-btn px-6 py-3 bg-gray-600 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-700" onClick={closeDeactivateModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
       <div 
       className="modal-overlay fixed top-0 left-0 w-full h-full bg-[rgba(211,211,211,0.5)] flex justify-center items-center z-50 backdrop-blur-[1px]" 
       onClick={closeDeleteModal}
     >
     
          <div className="modal-content delete-modal bg-white rounded-2xl w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl max-w-md p-8" onClick={(e) => e.stopPropagation()}>
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
                This action cannot be undone. The post will be permanently removed from the user's profile.
              </p>
            </div>
            
            <div className="delete-actions flex gap-4 justify-center">
              <button className="btn confirm-delete-btn px-6 py-3 bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-700" onClick={confirmDelete}>
                Confirm Delete
              </button>
              <button className="btn cancel-btn px-6 py-3 bg-gray-600 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-700" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}