import React from 'react'
import PropTypes from 'prop-types'

export default function EventBox({ event }) {
  return (
    <div key={event.id} className="card bg-base-100 shadow-md border border-gray-200 hover:shadow-lg transition-all">
        <div className="card-body">
            <h2 className="card-title text-xl">{event.title}</h2>
            <p className="text-sm text-gray-600">{event.time}</p>
            <div className="badge badge-secondary mt-2">{event.tag}</div>
        </div>
    </div>
)}

EventBox.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
}
