import { useState, useEffect } from "react";
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function SignUpModal({ OpenSignUpModal, toggleModalOff }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [ signupFailure, setSignupFailure ] = useState(null);
    const { setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("SignUp Modal rendered");
        // console.log(OpenSignUpModal);
    }, [OpenSignUpModal]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log("handleSubmit SignUp called");
        // console.log("username: " + username);
        // console.log("password: " + password);
        // console.log("email: " + email);

        const userData = {
            password,
            username,
            email,
        };

        // Send POST request to Flask server
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json()
        // console.log(result) // Handle the response
        if (result.message == "signup success!") {
            setUser(username);
            navigate(`/profile/${username}`);
            setSignupFailure(null);
        }
        else {
            setSignupFailure("Failed to sign up, duplicate username or email?");
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
                    <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
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
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full mt-2"
                                onChange={(e) => setEmail(e.target.value)}
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
                          signupFailure && (
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
                            <button
                                type="submit"
                                className="btn btn bg-orange-500 border-blue-500 border-2 text-white hover:bg-orange-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
