import Modal from './Modal'
import Card from '@/components/atoms/Card'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import SmallText from '@/components/atoms/SmallText'

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  onReport,
  onContact,
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Profile"
      size="xlarge"
      className={className}
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="profile-header flex items-center gap-4 pb-4 border-b border-gray-200">
          <Avatar 
            src={userPicture} 
            alt={fullName}
            size="large"
            onError={handleImageError}
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[#121731] text-xl font-semibold">{fullName}</h3>
              {isVerified && (
                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <Icon name="verified" size="sm" />
                  Verified
                </span>
              )}
            </div>
            <SmallText className="block mb-1">{email}</SmallText>
            <SmallText>{phone}</SmallText>
          </div>
        </div>

        {/* Linked Accounts */}
        {linkedAccounts.length > 0 && (
          <div>
            <h4 className="text-[#121731] font-semibold mb-3">Linked Accounts</h4>
            <div className="space-y-2">
              {linkedAccounts.map((account, index) => (
                <a
                  key={index}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg no-underline text-current transition-colors hover:bg-gray-200"
                >
                  <Icon name={account.icon} />
                  <span className="font-medium">{account.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Skill Offers */}
        {skillOffers.length > 0 && (
          <div>
            <h4 className="text-[#121731] font-semibold mb-3">Skill Offer Posts</h4>
            <div className="space-y-4">
              {skillOffers.map(offer => (
                <Card key={offer.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h5 className="text-[#121731] font-semibold">{offer.skills}</h5>
                      <SmallText>{offer.timePosted}</SmallText>
                    </div>
                    <p className="text-gray-600">{offer.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <SmallText weight="semibold">Category:</SmallText>
                        <SmallText>{offer.category}</SmallText>
                      </div>
                      <div>
                        <SmallText weight="semibold">Location:</SmallText>
                        <SmallText>{offer.location}</SmallText>
                      </div>
                      <div>
                        <SmallText weight="semibold">Skills Requested:</SmallText>
                        <SmallText>{offer.skillsRequested}</SmallText>
                      </div>
                      <div>
                        <SmallText weight="semibold">Schedule:</SmallText>
                        <SmallText>{offer.schedule}</SmallText>
                      </div>
                    </div>
                    {offer.additionalNotes && (
                      <div>
                        <SmallText weight="semibold">Additional Notes:</SmallText>
                        <SmallText>{offer.additionalNotes}</SmallText>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline-danger"
                        size="small"
                        onClick={() => onReport?.(offer, fullName)}
                      >
                        <Icon name="flag" className="mr-1" />
                        Report
                      </Button>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => onContact?.(offer)}
                      >
                        <Icon name="message" className="mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Skill Requests */}
        {skillRequests.length > 0 && (
          <div>
            <h4 className="text-[#121731] font-semibold mb-3">Skill Request Posts</h4>
            <div className="space-y-4">
              {skillRequests.map(request => (
                <Card key={request.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h5 className="text-[#121731] font-semibold">{request.request}</h5>
                      <SmallText>{request.timePosted}</SmallText>
                    </div>
                    <p className="text-gray-600">{request.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <SmallText weight="semibold">Category:</SmallText>
                        <SmallText>{request.category}</SmallText>
                      </div>
                      <div>
                        <SmallText weight="semibold">Location:</SmallText>
                        <SmallText>{request.location}</SmallText>
                      </div>
                      <div>
                        <SmallText weight="semibold">Skills Offered:</SmallText>
                        <SmallText>{request.skillsOffered}</SmallText>
                      </div>
                      <div>
                        <SmallText weight="semibold">Schedule:</SmallText>
                        <SmallText>{request.schedule}</SmallText>
                      </div>
                    </div>
                    {request.additionalNotes && (
                      <div>
                        <SmallText weight="semibold">Additional Notes:</SmallText>
                        <SmallText>{request.additionalNotes}</SmallText>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline-danger"
                        size="small"
                        onClick={() => onReport?.(request, fullName)}
                      >
                        <Icon name="flag" className="mr-1" />
                        Report
                      </Button>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => onContact?.(request)}
                      >
                        <Icon name="message" className="mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}