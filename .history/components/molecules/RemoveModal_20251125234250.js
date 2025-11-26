import Modal from './Modal'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function RemoveModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Remove Reported Post",
  message = "Are you sure you want to remove this reported post? This action cannot be undone. The post will be permanently removed from the platform.",
  confirmText = "Confirm Remove",
  post = null,
  className = ''
}) {
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
          <div className="text-left bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-800 text-sm font-medium mb-2">Post Details:</p>
            <p className="text-red-700 text-sm"><strong>User:</strong> {post.userName}</p>
            <p className="text-red-700 text-sm"><strong>Offer:</strong> {post.skills}</p>
            <p className="text-red-700 text-sm"><strong>Reason:</strong> {post.reportReason}</p>
          </div>
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