// import React from 'react'
import { useState } from 'react'

export default function LoginModal({ OpenLoginModal, setLoginVisibility }) {
    const AuthForm = () => {
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
      
        const handleSubmit = async (e) => {
          e.preventDefault()
      
          const userData = {
            password,
            username,
          };
      
          // Send POST request to Flask server
          const response = await fetch("http://localhost:5000/pythonserverURL", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
      
          const result = await response.json()
          console.log(result) // Handle the response
    }
  }
  return (
    // <>
    //     <div className='modal-box bg-[white] max-w-[100vw] w-[80vw] h-[41vw] 2xl:h-[30.9vw]'>
    //     </div>
    //     <form method="dialog" className="modal-backdrop">
    //         <button>close</button>
    //     </form>
    // </>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        //   onClick={setLoginVisibility(false)}
        >
          <div
            className="modal modal-open"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="modal-box bg-white p-6 rounded shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Login</h2>
              {/* Form inside modal */}
              <form>
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
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn bg-black text-white hover:bg-gray-800"
                    // onClick={setLoginVisibility(false)}
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
