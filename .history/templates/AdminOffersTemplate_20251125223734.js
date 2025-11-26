import AdminOffersHeader from '@/components/organisms/AdminOffersHeader'
import PostCardAdmin from '@/components/organisms/PostCardAdmin'
import EmptyState from '@/components/molecules/EmptyState'

export default function AdminOffersTemplate({
  searchQuery,
  onSearchChange,
  onSearch,
  showReportedPosts,
  onToggleReportedPosts,
  posts,
  reportedPosts,
  filteredPosts,
  onDeletePost,
  onContactUser,
  onViewProfile,
  onKeepPost,
  onRemovePost,
  className = ''
}) {
  const displayPosts = showReportedPosts ? reportedPosts : filteredPosts
  const hasPosts = displayPosts.length > 0

  return (
    <div className={`max-w-[1200px] mx-auto p-5 ${className}`}>
      <AdminOffersHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
        showReportedPosts={showReportedPosts}
        onToggleReportedPosts={onToggleReportedPosts}
        totalOffers={filteredPosts.length}
        totalReported={reportedPosts.length}
      />

      {hasPosts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayPosts.map(post => (
            <PostCardAdmin
              key={post.id}
              post={post}
              type="offer"
              isReported={showReportedPosts}
              onDelete={onDeletePost}
              onContact={onContactUser}
              onViewProfile={onViewProfile}
              onKeep={onKeepPost}
              onRemove={onRemovePost}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="inbox"
          title={`No ${showReportedPosts ? 'Reported' : 'Offer'} Posts Found`}
          description={showReportedPosts 
            ? "There are no reported posts to review at this time."
            : "No offer posts match your search criteria."
          }
        />
      )}
    </div>
  )
}