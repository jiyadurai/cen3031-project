import React, { useEffect, useState } from 'react'
import Header from './Header'
import EventBox from './EventBox';
import PropTypes from 'prop-types';

export default function FeedPage({page, setPage, user, setUser}) {
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
  
  const [selectedDate, setSelectedDate] = useState([new Date()]);
  const [events, setEvents] = useState([]);

  useEffect(() => {setPage('feed')}, []); // Updates the page state to 'feed' when the component mounts aka feed page loads)

  const today = new Date();

  // Simulate fetching events from an API (you can swap with actual fetch later)
  useEffect(() => {
    const fetchEvents = async () => {
      // Replace this with actual API logic
      const fakeEvents = [
        { id: '1', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, date: today, title: 'Yoga on the Lawn', time: '9:00 AM', tag: '#wellness', posts: [{id: '1', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Let’s gooo 🐊🔥', Description: 'Meet me by the fountain', Picture: 'https://picsum.photos/800/600'}, {id: '2', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Let’s gooo 🐊🔥', Description: 'Meet me by the fountain', Picture: 'https://picsum.photos/800/600'}, {id: '3', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Let’s gooo 🐊🔥', Description: 'Meet me by the fountain', Picture: 'https://picsum.photos/800/600'}]},
        { id: '2', User: {Name: 'Mark Magic', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, date: today, title: 'Career Fair', time: '1:00 PM', tag: '#career', posts: [{id: '4', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Squad pulling up tonight 💃🏾', Description: 'We linking at Turlington at 6PM sharp', Picture: 'https://picsum.photos/800/600'}, {id: '5', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Squad pulling up tonight 💃🏾', Description: 'We linking at Turlington at 6PM sharp', Picture: 'https://picsum.photos/800/600'}, {id: '6', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Squad pulling up tonight 💃🏾', Description: 'We linking at Turlington at 6PM sharp', Picture: 'https://picsum.photos/800/600'}]},
        { id: '3', User: {Name: 'Beaty Green', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, date: today, title: 'Trivia Night', time: '7:00 PM', tag: '#fun', posts: [{id: '7', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'First Gator Pulse meetup 🐊💬', Description: 'Come chill, meet new people, and vibe with us 🎶', Picture: 'https://picsum.photos/800/600'}]},
        // Add more to test scrolling
      ];
      setEvents(fakeEvents);
    };

    fetchEvents();
    console.log('Selected Date:', selectedDate);
    formattedDate = new Date(selectedDate)?.toLocaleDateString() || "No date selected"; 
  }, [selectedDate]);

  const dateCompare = (eventDate, selectedDate) => {
    return selectedDate.some(date => 
      new Date(date).toLocaleDateString() === new Date(eventDate).toLocaleDateString()
    );
  }

  
  let formattedDate = new Date(selectedDate[0])?.toLocaleDateString() || "No date selected"; 

  var curDateEvents = events.filter(event => dateCompare(event.date, selectedDate));
  console.log("FEED PAGE RENDEERED");
  console.log("Selected Date:", selectedDate);
  console.log('formattedDate:', formattedDate);
  console.log('curDateEvents:', curDateEvents);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <Header page={page} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        {/* <div className="text-center font-semibold text-lg mt-4 text-gray-800">
          Events for {formattedDate}
        </div> */}
        <div className="flex-1 overflow-y-scroll mt-16 px-4 pb-6">
          <div className="flex flex-col gap-7 max-w-2xl mx-auto mt-[4vh]">
            {/* Below only events under certain the selected dates (check each event.date)should be shown */}
            {curDateEvents.map((event) => (
              <EventBox key={event.id} event={event} setEvents={setEvents} allEvents={events} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

FeedPage.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func
};
