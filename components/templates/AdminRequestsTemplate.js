import AdminRequestsHeader from '@/components/organisms/AdminRequestsHeader'
import PostCardAdminRequest from '@/components/organisms/PostCardAdminRequest'
import EmptyState from '@/components/molecules/EmptyState'

export default function AdminRequestsTemplate({
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
      <AdminRequestsHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
        showReportedPosts={showReportedPosts}
        onToggleReportedPosts={onToggleReportedPosts}
        totalRequests={filteredPosts.length}
        totalReported={reportedPosts.length}
      />

      {hasPosts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayPosts.map(post => (
            <PostCardAdminRequest
              key={post.id}
              post={post}
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
          title={`No ${showReportedPosts ? 'Reported' : 'Request'} Posts Found`}
          description={showReportedPosts 
            ? "There are no reported posts to review at this time."
            : "No request posts match your search criteria."
          }
        />
      )}
    </div>
  )
}