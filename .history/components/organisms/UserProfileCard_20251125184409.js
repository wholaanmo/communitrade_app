import { User } from '@/types';
import Card from '@/components/atoms/Card';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import SmallText from '@/components/atoms/SmallText';

/**
 * UserProfileCard organism composed from atoms and molecules
 */
export default function UserProfileCard({
  user,
  onEdit,
  onUploadPhoto,
  className = ''
}) {
  return (
    <Card className={className}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Avatar 
            src={user.avatar} 
            alt={user.firstName} 
            size="large"
          />
          {onUploadPhoto && (
            <Button
              variant="secondary"
              size="small"
              onClick={onUploadPhoto}
              className="mt-2 w-full"
            >
              Change Photo
            </Button>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#121731]">
            {user.firstName} {user.lastName}
          </h3>
          <SmallText color="gray" className="mb-2">
            @{user.username}
          </SmallText>
          
          <div className="space-y-2">
            <div>
              <SmallText weight="semibold">Email:</SmallText>
              <SmallText>{user.email}</SmallText>
            </div>
            <div>
              <SmallText weight="semibold">Phone:</SmallText>
              <SmallText>{user.phoneNumber}</SmallText>
            </div>
            <div>
              <SmallText weight="semibold">Status:</SmallText>
              <SmallText color={user.status === 'active' ? 'success' : 'danger'}>
                {user.status}
              </SmallText>
            </div>
          </div>
          
          {onEdit && (
            <Button
              variant="primary"
              onClick={onEdit}
              className="mt-4"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}