import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import SmallText from '@/components/atoms/SmallText'

export default function AdminRequestsHeader({
  searchQuery,
  onSearchChange,
  onSearch,
  showReportedPosts,
  onToggleReportedPosts,
  totalRequests,
  totalReported,
  className = ''
}) {
  return (
    <div className={className}>
      {/* Search Bar and Reported Posts Button */}
      <div className="flex items-center gap-5 mb-8">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onSearch={onSearch}
          placeholder="Search for requests, categories, or locations..."
          className="flex-1"
        />
        <Button
          variant={showReportedPosts ? 'primary' : 'danger'}
          onClick={onToggleReportedPosts}
          className="whitespace-nowrap"
        >
          {showReportedPosts ? 'Request Posts' : 'Reported Posts'}
        </Button>
      </div>

      {/* Header with Count */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#121731] text-2xl font-semibold">
          {showReportedPosts ? 'Reported Posts' : 'Requests'}
        </h1>
        <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
          <SmallText weight="medium" color="dark">
            {showReportedPosts ? 'Total Reported:' : 'Total Requests:'}{' '}
            <span className="font-bold">
              {showReportedPosts ? totalReported : totalRequests}
            </span>
          </SmallText>
        </div>
      </div>
    </div>
  )
}