import Card from '@/components/atoms/Card'
import Avatar from '@/components/atoms/Avatar'
import SmallText from '@/components/atoms/SmallText'
import DashboardActionButton from '@/components/molecules/DashboardActionButton'

export default function PostCardAdmin({
  post,
  type = 'offer',
  isReported = false,
  onDelete,
  onContact,
  onViewProfile,
  onKeep,
  onRemove,
  className = ''
}) {
  const {
    userName,
    userPicture,
    timePosted,
    skills,
    description,
    category,
    location,
    skillsRequested,
    schedule,
    additionalNotes,
    reportReason,
    proof
  } = post

  // Function to handle image errors
  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src)
    e.target.style.display = 'none'
  }

  // Function to check if image URL is valid
  const isValidImageUrl = (url) => {
    if (!url) return false
    return url.startsWith('data:') || url.startsWith('http') || url.startsWith('/')
  }

  return (
    <Card hover className={`min-h-[580px] flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center p-5 border-b border-gray-200">
        <Avatar src={userPicture} alt={userName} size="medium" className="mr-4" />
        <div className="flex-1">
          <h3 className="text-[#121731] text-lg font-semibold mb-1">{userName}</h3>
          <SmallText>{timePosted}</SmallText>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1">
        <h2 className="text-[#121731] text-xl font-semibold mb-4">{skills}</h2>
        <p className="text-gray-700 leading-relaxed mb-5">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col">
            <SmallText weight="semibold" color="dark" className="mb-1">Category:</SmallText>
            <SmallText>{category}</SmallText>
          </div>
          <div className="flex flex-col">
            <SmallText weight="semibold" color="dark" className="mb-1">Location:</SmallText>
            <SmallText>{location}</SmallText>
          </div>
          <div className="flex flex-col">
            <SmallText weight="semibold" color="dark" className="mb-1">Skills Requested:</SmallText>
            <SmallText>{skillsRequested}</SmallText>
          </div>
          <div className="flex flex-col">
            <SmallText weight="semibold" color="dark" className="mb-1">Schedule:</SmallText>
            <SmallText>{schedule}</SmallText>
          </div>
        </div>
        
        {additionalNotes && (
          <div className="mt-4">
            <SmallText weight="semibold" color="dark" className="mb-1">Additional Notes:</SmallText>
            <SmallText>{additionalNotes}</SmallText>
          </div>
        )}

        {proof && isValidImageUrl(proof) && (
          <div className="mt-4">
            <SmallText weight="semibold" color="dark" className="mb-2">Proof:</SmallText>
            <div className="flex flex-wrap gap-3">
              <img
                src={proof}
                alt="Proof"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
                onError={handleImageError}
                onLoad={(e) => console.log('Proof image loaded successfully:', proof)}
              />
            </div>
          </div>
        )}

        {isReported && reportReason && (
          <div className="mt-5 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <SmallText weight="bold" color="dark" className="text-yellow-800 mb-1">
              Reason for Report:
            </SmallText>
            <SmallText color="dark" className="text-yellow-800">
              {reportReason}
            </SmallText>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-4 border-t border-gray-200 mt-auto">
        {isReported ? (
          <>
            <DashboardActionButton type="keep" onClick={() => onKeep?.(post)}>
              Keep
            </DashboardActionButton>
            <DashboardActionButton type="remove" onClick={() => onRemove?.(post)}>
              Remove
            </DashboardActionButton>
            <DashboardActionButton type="profile" onClick={() => onViewProfile?.(post)}>
              View Profile
            </DashboardActionButton>
          </>
        ) : (
          <>
            <DashboardActionButton type="delete" onClick={() => onDelete?.(post)}>
              Delete
            </DashboardActionButton>
            <DashboardActionButton type="contact" onClick={() => onContact?.(post)}>
              Contact
            </DashboardActionButton>
            <DashboardActionButton type="profile" onClick={() => onViewProfile?.(post)}>
              View Profile
            </DashboardActionButton>
          </>
        )}
      </div>
    </Card>
  )
}