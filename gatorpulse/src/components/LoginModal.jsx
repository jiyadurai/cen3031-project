// import React from 'react'
import { useState } from 'react'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

export default function LoginModal({OpenLoginModal, toggleModalOff }) {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loginFailure, setLoginFailure] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const AuthForm = () => {
      useEffect(() => {
        // console.log("Login Modal rendered");
      }, []);
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("handleSubmit Login called");
    // console.log("username: " + username);
    // console.log("password: " + password);

    const userData = {
      password,
      username,
    };

    // Send POST request to Flask server
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json()
    // IF login is successful, redirect to feed page (Add logic to check if login is successful HERE)
    // console.log(result.message) // Handle the response
    if (result.message == "login success!") {
      setUser(username); // Set the user state to the result from the server (NEEDS TO BE UDATED TO THE USER OBJECT)
      // console.log("set user to " + username);
      setUsername(username);
      navigate(`/profile/${username}`);
      setLoginFailure(null);
    }
    else {
      setLoginFailure('Username or password is incorrect');
    }
  }


  return (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={toggleModalOff}
        >
          <div
            className="modal modal-open"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="modal-box bg-white p-6 rounded shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Login</h2>
              {/* Form inside modal */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full mt-2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {
                  loginFailure && (
                    <div className="inline-block text-red-500 bg-red-100 border border-red-300 rounded p-2 mb-4">
                      {loginFailure}
                    </div>
                  )
                }
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn bg-black text-white hover:bg-gray-800"
                    onClick={toggleModalOff}
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


