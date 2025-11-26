import { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import PostItem from '@/components/molecules/PostItem'
import EmptyState from '@/components/molecules/EmptyState'

export default function PostsSection({
  skillOffers = [],
  skillRequests = [],
  onEditOffer,
  onEditRequest,
  onDeleteOffer,
  onDeleteRequest,
  className = ''
}) {
  const [activeTab, setActiveTab] = useState('offers')

  return (
    <Card className={className}>
      <h3 className="text-[#121731] text-lg mb-4 pb-2 border-b-2 border-[#728a9c]">
        MY POSTS
      </h3>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Button
          variant={activeTab === 'offers' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('offers')}
          className="w-full sm:w-auto sm:min-w-[200px]"
        >
          MY SKILL OFFERS
        </Button>
        <Button
          variant={activeTab === 'requests' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('requests')}
          className="w-full sm:w-auto sm:min-w-[200px]"
        >
          MY SKILL REQUESTS
        </Button>
      </div>

      {/* Content */}
      <div className="min-h-36">
        {activeTab === 'offers' && (
          <div className="flex flex-col gap-4">
            {skillOffers.map((offer) => (
              <PostItem
                key={offer.id}
                post={offer}
                type="offer"
                onEdit={onEditOffer}
                onDelete={onDeleteOffer}
              />
            ))}
            {skillOffers.length === 0 && (
              <EmptyState
                icon="inbox"
                title="No Skill Offers"
                description="You haven't posted any skill offers yet. Start sharing your skills with the community!"
              />
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="flex flex-col gap-4">
            {skillRequests.map((request) => (
              <PostItem
                key={request.id}
                post={request}
                type="request"
                onEdit={onEditRequest}
                onDelete={onDeleteRequest}
              />
            ))}
            {skillRequests.length === 0 && (
              <EmptyState
                icon="inbox"
                title="No Skill Requests"
                description="You haven't posted any skill requests yet. Let the community know what skills you need!"
              />
            )}
          </div>
        )}
      </div>
    </Card>
  )
}