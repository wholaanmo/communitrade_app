import React from 'react';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';

const PostCard = ({ 
  post, 
  type, // 'request' or 'offer'
  onReport,
  onContact,
  onViewProfile,
  className = ''
}) => {
  const isRequest = type === 'request';

  return (
    <Card className={`min-h-[580px] flex flex-col hover:-translate-y-1 transition-all duration-300 ${className}`}>
      {/* Card Header */}
      <div className="card-header flex items-start mb-6 pb-4 border-b border-gray-300">
        <div className="user-info flex items-start gap-3 w-full">
          <div className="profile-pic-container w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
            <img 
              src={post.userPicture} 
              alt={post.userName}
              className="profile-pic w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+';
              }}
            />
          </div>
          <div className="user-details flex flex-col gap-1 flex-1">
            <span className="account-name text-primary font-semibold text-lg leading-tight">
              {post.userName}
            </span>
            <span className="posted-time text-gray-500 text-sm leading-tight">
              {post.timePosted}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content mb-8 flex-1 flex flex-col gap-4">
        <div className="detail-item flex flex-col gap-2">
          <label className="font-bold text-primary text-sm">
            {isRequest ? 'Request:' : 'Skills:'}
          </label>
          <span className="detail-value text-dark text-base leading-relaxed">
            {isRequest ? post.request : post.skills.join(', ')}
          </span>
        </div>
        
        <div className="detail-item flex flex-col gap-2">
          <label className="font-bold text-primary text-sm">Description:</label>
          <span className="detail-value text-dark text-base leading-relaxed">
            {post.description}
          </span>
        </div>
        
        <div className="detail-row flex gap-6">
          <div className="detail-item flex-1 flex flex-col gap-2">
            <label className="font-bold text-primary text-sm">Category:</label>
            <span className="detail-value text-dark text-base leading-relaxed">
              {post.category}
            </span>
          </div>
          <div className="detail-item flex-1 flex flex-col gap-2">
            <label className="font-bold text-primary text-sm">Location:</label>
            <span className="detail-value text-dark text-base leading-relaxed">
              {post.location}
            </span>
          </div>
        </div>
        
        <div className="detail-item flex flex-col gap-2">
          <label className="font-bold text-primary text-sm">
            {isRequest ? 'Skills Offered:' : 'Skills Requested:'}
          </label>
          <span className="detail-value text-dark text-base leading-relaxed">
            {isRequest ? post.skillsOffered.join(', ') : post.skillsRequested.join(', ')}
          </span>
        </div>
        
        <div className="detail-item flex flex-col gap-2">
          <label className="font-bold text-primary text-sm">Schedule:</label>
          <span className="detail-value text-dark text-base leading-relaxed">
            {post.schedule}
          </span>
        </div>
        
        {post.additionalNotes && (
          <div className="detail-item flex flex-col gap-2">
            <label className="font-bold text-primary text-sm">Additional Notes:</label>
            <span className="detail-value text-dark text-base leading-relaxed">
              {post.additionalNotes}
            </span>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="card-actions flex gap-3 flex-wrap mt-auto">
        <Button 
          variant="danger" 
          size="small"
          onClick={() => onReport(post.userName)}
          className="flex-1 min-w-[110px]"
        >
          <span className="material-icons mr-2 text-lg">flag</span>
          Report
        </Button>
        <Button 
          variant="primary" 
          size="small"
          onClick={onContact}
          className="flex-1 min-w-[110px]"
        >
          <span className="material-icons mr-2 text-lg">message</span>
          Contact
        </Button>
        <Button 
          variant="ghost" 
          size="small"
          onClick={() => onViewProfile(post)}
          className="flex-1 min-w-[110px]"
        >
          <span className="material-icons mr-2 text-lg">account_circle</span>
          View Profile
        </Button>
      </div>
    </Card>
  );
};

// Make sure to export as named export
export { PostCard };

// Or you can also do default export
// export default PostCard;