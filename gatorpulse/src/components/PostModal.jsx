import React from 'react'
import PropTypes from 'prop-types';

export default function Post({isOpen, setModalOpen, posts}) {
    if (!isOpen) return null;
    console.log('Received posts:', posts);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Posts</h2>
            <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl">
              ✕
            </button>
          </div>
  
          {/* Swipeable area */}
          <div className="overflow-x-auto flex snap-x snap-mandatory gap-4 pb-4">
            {posts.map((post, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-full bg-blue-100 rounded-lg p-4 shadow"
              >
                <h3 className="text-md font-bold">{post.Title}</h3>
                <p className="text-sm text-gray-700">{post.Description}</p>
                {post.Picture && (
                    <img src={post.Picture} alt={post.Title} className="rounded mb-2 w-full h-40 object-cover" />
                )}
                {/* Add picture field on posts, and like field then design both here
                Ensure we pass down setEvents or whatever so we can edit the posts with its likes */}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

Post.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
          Title: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired
        })
      ).isRequired,
};
