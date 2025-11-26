import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Card from '@/components/atoms/Card'
import ProfileInfo from '@/components/molecules/ProfileInfo'
import LinkedAccounts from '@/components/molecules/LinkedAccounts'

export default function ProfileSection({
  user,
  isEditing = false,
  editData = {},
  onEditToggle,
  onSaveChanges,
  onCancelEdit,
  onProfilePicChange,
  onEditDataChange,
  className = ''
}) {
  return (
    <Card className={className}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-[#728a9c]">
        <h2 className="text-[#121731] text-xl font-semibold">Profile Information</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onEditToggle}
          className="hover:scale-105"
        >
          <Icon name={isEditing ? 'close' : 'edit'} />
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="relative">
            <Avatar 
              src={user.profileImageUrl} 
              alt={user.fullName}
              size="xlarge"
            />
            {isEditing && (
              <Button
                variant="primary"
                size="icon"
                onClick={onProfilePicChange}
                className="absolute bottom-0 right-0 hover:scale-110"
              >
                <Icon name="photo_camera" />
              </Button>
            )}
          </div>
          {isEditing ? (
            <ProfileInfo
              label="FULL NAME"
              value={user.fullName}
              isEditing={isEditing}
              editValue={editData.fullName}
              onEditChange={(value) => onEditDataChange?.('fullName', value)}
            />
          ) : (
            <h3 className="text-[#121731] text-lg text-center break-words w-full">
              {user.fullName}
            </h3>
          )}
        </div>

        {/* Profile Information */}
        <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
          <ProfileInfo
            label="FULL NAME"
            value={user.fullName}
            isEditing={isEditing}
            editValue={editData.fullName}
            onEditChange={(value) => onEditDataChange?.('fullName', value)}
          />

          <ProfileInfo
            label="USERNAME"
            value={user.username}
            isEditing={isEditing}
            editValue={editData.username}
            onEditChange={(value) => onEditDataChange?.('username', value)}
            disabled={true}
          />

          <ProfileInfo
            label="EMAIL ADDRESS"
            value={user.email}
            isEditing={isEditing}
            editValue={editData.email}
            onEditChange={(value) => onEditDataChange?.('email', value)}
            type="email"
          />

          <ProfileInfo
            label="PHONE NUMBER"
            value={user.phone}
            isEditing={isEditing}
            editValue={editData.phone}
            onEditChange={(value) => onEditDataChange?.('phone', value)}
            type="tel"
          />

          {/* Government ID Section */}
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-[#121731] text-sm uppercase tracking-wider">
              GOVERNMENT ID:
            </label>
            {/* ID upload/display logic would go here */}
          </div>

          {/* Profile Picture Validation */}
          {!user.hasProfilePicture && (
            <div className="flex items-center gap-2 p-3 bg-[#fff3cd] border border-[#ffeaa7] rounded-lg text-[#856404] text-sm">
              <Icon name="info" />
              You must upload a profile picture before you can post on the website.
            </div>
          )}

          {/* Linked Accounts */}
          <LinkedAccounts
            accounts={user.linkedAccounts}
            isEditing={isEditing}
            onAccountsChange={(accounts) => onEditDataChange?.('linkedAccounts', accounts)}
          />

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex gap-4 mt-6 pt-4 border-t border-[#728a9c]">
              <Button
                variant="primary"
                onClick={onSaveChanges}
                className="flex items-center gap-2 flex-1"
              >
                <Icon name="save" />
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={onCancelEdit}
                className="flex items-center gap-2 flex-1"
              >
                <Icon name="cancel" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}