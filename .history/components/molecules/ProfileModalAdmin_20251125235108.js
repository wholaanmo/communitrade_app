import Avatar from '@/components/atoms/Avatar'
import SmallText from '@/components/atoms/SmallText'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Card from '@/components/atoms/Card'

export default function ProfileModalAdmin({
  isOpen,
  onClose,
  profile,
  onReport,
  onContact,
  onDeletePost,
  className = ''
}) {
  if (!isOpen) return null

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

  const handleDeleteFromProfile = (post, type) => {
    onDeletePost?.(post, type)
  }

  return (
    <div
      className="fixed inset-0 bg-[rgba(211,211,211,0.5)] backdrop-blur-[1px] flex justify-center items-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="profile-header flex items-center mb-8 pb-5 border-b border-gray-300">
          <Avatar 
            src={userPicture} 
            alt={fullName} 
            size="xlarge" 
            className="mr-5"
          />
          <div className="profile-info">
            <div className="name-verified flex items-center gap-3 mb-2">
              <h2 className="m-0 text-[#121731] text-left text-2xl font-semibold">{fullName}</h2>
              {isVerified && (
                <span className="verified-badge flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  <Icon name="verified" className="text-base mr-0.5" />
                  Verified
                </span>
              )}
            </div>
            <p className="profile-email m-1 text-[#728a9c]">{email}</p>
            <p className="profile-phone m-1 text-[#728a9c]">{phone}</p>
          </div>
        </div>

        <div className="profile-sections flex flex-col gap-6">
          {/* Linked Accounts Section */}
          <div className="profile-section">
            <h3 className="m-0 mb-4 text-[#121731] text-xl">Linked Accounts</h3>
            <div className="linked-accounts flex flex-col gap-3">
              {linkedAccounts.length > 0 ? (
                linkedAccounts.map(account => (
                  <a 
                    key={account.platform}
                    href={account.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="account-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-inherit transition-colors duration-300 hover:bg-gray-200"
                  >
                    <Icon name={account.icon} className="text-[#121731] text-xl" />
                    <span className="account-platform flex-1 font-medium">{account.platform}</span>
                  </a>
                ))
              ) : (
                <SmallText color="gray">No linked accounts</SmallText>
              )}
            </div>
          </div>

          {/* Skill Offer Posts Section */}
          <div className="profile-section">
            <h3 className="m-0 mb-4 text-[#121731] text-xl">Skill Offer Posts</h3>
            <div className="posts-list flex flex-col gap-5">
              {skillOffers.length > 0 ? (
                skillOffers.map(offer => (
                  <Card key={offer.id} className="p-5 border border-gray-300">
                    <div className="post-header flex justify-between items-start mb-3">
                      <h4 className="m-0 text-[#121731] flex-1">{offer.skills}</h4>
                      <SmallText color="gray">{offer.timePosted}</SmallText>
                    </div>
                    <p className="post-description m-0 mb-4 text-gray-700 leading-relaxed">{offer.description}</p>
                    <div className="post-details grid grid-cols-2 gap-3 mb-4">
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Category:</SmallText>
                        <SmallText>{offer.category}</SmallText>
                      </div>
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Location:</SmallText>
                        <SmallText>{offer.location}</SmallText>
                      </div>
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Skills Requested:</SmallText>
                        <SmallText>{offer.skillsRequested}</SmallText>
                      </div>
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Schedule:</SmallText>
                        <SmallText>{offer.schedule}</SmallText>
                      </div>
                    </div>
                    {offer.additionalNotes && (
                      <div className="additional-notes mb-4">
                        <SmallText weight="semibold" color="dark" className="mb-1">Additional Notes:</SmallText>
                        <SmallText>{offer.additionalNotes}</SmallText>
                      </div>
                    )}
                    {offer.proof && (
                      <div className="proof-image my-4">
                        <img 
                          src={offer.proof} 
                          alt="Proof" 
                          className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                    <div className="post-actions flex gap-3 mt-4">
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleDeleteFromProfile(offer, 'offer')}
                      >
                        <Icon name="delete" className="mr-1" />
                        Delete
                      </Button>
                      <Button
                        variant="contact"
                        size="small"
                        onClick={() => onContact?.(offer)}
                      >
                        <Icon name="message" className="mr-1" />
                        Contact
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <SmallText color="gray">No skill offer posts</SmallText>
              )}
            </div>
          </div>

          {/* Skill Request Posts Section */}
          <div className="profile-section">
            <h3 className="m-0 mb-4 text-[#121731] text-xl">Skill Request Posts</h3>
            <div className="posts-list flex flex-col gap-5">
              {skillRequests.length > 0 ? (
                skillRequests.map(request => (
                  <Card key={request.id} className="p-5 border border-gray-300">
                    <div className="post-header flex justify-between items-start mb-3">
                      <h4 className="m-0 text-[#121731] flex-1">{request.request}</h4>
                      <SmallText color="gray">{request.timePosted}</SmallText>
                    </div>
                    <p className="post-description m-0 mb-4 text-gray-700 leading-relaxed">{request.description}</p>
                    <div className="post-details grid grid-cols-2 gap-3 mb-4">
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Category:</SmallText>
                        <SmallText>{request.category}</SmallText>
                      </div>
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Location:</SmallText>
                        <SmallText>{request.location}</SmallText>
                      </div>
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Skills Offered:</SmallText>
                        <SmallText>{request.skillsOffered}</SmallText>
                      </div>
                      <div className="detail-item flex flex-col">
                        <SmallText weight="semibold" color="dark" className="mb-1">Schedule:</SmallText>
                        <SmallText>{request.schedule}</SmallText>
                      </div>
                    </div>
                    {request.additionalNotes && (
                      <div className="additional-notes mb-4">
                        <SmallText weight="semibold" color="dark" className="mb-1">Additional Notes:</SmallText>
                        <SmallText>{request.additionalNotes}</SmallText>
                      </div>
                    )}
                    {request.proof && (
                      <div className="proof-image my-4">
                        <img 
                          src={request.proof} 
                          alt="Proof" 
                          className="proof-thumbnail w-full max-w-[200px] rounded-lg border border-gray-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                    <div className="post-actions flex gap-3 mt-4">
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleDeleteFromProfile(request, 'request')}
                      >
                        <Icon name="delete" className="mr-1" />
                        Delete
                      </Button>
                      <Button
                        variant="contact"
                        size="small"
                        onClick={() => onContact?.(request)}
                      >
                        <Icon name="message" className="mr-1" />
                        Contact
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <SmallText color="gray">No skill request posts</SmallText>
              )}
            </div>
          </div>
        </div>

        <div className="profile-actions flex justify-end mt-8 pt-5 border-t border-gray-300">
          <Button 
            variant="primary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}