import Card from '@/components/atoms/Card'
import Avatar from '@/components/atoms/Avatar'
import SmallText from '@/components/atoms/SmallText'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import DashboardActionButton from './DashboardActionButton'

export default function PostCard({
  post,
  type = 'request',
  onReport,
  onContact,
  onViewProfile,
  className = '',
  actions = [
    { type: 'report', onClick: onReport, label: 'Report' },
    { type: 'contact', onClick: onContact, label: 'Contact' },
    { type: 'profile', onClick: onViewProfile, label: 'View Profile' }
  ],
  customActions = false
}) {
  const { userName, userPicture, timePosted, request, description, category, location, skills } = post

  // Helper function to handle both string and array skills
  const formatSkills = (skillsData) => {
    if (Array.isArray(skillsData)) {
      return skillsData.join(', ')
    }
    return skillsData // Return as string if it's already a string
  }

  // Helper function to handle skills offered/requested
  const formatSkillsList = (skillsData) => {
    if (Array.isArray(skillsData)) {
      return skillsData.join(', ')
    }
    return skillsData || 'Not specified'
  }

  // Handle image error specifically for PostCard
  const handleImageError = (event) => {
    console.log('Image failed to load:', userPicture);
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
  }

  return (
    <Card hover className={`min-h-[580px] flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-start mb-6 pb-4 border-b border-gray-300">
        <div className="flex items-center gap-3">
          {/* Temporary fix: Use img tag directly to debug */}
          <img 
            src={userPicture} 
            alt={userName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
            onError={handleImageError}
          />
          <div className="flex-1">
            <h3 className="text-[#121731] text-lg font-semibold mb-1">{userName}</h3>
            <SmallText>{timePosted}</SmallText>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 flex-1">
        <h4 className="text-[#121731] text-xl font-semibold mb-3">
          {type === 'request' ? post.request : formatSkills(post.skills)}
        </h4>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SmallText weight="semibold" color="dark">Category:</SmallText>
            <SmallText>{category}</SmallText>
          </div>
          <div>
            <SmallText weight="semibold" color="dark">Location:</SmallText>
            <SmallText>{location}</SmallText>
          </div>
          <div>
            <SmallText weight="semibold" color="dark">
              {type === 'request' ? 'Skills Offered:' : 'Skills Requested:'}
            </SmallText>
            <SmallText>
              {type === 'request' 
                ? formatSkillsList(post.skillsOffered) 
                : formatSkillsList(post.skillsRequested)
              }
            </SmallText>
          </div>
          <div>
            <SmallText weight="semibold" color="dark">Schedule:</SmallText>
            <SmallText>{post.schedule}</SmallText>
          </div>
        </div>

        {post.additionalNotes && (
          <div className="mt-4">
            <SmallText weight="semibold" color="dark">Additional Notes:</SmallText>
            <SmallText>{post.additionalNotes}</SmallText>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap mt-auto">
        {customActions ? (
          actions.map((action, index) => (
            <DashboardActionButton
              key={index}
              type={action.type}
              onClick={action.onClick}
              className={action.className}
            >
              {action.label}
            </DashboardActionButton>
          ))
        ) : (
          <>
            <DashboardActionButton type="report" onClick={() => onReport?.(post)}>
              Report
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