import Modal from './Modal'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function KeepModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Keep Reported Post",
  message = "Are you sure you want to keep this reported post? This post will be removed from the reported list but will remain visible on the platform.",
  confirmText = "Confirm Keep",
  post = null,
  className = ''
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      className={className}
    >
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Icon name="check_circle" className="text-green-600 text-5xl" />
        </div>
        <p className="text-gray-700 mb-4 text-lg font-semibold">
          {message}
        </p>
        {post && (
          <div className="text-left bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-green-800 text-sm font-medium mb-2">Post Details:</p>
            <p className="text-green-700 text-sm"><strong>User:</strong> {post.userName}</p>
            <p className="text-green-700 text-sm"><strong>Offer:</strong> {post.skills}</p>
            <p className="text-green-700 text-sm"><strong>Report Reason:</strong> {post.reportReason}</p>
          </div>
        )}
      </div>
      <div className="flex gap-3 justify-center">
        <Button variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}