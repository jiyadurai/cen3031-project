// import React from 'react'
import { useState } from 'react'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import DateSelector from './DateSelector';


export default function MakePostModal({ makingPost, toggleMakePostModalOff }) {
    const { user } = useUser();

//     const AuthForm = () => {
//       useEffect(() => {
//         console.log("Login Modal rendered");
//       }, []);
//   }

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ image, setImage ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ selectedDate, setSelectedDate ] = useState([new Date()]);
  const [ tag, setTag ] = useState("");
  const [ time, setTime ] = useState("");
  
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("makePost called");

    const timeOfPost = new Date().toJSON();
    const username = user;

    const userData = {
      username,
      description,
      selectedDate,
      image,
      location,
      timeOfPost,
      title,
      tag,
      time
    };
    
    

    // Send POST request to Flask server
    const response = await fetch("http://localhost:5000/makePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json()
    // IF login is successful, redirect to feed page (Add logic to check if login is successful HERE)
    // console.log(result.message) // Handle the response
    // if (result.message == "post success!") {
    //   setUser(username); // Set the user state to the result from the server (NEEDS TO BE UDATED TO THE USER OBJECT)
    //   console.log("set user to " + username);
    //   setUsername(username);
    //   navigate(`/profile/${username}`);
    //   setLoginFailure(null);
    // }
    // else {
    //   setLoginFailure('Username or password is incorrect');
    // }
    toggleMakePostModalOff()
  }


  return (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={toggleMakePostModalOff}
        >
          <div
            className="modal modal-open"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="modal-box bg-white p-6 rounded shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Make a Post</h2>
              {/* Form inside modal */}
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title the event"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Event Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Describe the event"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
                    Tag
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    placeholder="Tag for your event"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    placeholder="Event time"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Enter an image URL"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate}></DateSelector>
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter a query for Google Maps"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn bg-black text-white hover:bg-gray-800"
                    onClick={toggleMakePostModalOff}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn bg-orange-500 border-blue-500 border-2 text-white hover:bg-orange-600">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  )
}


