import { useState } from 'react'
import Modal from './Modal'
import Button from '@/components/atoms/Button'
import Label from '@/components/atoms/Label'
import TextArea from '@/components/atoms/TextArea'
import FileUpload from '@/components/atoms/FileUpload'
import SmallText from '@/components/atoms/SmallText'
import ReportReasonItem from '@/components/molecules/ReportReason'

export default function ReportModal({
  isOpen,
  onClose,
  reportedUserName,
  onSubmit
}) {
  const [selectedReason, setSelectedReason] = useState('')
  const [otherDescription, setOtherDescription] = useState('')
  const [proofFile, setProofFile] = useState(null)

  const reportReasons = [
    { value: 'fraud', label: 'Fraud/Dishonesty' },
    { value: 'harassment', label: 'Harassment/Abuse' },
    { value: 'safety', label: 'Safety Concerns' },
    { value: 'spam', label: 'Spam/Misuse' },
    { value: 'other', label: 'Other' }
  ]

  const handleProofUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setProofFile(file)
    }
  }

  const handleSubmit = () => {
    if (!selectedReason || (selectedReason === 'other' && !otherDescription.trim())) {
      return
    }
    
    const reportData = {
      userName: reportedUserName,
      reason: selectedReason,
      description: selectedReason === 'other' ? otherDescription : 
        reportReasons.find(r => r.value === selectedReason)?.label,
      proof: proofFile
    }
    
    onSubmit(reportData)
    handleClose()
  }

  const handleClose = () => {
    setSelectedReason('')
    setOtherDescription('')
    setProofFile(null)
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen}
      onClose={handleClose}
      title={`Reason for reporting ${reportedUserName}`}
      size="medium"
    >
      <div className="space-y-6">
        {/* Report Reasons */}
        <div className="report-reasons flex flex-col gap-4">
          {reportReasons.map((reason) => (
            <ReportReasonItem
              key={reason.value}
              reason={reason}
              selected={selectedReason === reason.value}
              onSelect={setSelectedReason}
            />
          ))}
        </div>

        {/* Other Description */}
        {selectedReason === 'other' && (
          <div className="description-box">
            <Label htmlFor="report-description" required>
              Description
            </Label>
            <TextArea
              id="report-description"
              value={otherDescription}
              onChange={(e) => setOtherDescription(e.target.value)}
              placeholder="Please describe the reason for reporting..."
              rows={4}
              className="mt-2"
            />
          </div>
        )}

        {/* Proof Upload */}
        <div className="proof-upload-section">
          <Label htmlFor="proof-upload">
            Proof (Optional)
          </Label>
          <FileUpload
            id="proof-upload"
            onChange={handleProofUpload}
            accept="image/*,.pdf,.doc,.docx"
            className="mt-2"
          >
            {proofFile ? proofFile.name : 'Upload Proof'}
          </FileUpload>
          <SmallText className="mt-1">
            You can upload images, PDFs, or documents as evidence
          </SmallText>
        </div>

        {/* Actions */}
        <div className="report-actions flex gap-4 justify-end">
          <Button 
            variant="secondary" 
            onClick={handleClose}
            className="bg-white text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === 'other' && !otherDescription.trim())}
          >
            Submit Report
          </Button>
        </div>
      </div>
    </Modal>
  )
}