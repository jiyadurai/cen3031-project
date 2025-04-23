import React, { useEffect, useState } from 'react'
import Header from './Header'
import EventBox from './EventBox';
import PropTypes from 'prop-types';

export default function FeedPage({page, setPage}) {
  // On load the feed page will go into the selectedDate state (can be one day or range of dates) and then go into the backend and have a request for data for that specifc date.
  // It will then feed this information into the event box and post components.
  // The event box will be a list of events that are happening on that date.
  // The post modal be a list of posts that are happening on that date.
  
  const [selectedDate, setSelectedDate] = useState([new Date()]);
  const [events, setEvents] = useState([]);

  useEffect(() => {setPage('feed')}, []); // Updates the page state to 'feed' when the component mounts aka feed page loads)

  const today = new Date(); // Holds today's date

  // Simulate fetching events from an API (you can swap with actual fetch later)
  useEffect(() => {
    const fetchEvents = async () => {
      // Replace this with actual API logic
      // const fakeEvents = [
      //   { id: '1', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, date: today, title: 'Yoga on the Lawn', time: '9:00 AM', tag: '#wellness', posts: [{id: '1', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Let’s gooo 🐊🔥', Description: 'Meet me by the fountain', Picture: 'https://picsum.photos/800/600'}, {id: '2', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Let’s gooo 🐊🔥', Description: 'Meet me by the fountain', Picture: 'https://picsum.photos/800/600'}, {id: '3', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Let’s gooo 🐊🔥', Description: 'Meet me by the fountain', Picture: 'https://picsum.photos/800/600'}]},
      //   { id: '2', User: {Name: 'Mark Magic', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, date: today, title: 'Career Fair', time: '1:00 PM', tag: '#career', posts: [{id: '4', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Squad pulling up tonight 💃🏾', Description: 'We linking at Turlington at 6PM sharp', Picture: 'https://picsum.photos/800/600'}, {id: '5', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Squad pulling up tonight 💃🏾', Description: 'We linking at Turlington at 6PM sharp', Picture: 'https://picsum.photos/800/600'}, {id: '6', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'Squad pulling up tonight 💃🏾', Description: 'We linking at Turlington at 6PM sharp', Picture: 'https://picsum.photos/800/600'}]},
      //   { id: '3', User: {Name: 'Beaty Green', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, date: today, title: 'Trivia Night', time: '7:00 PM', tag: '#fun', posts: [{id: '7', User: {Name: 'Lacy Hunters', ProfilePic: 'https://i.pravatar.cc/150?img=32'}, Likes: 0, Title: 'First Gator Pulse meetup 🐊💬', Description: 'Come chill, meet new people, and vibe with us 🎶', Picture: 'https://picsum.photos/800/600'}]},
      //   // Add more to test scrolling
      // ];
      const response = await fetch("http://localhost:5000/getAllPostsAndProfiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      const postData = data.posts;
      const postDataValues = Object.values(postData);
      const profileData = data.profiles;
      const allEvents = [];
      // console.log("profileData: ", profileData);
      // console.log("profileData.newman:", profileData.newman);
      // console.log("profileData['newman']", profileData['newman']);
      // console.log(postDataValues);
      postDataValues.forEach(post => {
        const usr = post.username;
        // console.log(usr);
        const cur = profileData[usr];
        // console.log("cur is: ", cur);
        allEvents.push({ id: post.id, User: {Name: cur.displayname, ProfilePic: cur.pfp}, date: post.date, title: post.title, time: post.time, tag: post.tag, posts: [{id: post.id, User: {Name: cur.displayname, ProfilePic: cur.pfp}, Likes: post.likes, Title: post.title, Description: post.description, Picture: post.image}]})
      })
      // console.log(allEvents.length);

      setEvents(allEvents);
    };

    fetchEvents();
    // console.log('Selected Date:', selectedDate);
    formattedDate = new Date(selectedDate)?.toLocaleDateString() || "No date selected"; 
  }, [selectedDate]);

  // Function to compare event date with selected date, if event date is in selected date range, return true
  const dateCompare = (eventDate, selectedDate) => {
    return selectedDate.some(date => 
      new Date(date).toLocaleDateString() === new Date(eventDate).toLocaleDateString()
    );
  }

  // Formatted Date in String form for logging and possible use in UI later on
  let formattedDate = new Date(selectedDate[0])?.toLocaleDateString() || "No date selected"; 

  // Holds events only in the selected date(s) range
  var curDateEvents = events.filter(event => dateCompare(event.date, selectedDate));

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <Header page={page} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        {/* <div className="text-center font-semibold text-lg mt-4 text-gray-800">
          Events for {formattedDate}
        </div> */}
        <div className="flex-1 overflow-y-scroll mt-16 px-4 pb-6">
          <div className="flex flex-col gap-7 max-w-2xl mx-auto mt-[4vh]">
            {/* Below only events under certain selected dates are shown */}
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
