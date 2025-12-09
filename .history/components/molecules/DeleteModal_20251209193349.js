import Modal from './Modal'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Post",
  message = "Are you sure you want to delete this post? This action cannot be undone.",
  confirmText = "Confirm Delete",
  post = null,
  profileName = '', 
  className = ''
}) {

  const getUserName = () => {
    if (profileName) return profileName
    if (post?.userName) return post.userName
    if (post?.fullName) return post.fullName
    return 'Unknown User'
  }

  // Get the post title/description
  const getPostTitle = () => {
    if (post?.skills) return post.skills
    if (post?.request) return post.request
    return 'Unknown Post'
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      showCloseButton={false}
      className={className}
    >
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Icon name="warning" className="text-red-600 text-5xl" />
        </div>
        <p className="text-gray-700 mb-4 text-lg font-semibold">
          {message}
        </p>
        {post && (
          <p className="text-gray-600 text-sm">
            Post: <span className="font-medium">"{getPostTitle()}"</span> by {getUserName()}
          </p>
        )}
      </div>
      <div className="flex gap-3 justify-center">
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}