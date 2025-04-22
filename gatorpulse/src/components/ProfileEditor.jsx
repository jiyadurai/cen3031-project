// import React from 'react'
import { useState } from 'react'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import DateSelector from './DateSelector';


export default function ProfileEditorModal({ makingEdits, toggleEditing }) {
    const { user } = useUser();

//     const AuthForm = () => {
//       useEffect(() => {
//         console.log("Login Modal rendered");
//       }, []);
//   }

  const [ biography, setBiography ] = useState("");
  const [ image, setImage ] = useState("");
  const [ displayName, setDisplayName ] = useState("");
  
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("edit profile called");

    const username = user;

    const userData = {
      username,
      biography,
      image,
      displayName
    };
    
    

    // Send POST request to Flask server
    const response = await fetch("http://localhost:5000/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json()
    
    toggleEditing()
  }


  return (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={toggleEditing}
        >
          <div
            className="modal modal-open"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="modal-box bg-white p-6 rounded shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Edit your profile</h2>
              {/* Form inside modal */}
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
                    Biography
                  </label>
                  <input
                    type="text"
                    id="biography"
                    name="biography"
                    placeholder="Your biography"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setBiography(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Profile Picture Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Put an image URL here"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    placeholder="Enter a display name"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn bg-black text-white hover:bg-gray-800"
                    onClick={toggleEditing}
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


