import {React, useState} from 'react'
import PropTypes from 'prop-types'
import PostModal from './PostModal';

export default function EventBox({ event }) {
    const [modalOpen, setModalOpen] = useState(false);
    console.log('event.posts:', event.posts);

  return (
    <>
        <div key={event.id} onClick={() => setModalOpen(true)} className="card bg-base-100 shadow-md border border-gray-200 hover:shadow-lg transition-all">
            <div className="card-body">
                <h2 className="card-title text-xl">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.time}</p>
                <div className="badge badge-secondary mt-2">{event.tag}</div>
            </div>
        </div>
        <PostModal
            isOpen={modalOpen}
            setModalOpen={setModalOpen}
            posts={event.posts}
        />
    </>
)}

EventBox.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
          Title: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired,
        })
      ).isRequired,
  }).isRequired,
}
