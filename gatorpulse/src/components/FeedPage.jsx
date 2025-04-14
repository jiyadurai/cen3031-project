import React, { useEffect, useState } from 'react'
import Header from './Header'
import EventBox from './EventBox';

export default function FeedPage() {
  // On load the feed page will go into the selectedDate state (can be one day or range of dates) and then go into the backend and have a request for data for that specifc date.
  // It will then feed this information into the event box and post components.
  // The event box will be a list of events that are happening on that date.
  // The post component will be a list of posts that are happening on that date.

  // What each event holds
  // const Event = {
  //   id: '',
  //   title: '',
  //   time: '',
  //   tag: ''
  // };
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Simulate fetching events from an API (you can swap with actual fetch later)
  useEffect(() => {
    const fetchEvents = async () => {
      // Replace this with actual API logic
      const fakeEvents = [
        { id: '1', title: 'Yoga on the Lawn', time: '9:00 AM', tag: '#wellness' },
        { id: '2', title: 'Career Fair', time: '1:00 PM', tag: '#career' },
        { id: '3', title: 'Trivia Night', time: '7:00 PM', tag: '#fun' },
        // Add more to test scrolling
      ];
      setEvents(fakeEvents);
    };

    fetchEvents();
  }, [selectedDate]);

  const formattedDate = selectedDate.toLocaleDateString();

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className="text-center font-semibold text-lg mt-4 text-gray-800">
          Events for {formattedDate}
        </div>

        <div className="flex-1 overflow-y-scroll mt-4 px-4 pb-6">
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {events.map((event) => (
              <EventBox key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
