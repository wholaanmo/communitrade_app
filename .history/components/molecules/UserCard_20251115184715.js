import Avatar from '@/components/atoms/Avatar'
import SmallText from '@/components/atoms/SmallText'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function UserCard({
  user,
  onReport,
  onContact,
  onViewProfile,
  className = ''
}) {
  const { userName, userPicture, timePosted, isVerified } = user

  return (
    <div className={`flex items-center p-4 border-b border-gray-200 ${className}`}>
      <Avatar src={userPicture} alt={userName} size="medium" className="mr-4" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[#121731] text-lg font-semibold">{userName}</h3>
          {isVerified && (
            <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              <Icon name="verified" size="sm" />
              Verified
            </span>
          )}
        </div>
        <SmallText>{timePosted}</SmallText>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline-danger" 
          size="small"
          onClick={() => onReport?.(user)}
        >
          <Icon name="flag" size="sm" />
        </Button>
        <Button 
          variant="outline" 
          size="small"
          onClick={() => onContact?.(user)}
        >
          <Icon name="message" size="sm" />
        </Button>
      </div>
    </div>
  )
}