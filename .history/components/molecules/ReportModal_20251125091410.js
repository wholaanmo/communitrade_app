import { useState } from 'react'
import Modal from './Modal'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import TextArea from '@/components/atoms/TextArea'
import Label from '@/components/atoms/Label'
import FileUpload from '@/components/atoms/FileUpload'
import SmallText from '@/components/atoms/SmallText'

export default function ReportModal({
  isOpen,
  onClose,
  reportedUserName,
  onSubmit,
  className = ''
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
      description: selectedReason === 'other' ? otherDescription : reportReasons.find(r => r.value === selectedReason)?.label,
      proof: proofFile
    }
    
    onSubmit?.(reportData)
    resetForm()
  }

  const resetForm = () => {
    setSelectedReason('')
    setOtherDescription('')
    setProofFile(null)
  }

  const handleClose = () => {
    resetForm()
    onClose?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Reason for reporting ${reportedUserName}`}
      size="medium"
      className={className}
    >
      <div className="space-y-6">
        <div className="report-reasons flex flex-col gap-4">
          {reportReasons.map((reason) => (
            <label key={reason.value} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:border-[#121731] hover:bg-gray-50">
              <Input
                type="radio"
                name="report-reason"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="mr-3"
              />
              <span className="font-medium text-[#121731]">{reason.label}</span>
            </label>
          ))}
        </div>
        
        {selectedReason === 'other' && (
          <div className="description-box">
            <Label htmlFor="report-description">Description</Label>
            <TextArea
              id="report-description"
              value={otherDescription}
              onChange={(e) => setOtherDescription(e.target.value)}
              placeholder="Please describe the reason for reporting..."
              rows={4}
            />
          </div>
        )}
        
        <div className="proof-upload-section">
          <Label htmlFor="proof-upload">Proof (Optional)</Label>
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