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
  // New props for custom actions
  actions = [
    { type: 'report', onClick: onReport, label: 'Report' },
    { type: 'contact', onClick: onContact, label: 'Contact' },
    { type: 'profile', onClick: onViewProfile, label: 'View Profile' }
  ],
  customActions = false // Set to true to use custom action configurations
}) {
  const { userName, userPicture, timePosted, request, description, category, location, skills } = post

  return (
    <Card hover className={`min-h-[580px] flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-start mb-6 pb-4 border-b border-gray-300">
        <Avatar src={userPicture} alt={userName} size="medium" className="mr-3" />
        <div className="flex-1">
          <h3 className="text-[#121731] text-lg font-semibold mb-1">{userName}</h3>
          <SmallText>{timePosted}</SmallText>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 flex-1">
        <h4 className="text-[#121731] text-xl font-semibold mb-3">
          {type === 'request' ? post.request : post.skills?.join(', ')}
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
              {type === 'request' ? post.skillsOffered?.join(', ') : post.skillsRequested?.join(', ')}
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
          // Custom action configurations
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
          // Default actions
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