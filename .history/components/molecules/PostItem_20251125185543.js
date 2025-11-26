import Card from '@/components/atoms/Card'
import SmallText from '@/components/atoms/SmallText'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function PostItem({
  post,
  type = 'offer',
  onEdit,
  onDelete,
  className = ''
}) {
  const { skills, request, description, category, location, skillsRequested, skillsOffered, schedule, additionalNotes, proof, timePosted } = post

  return (
    <Card className={`mb-4 ${className}`}>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
          <h4 className="text-[#121731] m-0 text-base sm:text-lg flex-1 min-w-0">
            {type === 'offer' ? skills : request}
          </h4>
          <SmallText>{timePosted}</SmallText>
        </div>

        {/* Description */}
        <p className="text-[#555] leading-6 mb-4 break-words text-sm sm:text-base">
          {description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex flex-col gap-1">
            <SmallText weight="semibold" color="dark">Category:</SmallText>
            <SmallText>{category}</SmallText>
          </div>
          <div className="flex flex-col gap-1">
            <SmallText weight="semibold" color="dark">Location:</SmallText>
            <SmallText>{location}</SmallText>
          </div>
          <div className="flex flex-col gap-1">
            <SmallText weight="semibold" color="dark">
              {type === 'offer' ? 'Skills Requested:' : 'Skills Offered:'}
            </SmallText>
            <SmallText>
              {type === 'offer' ? skillsRequested : skillsOffered}
            </SmallText>
          </div>
          <div className="flex flex-col gap-1">
            <SmallText weight="semibold" color="dark">Schedule:</SmallText>
            <SmallText>{schedule}</SmallText>
          </div>
        </div>

        {/* Additional Notes */}
        {additionalNotes && (
          <div className="mb-4">
            <SmallText weight="semibold" color="dark">Additional Notes:</SmallText>
            <SmallText className="mt-1">{additionalNotes}</SmallText>
          </div>
        )}

        {/* Proof Image */}
        {proof && (
          <div className="my-4 flex justify-start">
            <img 
              src={proof} 
              alt="Proof" 
              className="max-w-full h-auto rounded-lg border border-[#ddd] max-h-32 sm:max-h-48" 
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 flex-wrap">
          <Button 
            variant="secondary" 
            size="small"
            onClick={() => onEdit?.(post)}
            className="flex items-center gap-2"
          >
            <Icon name="edit" />
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="small"
            onClick={() => onDelete?.(post.id)}
            className="flex items-center gap-2"
          >
            <Icon name="delete" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}