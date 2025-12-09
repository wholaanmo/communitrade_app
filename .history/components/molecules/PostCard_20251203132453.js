import Card from '@/components/atoms/Card'
import Avatar from '@/components/atoms/Avatar'
import SmallText from '@/components/atoms/SmallText'
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
  const { userName, userPicture, timePosted, request, description, category, location, skills, proof, additionalNotes } = post

  const formatSkills = (skillsData) => {
    if (Array.isArray(skillsData)) {
      return skillsData.join(', ')
    }
    return skillsData
  }

  const formatSkillsList = (skillsData) => {
    if (Array.isArray(skillsData)) {
      return skillsData.join(', ')
    }
    return skillsData || 'Not specified'
  }

  const handleProofImageError = (event) => {
    console.log('Proof image failed to load:', proof);
    event.target.style.display = 'none';
  }

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

        {/* Proof Images - Made Larger */}
        {proof && (
  <div className="mt-4">
    <SmallText weight="semibold" color="dark" className="mb-3">Proof:</SmallText>
    <div className="flex flex-wrap gap-3">
      {typeof proof === 'string' && proof.startsWith('data:image') ? (
        // Base64 image
        <img
          src={proof}
          alt="Proof"
          className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
          onError={handleProofImageError}
        />
      ) : Array.isArray(proof) ? (
        // Array of images
        proof.map((proofItem, index) => (
          <img
            key={index}
            src={typeof proofItem === 'string' ? proofItem : URL.createObjectURL(proofItem)}
            alt={`Proof ${index + 1}`}
            className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
            onError={handleProofImageError}
          />
        ))
      ) : (
        // Regular URL
        <img
          src={typeof proof === 'string' ? proof : URL.createObjectURL(proof)}
          alt="Proof"
          className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
          onError={handleProofImageError}
        />
      )}
    </div>
  </div>
)}

        {additionalNotes && (
          <div className="mt-4">
            <SmallText weight="semibold" color="dark">Additional Notes:</SmallText>
            <SmallText>{additionalNotes}</SmallText>
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
