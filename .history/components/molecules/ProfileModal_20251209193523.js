import { useState } from 'react'
import Icon from '@/components/atoms/Icon'

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  onReport,
  onContact,
  onDelete,
  onEdit,   
  className = ''
}) {
  const {
    fullName,
    email,
    phone,
    isVerified,
    userPicture,
    linkedAccounts = [],
    skillOffers = [],
    skillRequests = []
  } = profile

  const handleImageError = (event) => {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-1000 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 pb-5 border-b border-gray-200">
          <img
            src={userPicture}
            alt={fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mr-0 sm:mr-5 mb-4 sm:mb-0"
            onError={handleImageError}
          />
          <div className="profile-info">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
              <h2 className="text-[#121731] text-lg sm:text-xl font-semibold">{fullName}</h2>
              {isVerified && (
                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <Icon name="verified" className="text-base" />
                  Verified
                </span>
              )}
            </div>
            <p className="text-[#728a9c] text-sm sm:text-base mb-1">{email}</p>
            <p className="text-[#728a9c] text-sm sm:text-base">{phone}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Linked Accounts Section */}
          <div>
            <h3 className="text-[#121731] text-base sm:text-lg mb-3 sm:mb-4">Linked Accounts</h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              {linkedAccounts.map((account, index) => (
                <a
                  key={index}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-current transition-colors hover:bg-gray-200 text-sm sm:text-base"
                >
                  <Icon name={account.icon} className="text-[#121731] text-base sm:text-lg" />
                  <span className="flex-1 font-medium">{account.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Skill Offer Posts Section */}
          <div>
            <h3 className="text-[#121731] text-base sm:text-lg mb-3 sm:mb-4">Skill Offer Posts</h3>
            <div className="flex flex-col gap-4 sm:gap-5">
              {skillOffers.map((offer) => (
                <div key={offer.id} className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                    <h4 className="text-[#121731] text-sm sm:text-base flex-1">{offer.skills}</h4>
                    <span className="text-[#728a9c] text-xs sm:text-sm">{offer.timePosted}</span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">{offer.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Category:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{offer.category}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Location:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{offer.location}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Skills Requested:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{offer.skillsRequested}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Schedule:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{offer.schedule}</span>
                    </div>
                  </div>
                  {offer.additionalNotes && (
                    <div className="mb-3 sm:mb-4">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm">Additional Notes:</span>
                      <p className="text-gray-600 mt-1 text-xs sm:text-sm">{offer.additionalNotes}</p>
                    </div>
                  )}
                  {offer.proof && (
                    <div className="my-3 sm:my-4">
                      <img src={offer.proof} alt="Proof" className="w-full max-w-[150px] sm:max-w-[200px] rounded-lg border border-gray-300" />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                    {/* Conditionally show Report/Contact vs Delete/Edit */}
                    {onDelete && onEdit ? (
  
                      <>
                        <button
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-red-600 text-red-600 transition-all hover:bg-red-600 hover:text-white text-xs sm:text-sm"
                          onClick={() => onDelete?.(offer)}
                        >
                          <Icon name="delete" className="mr-1 text-sm" />
                          Delete
                        </button>
                        <button
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-blue-600 text-blue-600 transition-all hover:bg-blue-600 hover:text-white text-xs sm:text-sm"
                          onClick={() => onEdit?.(offer)}
                        >
                          <Icon name="edit" className="mr-1 text-sm" />
                          Edit
                        </button>
                      </>
                    ) : (
                      // Show Report and Contact buttons for others' posts
                      <>
                        <button
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-[#e74c3c] text-[#e74c3c] transition-all hover:bg-[#e74c3c] hover:text-white text-xs sm:text-sm"
                          onClick={() => onReport?.(offer, fullName)}
                        >
                          <Icon name="flag" className="mr-1 text-sm" />
                          Report
                        </button>
                        <button 
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-[#121731] text-[#121731] transition-all hover:bg-[#121731] hover:text-white text-xs sm:text-sm"
                          onClick={() => onContact?.(offer)}
                        >
                          <Icon name="message" className="mr-1 text-sm" />
                          Contact
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Request Posts Section */}
          <div>
            <h3 className="text-[#121731] text-base sm:text-lg mb-3 sm:mb-4">Skill Request Posts</h3>
            <div className="flex flex-col gap-4 sm:gap-5">
              {skillRequests.map((request) => (
                <div key={request.id} className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                    <h4 className="text-[#121731] text-sm sm:text-base flex-1">{request.request}</h4>
                    <span className="text-[#728a9c] text-xs sm:text-sm">{request.timePosted}</span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">{request.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Category:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{request.category}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Location:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{request.location}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Skills Offered:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{request.skillsOffered}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm mb-1">Schedule:</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{request.schedule}</span>
                    </div>
                  </div>
                  {request.additionalNotes && (
                    <div className="mb-3 sm:mb-4">
                      <span className="text-[#121731] font-semibold text-xs sm:text-sm">Additional Notes:</span>
                      <p className="text-gray-600 mt-1 text-xs sm:text-sm">{request.additionalNotes}</p>
                    </div>
                  )}
                  {request.proof && (
                    <div className="my-3 sm:my-4">
                      <img src={request.proof} alt="Proof" className="w-full max-w-[150px] sm:max-w-[200px] rounded-lg border border-gray-300" />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                    {/* Conditionally show Report/Contact vs Delete/Edit */}
                    {onDelete && onEdit ? (
                      // Show Delete and Edit buttons for own posts
                      <>
                        <button
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-red-600 text-red-600 transition-all hover:bg-red-600 hover:text-white text-xs sm:text-sm"
                          onClick={() => onDelete?.(request)}
                        >
                          <Icon name="delete" className="mr-1 text-sm" />
                          Delete
                        </button>
                        <button
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-blue-600 text-blue-600 transition-all hover:bg-blue-600 hover:text-white text-xs sm:text-sm"
                          onClick={() => onEdit?.(request)}
                        >
                          <Icon name="edit" className="mr-1 text-sm" />
                          Edit
                        </button>
                      </>
                    ) : (
                      // Show Report and Contact buttons for others' posts
                      <>
                        <button
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-[#e74c3c] text-[#e74c3c] transition-all hover:bg-[#e74c3c] hover:text-white text-xs sm:text-sm"
                          onClick={() => onReport?.(request, fullName)}
                        >
                          <Icon name="flag" className="mr-1 text-sm" />
                          Report
                        </button>
                        <button 
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border border-[#121731] text-[#121731] transition-all hover:bg-[#121731] hover:text-white text-xs sm:text-sm"
                          onClick={() => onContact?.(request)}
                        >
                          <Icon name="message" className="mr-1 text-sm" />
                          Contact
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-gray-200">
          <button
            className="px-4 sm:px-5 py-2 bg-[#121731] text-white rounded-lg transition-colors hover:bg-[#728a9c] text-sm sm:text-base"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}