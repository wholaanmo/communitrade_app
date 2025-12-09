'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation' 
import { userDB } from '@/lib/firebaseDB'

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [user, setUser] = useState({
    fullName: 'User',
    username: 'user',
    email: '',
    phone: '',
    governmentId: '',
    linkedAccounts: [],
    idPhotoUrl: '',
    hasProfilePicture: false,
    skillOffers: [],
    skillRequests: []
  })

  const [activeTab, setActiveTab] = useState('offers')

  const [showAddField, setShowAddField] = useState(false)
  const [selectedAccountType, setSelectedAccountType] = useState('facebook')
  const [newAccountUrl, setNewAccountUrl] = useState('')
  const [urlError, setUrlError] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [profileImageUrl, setProfileImageUrl] = useState('')
  const [idImageUrl, setIdImageUrl] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [deleteType, setDeleteType] = useState('')
  const [showEditOfferModal, setShowEditOfferModal] = useState(false)
  const [showEditRequestModal, setShowEditRequestModal] = useState(false)
  const [editingOffer, setEditingOffer] = useState({})
  const [editingRequest, setEditingRequest] = useState({})

  const idFileInput = useRef(null)
  const profilePicInput = useRef(null)

  const getCurrentUserId = () => {
    if (!session?.user?.email) return null;
    return session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
  }

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!session?.user) return;
      
      setIsLoading(true);
      const userId = getCurrentUserId();
      
      try {

        const firebaseUser = await userDB.getUser(userId);
        
        if (firebaseUser) {

          setUser(prev => ({
            ...prev,
            fullName: firebaseUser.fullName || session.user.name || 'User',
            username: firebaseUser.username || session.user.email?.split('@')[0] || 'user',
            email: firebaseUser.email || session.user.email || '',
            phone: firebaseUser.phone || '',
            governmentId: firebaseUser.governmentId || '',
            linkedAccounts: firebaseUser.linkedAccounts || [],
            idPhotoUrl: firebaseUser.idPhotoUrl || '',
            hasProfilePicture: firebaseUser.hasProfilePicture || !!session.user.image,
            skillOffers: firebaseUser.skillOffers || [],
            skillRequests: firebaseUser.skillRequests || []
          }));

          if (firebaseUser.profileImageUrl) {
            setProfileImageUrl(firebaseUser.profileImageUrl);
          } else if (session.user.image) {
            setProfileImageUrl(session.user.image);
          }
        } else {

          setUser(prev => ({
            ...prev,
            fullName: session.user.name || 'User',
            username: session.user.email?.split('@')[0] || 'user',
            email: session.user.email || '',
            hasProfilePicture: !!session.user.image
          }));
          setProfileImageUrl(session.user.image || '');
          
          await saveUserToFirebase({
            fullName: session.user.name || 'User',
            username: session.user.email?.split('@')[0] || 'user',
            email: session.user.email || '',
            hasProfilePicture: !!session.user.image,
            profileImageUrl: session.user.image || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadUserData();
    }
  }, [session]);

  const saveUserToFirebase = async (updates = {}) => {
    if (!session?.user) return;
    
    const userId = getCurrentUserId();
    if (!userId) return;
    
    try {

      const userData = {
        fullName: updates.fullName || user.fullName,
        username: updates.username || user.username,
        email: updates.email || user.email || session.user.email,
        phone: updates.phone || user.phone,
        governmentId: updates.governmentId || user.governmentId,
        linkedAccounts: updates.linkedAccounts || user.linkedAccounts,
        idPhotoUrl: updates.idPhotoUrl || user.idPhotoUrl,
        hasProfilePicture: updates.hasProfilePicture !== undefined ? updates.hasProfilePicture : user.hasProfilePicture,
        profileImageUrl: updates.profileImageUrl || profileImageUrl,
        skillOffers: updates.skillOffers || user.skillOffers,
        skillRequests: updates.skillRequests || user.skillRequests,
        lastUpdated: new Date().toISOString()
      };

      await userDB.updateUser(userId, userData);
      console.log('User data saved to Firebase');
    } catch (error) {
      console.error('Error saving user data to Firebase:', error);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading User Page...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const urlPatterns = {
    facebook: /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.+/i,
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i
  }

  const accountNames = {
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    instagram: 'Instagram'
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
    if (!isEditing) {

      setEditData({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        governmentId: user.governmentId,
        idPhoto: null
      })
    } else {
      setEditData({})
      setShowAddField(false)
      setNewAccountUrl('')
      setUrlError('')
    }
  }

  const getAccountPlaceholder = () => {
    const placeholders = {
      facebook: 'Enter Facebook profile URL',
      linkedin: 'Enter LinkedIn profile URL',
      instagram: 'Enter Instagram profile URL'
    }
    return placeholders[selectedAccountType]
  }

  const validateUrl = (url, type) => {
    if (!url.trim()) {
      return 'URL is required'
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    try {
      new URL(url)
    } catch {
      return 'Please enter a valid URL'
    }

    if (!urlPatterns[type].test(url)) {
      return `Please enter a valid ${accountNames[type]} URL`
    }
    
    return null
  }

  const saveLinkedAccount = () => {
    const error = validateUrl(newAccountUrl, selectedAccountType)
    setUrlError(error)
    
    if (!error) {
      let finalUrl = newAccountUrl

      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl
      }
      
      const updatedLinkedAccounts = [
        ...user.linkedAccounts,
        {
          id: Date.now(),
          name: accountNames[selectedAccountType],
          url: finalUrl
        }
      ];
      
      setUser(prev => ({
        ...prev,
        linkedAccounts: updatedLinkedAccounts
      }));
      saveUserToFirebase({ linkedAccounts: updatedLinkedAccounts });
      
      setNewAccountUrl('')
      setShowAddField(false)
      setUrlError('')
    }
  }

  const cancelAddAccount = () => {
    setNewAccountUrl('')
    setShowAddField(false)
    setUrlError('')
  }

  const triggerProfilePicUpload = () => {
    profilePicInput.current?.click()
  }

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0]
    if (file) {

      const newProfileImageUrl = URL.createObjectURL(file);
      setProfileImageUrl(newProfileImageUrl);
      setUser(prev => ({ ...prev, hasProfilePicture: true }));

      saveUserToFirebase({ 
        hasProfilePicture: true,
        profileImageUrl: newProfileImageUrl
      });
      
      console.log('Profile picture uploaded:', file.name);
    }
  }

  const handleIdUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setEditData(prev => ({ ...prev, idPhoto: file }))

      setIdImageUrl(URL.createObjectURL(file))
    }
  }

  const removeIdPhoto = () => {
    setEditData(prev => ({ ...prev, idPhoto: null }))
    setIdImageUrl('')
    if (idFileInput.current) {
      idFileInput.current.value = ''
    }
  }

  const saveChanges = () => {
    const updatedUser = {
      fullName: editData.fullName,
      username: editData.username,
      email: editData.email,
      phone: editData.phone,
      governmentId: editData.governmentId
    };
    
    setUser(prev => ({
      ...prev,
      ...updatedUser
    }));

    if (editData.idPhoto) {
      console.log('ID photo to upload:', editData.idPhoto);

      const newIdPhotoUrl = idImageUrl;
      setUser(prev => ({ ...prev, idPhotoUrl: newIdPhotoUrl }));

      saveUserToFirebase({ 
        idPhotoUrl: newIdPhotoUrl,
        ...updatedUser
      });
    } else {

      saveUserToFirebase(updatedUser);
    }
    
    setIsEditing(false);
    setEditData({});
    setShowAddField(false);
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditData({})
    setShowAddField(false)
    setNewAccountUrl('')
    setUrlError('')

  }


  const removeAccount = (accountId) => {
    const updatedLinkedAccounts = user.linkedAccounts.filter(account => account.id !== accountId);
    
    setUser(prev => ({
      ...prev,
      linkedAccounts: updatedLinkedAccounts
    }));
    

    saveUserToFirebase({ linkedAccounts: updatedLinkedAccounts });
  }

  const deleteOffer = (offerId) => {
    setPostToDelete(offerId)
    setDeleteType('offer')
    setShowDeleteConfirmation(true)
  }

  const deleteRequest = (requestId) => {
    setPostToDelete(requestId)
    setDeleteType('request')
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    if (deleteType === 'offer' && postToDelete) {
      const updatedSkillOffers = user.skillOffers.filter(offer => offer.id !== postToDelete);
      setUser(prev => ({
        ...prev,
        skillOffers: updatedSkillOffers
      }));
      saveUserToFirebase({ skillOffers: updatedSkillOffers });
    } else if (deleteType === 'request' && postToDelete) {
      const updatedSkillRequests = user.skillRequests.filter(request => request.id !== postToDelete);
      setUser(prev => ({
        ...prev,
        skillRequests: updatedSkillRequests
      }));
      saveUserToFirebase({ skillRequests: updatedSkillRequests });
    }
    
    setShowDeleteConfirmation(false)
    setPostToDelete(null)
    setDeleteType('')
  }

  const editOffer = (offer) => {
    setEditingOffer({ ...offer })
    setShowEditOfferModal(true)
  }

  const editRequest = (request) => {
    setEditingRequest({ ...request })
    setShowEditRequestModal(true)
  }

  const saveOfferEdit = () => {
    const updatedSkillOffers = user.skillOffers.map(offer => 
      offer.id === editingOffer.id ? { ...editingOffer } : offer
    );
    
    setUser(prev => ({
      ...prev,
      skillOffers: updatedSkillOffers
    }));

    saveUserToFirebase({ skillOffers: updatedSkillOffers });
    
    setShowEditOfferModal(false);
  }

  const saveRequestEdit = () => {
    const updatedSkillRequests = user.skillRequests.map(request => 
      request.id === editingRequest.id ? { ...editingRequest } : request
    );
    
    setUser(prev => ({
      ...prev,
      skillRequests: updatedSkillRequests
    }));
 
    saveUserToFirebase({ skillRequests: updatedSkillRequests });
    
    setShowEditRequestModal(false);
  }

  const getProfileImageUrl = () => {
    if (profileImageUrl) return profileImageUrl;
    if (session?.user?.image) return session.user.image;
    return '../assets/profile.jpg';
  };

  return (
    <div className="account-page p-4 sm:p-6 lg:p-8 -mt-1 ml-0 w-full box-border min-h-screen">
      <div className="account-layout grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start max-w-[1200px] mx-auto">
        {/* Left Column - Profile Information */}
        <div className="profile-container flex flex-col">
          <div className="profile-card bg-white rounded-xl p-4 sm:p-6 shadow-md relative w-full box-border overflow-hidden">
            {/* Header and Edit Button */}
            <div className="profile-header flex justify-between items-center mb-4 sm:mb-6 pb-3 border-b-2 border-[#728a9c] w-full flex-wrap gap-3">
              <h2 className="profile-title text-[#121731] text-lg sm:text-xl font-semibold m-0">Profile Information</h2>
              <button  
                className="edit-button bg-[#121731] text-white border-none rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#728a9c] hover:scale-105 flex-shrink-0"
                onClick={toggleEditMode}
              >
                <span className="material-icons text-base sm:text-lg">
                  {isEditing ? 'close' : 'edit'}
                </span>
              </button>
            </div>


            <div className="profile-content flex flex-col sm:flex-row gap-4 sm:gap-6 items-start w-full flex-wrap">
              <div className="profile-picture-section flex flex-col items-center gap-3 flex-shrink-0 w-full sm:w-auto sm:min-w-[120px] sm:max-w-[150px]">
                <div className="profile-picture flex-shrink-0 relative w-20 h-20 sm:w-25 sm:h-25">
                  <img 
                    src={getProfileImageUrl()} 
                    alt="Profile Picture" 
                    className="avatar w-full h-full rounded-full object-cover border-2 border-[#728a9c] box-border"
                  />
                  {isEditing && (
                    <button 
                      className="upload-profile-pic-btn absolute bottom-0 right-0 bg-[#121731] text-white border-none rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#728a9c] hover:scale-110"
                      onClick={triggerProfilePicUpload}
                    >
                      <span className="material-icons text-sm sm:text-base">photo_camera</span>
                    </button>
                  )}
                  <input 
                    type="file" 
                    ref={profilePicInput}
                    onChange={handleProfilePicUpload}
                    accept="image/*"
                    className="file-input-hidden hidden"
                  />
                </div>
                {isEditing ? (
                  <div className="edit-input-container full-name-edit w-full">
                    <input 
                      type="text" 
                      value={editData.fullName || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="edit-input w-full p-2 border border-[#728a9c] rounded text-sm sm:text-base outline-none transition-colors duration-300 focus:border-[#121731] focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border max-w-full"
                      placeholder="Enter full name"
                    />
                  </div>
                ) : (
                  <h3 className="user-name text-base sm:text-lg text-[#121731] m-0 text-center break-words w-full">{user.fullName}</h3>
                )}
              </div>

              <div className="profile-info flex-1 flex flex-col gap-4 sm:gap-5 min-w-0 w-full">
                <div className="info-section flex flex-col gap-1 w-full">
                  <label className="info-label font-semibold text-[#121731] text-xs sm:text-sm uppercase tracking-wider w-full">FULL NAME:</label>
                  {isEditing ? (
                    <div className="edit-input-container pl-2 w-full box-border">
                      <input 
                        type="text" 
                        value={editData.fullName || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="edit-input w-full p-2 border border-[#728a9c] rounded text-sm sm:text-base outline-none transition-colors duration-300 focus:border-[#121731] focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border max-w-full"
                      />
                    </div>
                  ) : (
                    <p className="info-value text-[#121731] text-sm sm:text-base m-0 pl-2 break-words w-full">{user.fullName}</p>
                  )}
                </div>

                <div className="info-section flex flex-col gap-1 w-full">
                  <label className="info-label font-semibold text-[#121731] text-xs sm:text-sm uppercase tracking-wider w-full">USERNAME:</label>
                  {isEditing ? (
                    <div className="edit-input-container pl-2 w-full box-border">
                      <input 
                        type="text" 
                        value={editData.username || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                        className="edit-input w-full p-2 border border-[#728a9c] rounded text-sm sm:text-base outline-none transition-colors duration-300 focus:border-[#121731] focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border max-w-full"
                      />
                    </div>
                  ) : (
                    <p className="info-value text-[#121731] text-sm sm:text-base m-0 pl-2 break-words w-full">{user.username}</p>
                  )}
                </div>

                <div className="info-section flex flex-col gap-1 w-full">
                  <label className="info-label font-semibold text-[#121731] text-xs sm:text-sm uppercase tracking-wider w-full">EMAIL ADDRESS:</label>
                  {isEditing ? (
                    <div className="edit-input-container pl-2 w-full box-border">
                      <input 
                        type="email" 
                        value={editData.email || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                        className="edit-input w-full p-2 border border-[#728a9c] rounded text-sm sm:text-base outline-none transition-colors duration-300 focus:border-[#121731] focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border max-w-full bg-[#f5f5f5] text-[#666] cursor-not-allowed"
                        disabled
                        title="Email cannot be changed"
                      />
                    </div>
                  ) : (
                    <p className="info-value text-[#121731] text-sm sm:text-base m-0 pl-2 break-words w-full">{user.email}</p>
                  )}
                </div>

                <div className="info-section flex flex-col gap-1 w-full">
                  <label className="info-label font-semibold text-[#121731] text-xs sm:text-sm uppercase tracking-wider w-full">PHONE NUMBER:</label>
                  {isEditing ? (
                    <div className="edit-input-container pl-2 w-full box-border">
                      <input 
                        type="tel" 
                        value={editData.phone || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                        className="edit-input w-full p-2 border border-[#728a9c] rounded text-sm sm:text-base outline-none transition-colors duration-300 focus:border-[#121731] focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border max-w-full"
                        placeholder="Enter phone number"
                      />
                    </div>
                  ) : (
                    <p className="info-value text-[#121731] text-sm sm:text-base m-0 pl-2 break-words w-full">
                      {user.phone || 'Not provided'}
                    </p>
                  )}
                </div>

                <div className="info-section flex flex-col gap-1 w-full">
                  <label className="info-label font-semibold text-[#121731] text-xs sm:text-sm uppercase tracking-wider w-full">GOVERNMENT ID:</label>
                  {isEditing ? (
                    <div className="government-id-edit flex flex-col gap-3 w-full">
                      <div className="edit-input-container pl-2 w-full box-border">
                        <input 
                          type="text" 
                          value={editData.governmentId || ''}
                          onChange={(e) => setEditData(prev => ({ ...prev, governmentId: e.target.value }))}
                          className="edit-input w-full p-2 border border-[#728a9c] rounded text-sm sm:text-base outline-none transition-colors duration-300 focus:border-[#121731] focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border max-w-full"
                          placeholder="Enter government ID (e.g., XXX-XX-XXXX)"
                        />
                      </div>
                      
                      <div className="id-upload-section flex flex-col gap-2 w-full">
                        <label className="upload-label flex items-center gap-2 p-2 sm:p-3 bg-[#ffffff] border-2 border-dashed border-[#728a9c] rounded-lg cursor-pointer transition-all duration-300 text-xs sm:text-sm text-[#121731] w-full box-border justify-center hover:border-[#121731] hover:bg-[#f8f9fa]">
                          <input 
                            type="file" 
                            ref={idFileInput}
                            onChange={handleIdUpload}
                            accept="image/*"
                            className="file-input hidden"
                          />
                          <span className="material-icons text-sm sm:text-base">cloud_upload</span>
                          Upload ID Photo
                        </label>
                        {editData.idPhoto && (
                          <div className="uploaded-file flex items-center justify-between gap-2 p-2 bg-[#ffffff] rounded text-xs sm:text-sm text-[#121731] w-full box-border flex-wrap">
                            <div className="file-preview flex items-center gap-2 flex-1 min-w-0">
                              <img src={idImageUrl} alt="ID Preview" className="id-preview-image w-8 h-8 sm:w-10 sm:h-10 object-cover rounded border border-[#728a9c] flex-shrink-0" />
                              <div className="file-info flex items-center gap-2 min-w-0 flex-1">
                                <span className="material-icons text-[#121731] text-sm sm:text-base">description</span>
                                <span className="truncate">{editData.idPhoto.name}</span>
                              </div>
                            </div>
                            <button 
                              className="remove-file-btn bg-none border-none text-[#728a9c] cursor-pointer p-1 rounded-full transition-all duration-300 hover:bg-[#728a9c] hover:text-white flex-shrink-0"
                              onClick={removeIdPhoto}
                            >
                              <span className="material-icons text-sm sm:text-base">close</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="verification-note text-xs text-[#666] mt-2 italic">Upload a government ID to be verified.</p>
                    </div>
                  ) : (
                    <div className="id-display pl-2 w-full">
                      {/* Show government ID text if it exists */}
                      {user.governmentId && (
                        <p className="info-value text-[#121731] text-sm sm:text-base m-0 mb-2">
                          Government ID: {user.governmentId}
                        </p>
                      )}
                      
                      {user.idPhotoUrl ? (
                        <div className="uploaded-id flex flex-col gap-2 w-full">
                          <img src={user.idPhotoUrl} alt="Government ID" className="id-image max-w-full h-auto object-cover rounded-lg border-2 border-[#728a9c] shadow-sm max-h-32 sm:max-h-36" />
                        </div>
                      ) : (
                        !user.governmentId && (
                          <p className="info-value text-[#121731] text-sm sm:text-base m-0">No ID uploaded</p>
                        )
                      )}
                      <p className="verification-note text-xs text-[#666] mt-2 italic">Upload a government ID to be verified.</p>
                    </div>
                  )}
                </div>

                {!user.hasProfilePicture && (
                  <div className="validation-message flex items-center gap-2 p-2 sm:p-3 bg-[#fff3cd] border border-[#ffeaa7] rounded-lg text-[#856404] text-xs sm:text-sm my-3 sm:my-4 w-full box-border">
                    <span className="material-icons text-sm sm:text-base text-[#f39c12]">info</span>
                    You must upload a profile picture before you can post on the website.
                  </div>
                )}

                <div className="info-section flex flex-col gap-1 w-full">
                  <div className="linked-accounts-header flex justify-between items-center mb-1 w-full flex-wrap gap-2">
                    <label className="info-label font-semibold text-[#121731] text-xs sm:text-sm uppercase tracking-wider w-full">LINKED ACCOUNTS:</label>
                    {isEditing && (
                      <div className="account-options flex gap-2 flex-shrink-0">
                        <button 
                          className="add-account-btn flex items-center gap-1 bg-[#728a9c] text-white border-none py-1 px-2 sm:px-3 rounded cursor-pointer text-xs sm:text-sm transition-colors duration-300 hover:bg-[#121731] whitespace-nowrap"
                          onClick={() => setShowAddField(!showAddField)}
                        >
                          <span className="material-icons text-sm">add</span>
                          Add
                        </button>
                      </div>
                    )}
                  </div>

                  {showAddField && isEditing && (
                    <div className="add-account-field my-2 w-full">
                      <div className="account-type-selector mb-2 w-full">
                        <select 
                          value={selectedAccountType}
                          onChange={(e) => setSelectedAccountType(e.target.value)}
                          className="account-select w-full p-2 border border-[#728a9c] rounded text-xs sm:text-sm outline-none transition-colors duration-300 focus:border-[#121731] box-border max-w-full"
                        >
                          <option value="facebook">Facebook</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="instagram">Instagram</option>
                        </select>
                      </div>
                      <div className="input-group flex gap-2 items-center w-full flex-wrap">
                        <input 
                          type="text" 
                          value={newAccountUrl}
                          onChange={(e) => setNewAccountUrl(e.target.value)}
                          placeholder={getAccountPlaceholder()}
                          className="url-input flex-1 p-2 border border-[#728a9c] rounded text-xs sm:text-sm outline-none transition-colors duration-300 focus:border-[#121731] min-w-[150px] sm:min-w-[200px] box-border"
                        />
                        <button 
                          className="save-btn w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-none rounded cursor-pointer transition-all duration-300 bg-[#121731] text-white hover:bg-[#4f5d73] flex-shrink-0"
                          onClick={saveLinkedAccount}
                        >
                          <span className="material-icons text-sm sm:text-base">check</span>
                        </button>
                        <button 
                          className="cancel-btn w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border-none rounded cursor-pointer transition-all duration-300 bg-[#728a9c] text-white hover:bg-[#b7c8d4] flex-shrink-0"
                          onClick={cancelAddAccount}
                        >
                          <span className="material-icons text-sm sm:text-base">close</span>
                        </button>
                      </div>
                      {urlError && (
                        <div className="error-message text-[#e74c3c] text-xs mt-1 pl-1 w-full">
                          {urlError}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="linked-accounts flex flex-col gap-1 w-full">
                    {user.linkedAccounts.map((account) => (
                      <div key={account.id} className="account-item flex items-center gap-2 p-2 bg-[#ffffff] rounded text-xs sm:text-sm w-full box-border flex-wrap">
                        <span className="material-icons account-icon text-xs sm:text-sm text-[#121731] flex-shrink-0">link</span>
                        <span className="account-name font-semibold text-[#121731] min-w-[60px] sm:min-w-[70px] flex-shrink-0">{account.name}</span>
                        <span className="account-url flex-1 text-[#728a9c] text-xs overflow-hidden text-ellipsis whitespace-nowrap min-w-0">{account.url}</span>
                        {isEditing && (
                          <button 
                            className="remove-account-btn bg-none border-none text-[#728a9c] cursor-pointer p-1 rounded-full text-xs sm:text-sm transition-all duration-300 hover:bg-[#728a9c] hover:text-white flex-shrink-0"
                            onClick={() => removeAccount(account.id)}
                          >
                            <span className="material-icons text-xs sm:text-sm">close</span>
                          </button>
                        )}
                      </div>
                    ))}
                    {user.linkedAccounts.length === 0 && !showAddField && (
                      <div className="no-accounts text-[#728a9c] italic text-center py-2 sm:py-3 text-xs sm:text-sm w-full">
                        No linked accounts
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="edit-actions flex gap-3 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#728a9c] w-full flex-wrap">
                    <button 
                      className="save-btn-large flex items-center gap-2 py-2 px-3 sm:px-4 bg-[#728a9c] text-white rounded-lg cursor-pointer font-semibold transition-colors text-xs sm:text-sm flex-1 min-w-[120px] sm:min-w-[140px] justify-center box-border hover:bg-[#121731]"
                      onClick={saveChanges}
                    >
                      <span className="material-icons text-sm sm:text-base">save</span>
                      Save Changes
                    </button>
                    <button 
                      className="cancel-btn-large flex items-center gap-2 py-2 px-3 sm:px-4 border border-[#728a9c] text-[#728a9c] rounded-lg cursor-pointer font-semibold transition-colors text-xs sm:text-sm flex-1 min-w-[120px] sm:min-w-[140px] justify-center box-border hover:bg-[#728a9c] hover:text-white"
                      onClick={cancelEdit}
                    >
                      <span className="material-icons text-sm sm:text-base">cancel</span>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="posts-container flex flex-col">
          <div className="posts-card bg-white rounded-xl p-4 sm:p-5 shadow-md w-full box-border">
            <h3 className="section-title text-[#121731] text-base sm:text-lg mb-3 pb-2 border-b-2 border-[#728a9c] w-full">MY POSTS</h3>
            <div className="posts-tabs flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 w-full flex-wrap justify-center">
              <button
                className={`border-none py-2 sm:py-3 rounded-lg cursor-pointer transition-all duration-300 font-semibold text-xs sm:text-sm box-border w-full sm:w-auto sm:min-w-[200px] lg:min-w-[270px] ${
                  activeTab === 'offers'
                    ? 'bg-[#121731] text-white'
                    : 'bg-[#ffffff] text-[#121731]'
                }`}
                onClick={() => setActiveTab('offers')}
              >
                MY SKILL OFFERS
              </button>

              <button
                className={`border-none py-2 sm:py-3 rounded-lg cursor-pointer transition-all duration-300 font-semibold text-xs sm:text-sm box-border w-full sm:w-auto sm:min-w-[200px] lg:min-w-[270px] ${
                  activeTab === 'requests'
                    ? 'bg-[#121731] text-white'
                    : 'bg-[#ffffff] text-[#121731]'
                }`}
                onClick={() => setActiveTab('requests')}
              >
                MY SKILL REQUESTS
              </button>
            </div>

            <div className="posts-content min-h-36 w-full">
              {/* My Skill Offers Section */}
              {activeTab === 'offers' && (
                <div className="posts-list flex flex-col gap-2 w-full">
                  {user.skillOffers.map((offer) => (
                    <div key={offer.id} className="post-item bg-[#f8f9fa] rounded-lg p-3 sm:p-5 mb-3 sm:mb-4 border border-[#e9ecef] w-full box-border">
                      <div className="post-header flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2">
                        <h4 className="post-title text-[#121731] m-0 text-base sm:text-lg flex-1 min-w-0">{offer.skills}</h4>
                        <span className="post-time text-[#728a9c] text-xs sm:text-sm whitespace-nowrap">{offer.timePosted}</span>
                      </div>
                      <p className="post-description text-[#555] leading-6 mb-3 sm:mb-4 break-words text-sm sm:text-base">{offer.description}</p>
                      <div className="post-details-grid grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Category:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{offer.category}</span>
                        </div>
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Location:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{offer.location}</span>
                        </div>
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Skills Requested:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{offer.skillsRequested}</span>
                        </div>
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Schedule:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{offer.schedule}</span>
                        </div>
                      </div>
                      {offer.additionalNotes && (
                        <div className="additional-notes my-3 sm:my-4">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Additional Notes:</span>
                          <p className="detail-value text-[#555] text-xs sm:text-sm m-0 mt-1">{offer.additionalNotes}</p>
                        </div>
                      )}
                      {offer.proof && (
                        <div className="proof-image my-3 sm:my-4 flex justify-start">
                          <img src={offer.proof} alt="Proof" className="proof-thumbnail max-w-full h-auto rounded-lg border border-[#ddd] max-h-32 sm:max-h-48" />
                        </div>
                      )}
                      <div className="post-actions flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4 flex-wrap">
                        <button 
                          className="btn edit-btn flex items-center gap-2 py-2 px-3 sm:px-4 bg-[#728a9c] text-white border-none rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-all duration-300 w-full sm:w-auto justify-center opacity-100 visible hover:bg-[#4f5d73]"
                          onClick={() => editOffer(offer)}
                        >
                          <span className="material-icons text-sm sm:text-base">edit</span>
                          Edit
                        </button>
                        <button 
                          className="btn delete-btn flex items-center gap-2 py-2 px-3 sm:px-4 bg-[#e74c3c] text-white border-none rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-all duration-300 w-full sm:w-auto justify-center opacity-100 visible hover:bg-[#c0392b]"
                          onClick={() => deleteOffer(offer.id)}
                        >
                          <span className="material-icons text-sm sm:text-base">delete</span>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {user.skillOffers.length === 0 && (
                    <div className="no-posts text-center text-[#728a9c] italic py-6 sm:py-8 bg-[#f8f9fa] rounded-lg border border-dashed border-[#ddd] w-full box-border text-sm sm:text-base">
                      No skill offers posted yet.
                    </div>
                  )}
                </div>
              )}

              {/* My Skill Requests Section */}
              {activeTab === 'requests' && (
                <div className="posts-list flex flex-col gap-2 w-full">
                  {user.skillRequests.map((request) => (
                    <div key={request.id} className="post-item bg-[#f8f9fa] rounded-lg p-3 sm:p-5 mb-3 sm:mb-4 border border-[#e9ecef] w-full box-border">
                      <div className="post-header flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2">
                        <h4 className="post-title text-[#121731] m-0 text-base sm:text-lg flex-1 min-w-0">{request.request}</h4>
                        <span className="post-time text-[#728a9c] text-xs sm:text-sm whitespace-nowrap">{request.timePosted}</span>
                      </div>
                      <p className="post-description text-[#555] leading-6 mb-3 sm:mb-4 break-words text-sm sm:text-base">{request.description}</p>
                      <div className="post-details-grid grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Category:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{request.category}</span>
                        </div>
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Location:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{request.location}</span>
                        </div>
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Skills Offered:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{request.skillsOffered}</span>
                        </div>
                        <div className="detail-item flex flex-col gap-1">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Schedule:</span>
                          <span className="detail-value text-[#555] text-xs sm:text-sm break-words">{request.schedule}</span>
                        </div>
                      </div>
                      {request.additionalNotes && (
                        <div className="additional-notes my-3 sm:my-4">
                          <span className="detail-label font-semibold text-[#121731] text-xs sm:text-sm">Additional Notes:</span>
                          <p className="detail-value text-[#555] text-xs sm:text-sm m-0 mt-1">{request.additionalNotes}</p>
                        </div>
                      )}
                      {request.proof && (
                        <div className="proof-image my-3 sm:my-4 flex justify-start">
                          <img src={request.proof} alt="Proof" className="proof-thumbnail max-w-full h-auto rounded-lg border border-[#ddd] max-h-32 sm:max-h-48" />
                        </div>
                      )}
                      <div className="post-actions flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4 flex-wrap">
                        <button 
                          className="btn edit-btn flex items-center gap-2 py-2 px-3 sm:px-4 bg-[#728a9c] text-white border-none rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-all duration-300 w-full sm:w-auto justify-center opacity-100 visible hover:bg-[#4f5d73]"
                          onClick={() => editRequest(request)}
                        >
                          <span className="material-icons text-sm sm:text-base">edit</span>
                          Edit
                        </button>
                        <button 
                          className="btn delete-btn flex items-center gap-2 py-2 px-3 sm:px-4 bg-[#e74c3c] text-white border-none rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-all duration-300 w-full sm:w-auto justify-center opacity-100 visible hover:bg-[#c0392b]"
                          onClick={() => deleteRequest(request.id)}
                        >
                          <span className="material-icons text-sm sm:text-base">delete</span>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {user.skillRequests.length === 0 && (
                    <div className="no-posts text-center text-[#728a9c] italic py-6 sm:py-8 bg-[#f8f9fa] rounded-lg border border-dashed border-[#ddd] w-full box-border text-sm sm:text-base">
                      No skill requests posted yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Skill Offer Modal */}
      {showEditOfferModal && (
        <div className="modal-overlay fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4 box-border" onClick={() => setShowEditOfferModal(false)}>
          <div className="modal-content bg-white rounded-xl w-full max-w-[90vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-lg box-border" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[#121731] text-center text-lg sm:text-xl m-0 mb-4 sm:mb-6">Edit Skill Offer</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); saveOfferEdit(); }} className="offer-form flex flex-col gap-4 sm:gap-5">
              <div className="form-group flex flex-col">
                <label htmlFor="edit-skills" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Skills *</label>
                <input 
                  type="text" 
                  id="edit-skills" 
                  value={editingOffer.skills || ''}
                  onChange={(e) => setEditingOffer(prev => ({ ...prev, skills: e.target.value }))}
                  required 
                  placeholder="What skills are you offering?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-description" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Description *</label>
                <textarea 
                  id="edit-description" 
                  value={editingOffer.description || ''}
                  onChange={(e) => setEditingOffer(prev => ({ ...prev, description: e.target.value }))}
                  required 
                  rows="3"
                  placeholder="Describe what you can offer in detail..."
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit resize-y min-h-16 sm:min-h-20"
                ></textarea>
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-category" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Category *</label>
                <select 
                  id="edit-category" 
                  value={editingOffer.category || ''}
                  onChange={(e) => setEditingOffer(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Writing">Writing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Education">Education</option>
                  <option value="Home Services">Home Services</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-location" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Location *</label>
                <input 
                  type="text" 
                  id="edit-location" 
                  value={editingOffer.location || ''}
                  onChange={(e) => setEditingOffer(prev => ({ ...prev, location: e.target.value }))}
                  required 
                  placeholder="Where can you provide this service?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-skills-requested" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Skills Requested</label>
                <input 
                  type="text" 
                  id="edit-skills-requested" 
                  value={editingOffer.skillsRequested || ''}
                  onChange={(e) => setEditingOffer(prev => ({ ...prev, skillsRequested: e.target.value }))}
                  placeholder="What skills are you looking for in return?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-schedule" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Schedule *</label>
                <input 
                  type="text" 
                  id="edit-schedule" 
                  value={editingOffer.schedule || ''}
                  onChange={(e) => setEditingOffer(prev => ({ ...prev, schedule: e.target.value }))}
                  required 
                  placeholder="When are you available?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-additional-notes" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Additional Notes</label>
                <textarea 
                  id="edit-additional-notes" 
                  value={editingOffer.additionalNotes || ''}
                  onChange={(e) => setEditingOffer(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  rows="2"
                  placeholder="Any other important information..."
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit resize-y min-h-12 sm:min-h-16"
                ></textarea>
              </div>
              
              <div className="form-actions flex justify-end gap-3 sm:gap-4 mt-4 sm:mt-5 flex-wrap">
                <button 
                  type="button" 
                  className="cancel-btn1 py-2 px-3 sm:px-4 border border-[#728a9c] text-[#728a9c] rounded-lg cursor-pointer font-medium transition-colors text-xs sm:text-sm hover:bg-[#728a9c] hover:text-white"
                  onClick={() => setShowEditOfferModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn1 py-2 px-3 sm:px-4 bg-[#728a9c] text-white rounded-lg cursor-pointer font-medium transition-colors text-xs sm:text-sm hover:bg-[#121731]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Skill Request Modal */}
      {showEditRequestModal && (
        <div className="modal-overlay fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4 box-border" onClick={() => setShowEditRequestModal(false)}>
          <div className="modal-content bg-white rounded-xl w-full max-w-[90vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-lg box-border" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[#121731] text-center text-lg sm:text-xl m-0 mb-4 sm:mb-6">Edit Skill Request</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); saveRequestEdit(); }} className="request-form flex flex-col gap-4 sm:gap-5">
              <div className="form-group flex flex-col">
                <label htmlFor="edit-request" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Request *</label>
                <input 
                  type="text" 
                  id="edit-request" 
                  value={editingRequest.request || ''}
                  onChange={(e) => setEditingRequest(prev => ({ ...prev, request: e.target.value }))}
                  required 
                  placeholder="What skill are you looking for?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-req-description" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Description *</label>
                <textarea 
                  id="edit-req-description" 
                  value={editingRequest.description || ''}
                  onChange={(e) => setEditingRequest(prev => ({ ...prev, description: e.target.value }))}
                  required 
                  rows="3"
                  placeholder="Describe what you need in detail..."
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit resize-y min-h-16 sm:min-h-20"
                ></textarea>
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-req-category" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Category *</label>
                <select 
                  id="edit-req-category" 
                  value={editingRequest.category || ''}
                  onChange={(e) => setEditingRequest(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Writing">Writing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Education">Education</option>
                  <option value="Home Services">Home Services</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-req-location" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Location *</label>
                <input 
                  type="text" 
                  id="edit-req-location" 
                  value={editingRequest.location || ''}
                  onChange={(e) => setEditingRequest(prev => ({ ...prev, location: e.target.value }))}
                  required 
                  placeholder="Where do you need this service?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-skills-offered" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Skills Offered</label>
                <input 
                  type="text" 
                  id="edit-skills-offered" 
                  value={editingRequest.skillsOffered || ''}
                  onChange={(e) => setEditingRequest(prev => ({ ...prev, skillsOffered: e.target.value }))}
                  placeholder="What skills can you offer in return?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-req-schedule" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Schedule *</label>
                <input 
                  type="text" 
                  id="edit-req-schedule" 
                  value={editingRequest.schedule || ''}
                  onChange={(e) => setEditingRequest(prev => ({ ...prev, schedule: e.target.value }))}
                  required 
                  placeholder="When do you need this done?"
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit"
                />
              </div>
              
              <div className="form-group flex flex-col">
                <label htmlFor="edit-req-additional-notes" className="mb-2 font-semibold text-[#121731] text-xs sm:text-sm">Additional Notes</label>
                <textarea 
                  id="edit-req-additional-notes" 
                  value={editingRequest.additionalNotes || ''}
                  onChange={(e) => setEditingRequest(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  rows="2"
                  placeholder="Any other important information..."
                  className="w-full p-2 sm:p-3 border border-[#ddd] rounded text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none focus:shadow-[0_0_0_2px_rgba(18,23,49,0.2)] box-border font-inherit resize-y min-h-12 sm:min-h-16"
                ></textarea>
              </div>
              
              <div className="form-actions flex justify-end gap-3 sm:gap-4 mt-4 sm:mt-5 flex-wrap">
                <button 
                  type="button" 
                  className="cancel-btn1 px-3 sm:px-4 py-2 border border-[#728a9c] text-[#728a9c] rounded-lg hover:bg-[#b7c8d4] hover:text-white transition-colors text-xs sm:text-sm"
                  onClick={() => setShowEditRequestModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn1 px-3 sm:px-4 py-2 bg-[#121731] text-white rounded-lg hover:bg-[#728a9c] transition-colors text-xs sm:text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="modal-overlay fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4 box-border" onClick={() => setShowDeleteConfirmation(false)}>
          <div className="modal-content bg-white rounded-xl w-full max-w-[90vw] sm:max-w-[400px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-lg box-border" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[#e74c3c] text-center text-lg sm:text-xl m-0 mb-4 sm:mb-6">Confirm Delete</h2>
            <p className="text-center text-[#555] mb-4 sm:mb-6 text-sm sm:text-base leading-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="form-actions flex justify-end gap-3 sm:gap-4 mt-4 sm:mt-5 flex-wrap">
              <button 
                type="button" 
                className="cancel-btn1 px-3 sm:px-4 py-2 border border-[#728a9c] text-[#728a9c] rounded-lg hover:bg-[#b7c8d4] hover:text-white transition-colors text-xs sm:text-sm"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="delete-btn px-4 sm:px-5 py-2 bg-[#e74c3c] text-white border-none rounded-lg cursor-pointer font-medium transition-colors duration-300 hover:bg-[#c0392b] min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}