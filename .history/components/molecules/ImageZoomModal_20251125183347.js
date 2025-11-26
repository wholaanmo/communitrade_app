'use client'

import { useEffect } from 'react'
import Modal from '@/components/molecules/Modal'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'

const ImageZoomModal = ({ isOpen, onClose, imageUrl, altText = "Proof image" }) => {
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleZoomIn = () => {
    const img = document.getElementById('zoomed-image')
    if (img) {
      const currentScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1
      img.style.transform = `scale(${Math.min(currentScale * 1.2, 4)})`
    }
  }

  const handleZoomOut = () => {
    const img = document.getElementById('zoomed-image')
    if (img) {
      const currentScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1
      img.style.transform = `scale(${Math.max(currentScale * 0.8, 0.5)})`
    }
  }

  const handleResetZoom = () => {
    const img = document.getElementById('zoomed-image')
    if (img) {
      img.style.transform = 'scale(1)'
    }
  }

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      hideCloseButton
    >
      <div className="relative w-full h-full flex items-center justify-center bg-black bg-opacity-95">

        {/* Close Button */}
        <Button
          variant="secondary"
          onClick={onClose}
          className="absolute top-5 right-5 z-50 bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full px-3 py-2"
          size="sm"
        >
          <Icon name="close" className="text-lg" />
        </Button>

        {/* Zoom Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
          <Button
            variant="secondary"
            onClick={handleZoomIn}
            className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full px-4 py-3 border-none"
            size="sm"
          >
            <Icon name="zoom_in" className="text-xl" />
          </Button>

          <Button
            variant="secondary"
            onClick={handleZoomOut}
            className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full px-4 py-3 border-none"
            size="sm"
          >
            <Icon name="zoom_out" className="text-xl" />
          </Button>

          <Button
            variant="secondary"
            onClick={handleResetZoom}
            className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full px-4 py-3 border-none"
            size="sm"
          >
            <Icon name="restore" className="text-xl" />
          </Button>
        </div>

        {/* Image Container */}
        <div className="max-w-[95%] max-h-[90%] overflow-auto flex items-center justify-center p-4">
          <img
            id="zoomed-image"
            src={imageUrl}
            alt={altText}
            className="max-w-full max-h-full object-contain cursor-zoom-out transition-transform duration-200"
            style={{ transform: 'scale(1)' }}
            onClick={handleResetZoom}
            onError={(e) => {
              e.target.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ImageZoomModal
