import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header'
import {useParams} from 'react-router-dom' 
import { useUser } from './UserContext'
import MakePostModal from './MakePost';
import ProfileEditorModal from './ProfileEditor';

export default function Profile({page, setPage}) {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [activeTab, setActiveTab] = useState('posts');
    const [userInfo, setUserInfo] = useState(null);
    const { targetUser } = useParams();
    const { user } = useUser();
    const [ editingProfile, setEditingProfile ] = useState(false);
    const [ makingPost, setMakingPost ] = useState(false);
    const [ userNotFound, setUserNotFound ] = useState(false);

    const toggleMakePostModalOff = () => {
        console.log("toggleMakePostModalOff called");
        setMakingPost(false);
    }

    const toggleEditingProfileOff = () => {
        console.log("toggleEditingProfile called");
        setEditingProfile(false);
    }
    
    // console.log(targetUser);
    // console.log(user);
    // console.log(page);

    useEffect(() => {
        setPage('profile');
      
        const fetchUserInfo = async () => {
          try {
            const response = await fetch(`http://localhost:5000/profile/${targetUser}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            const data = await response.json();
            if (data.status == "failure") {
                setUserNotFound(true);
            }
            else {
                setUserInfo(data);
            }
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        };
      
        fetchUserInfo();
    }, []);


    return (
        <section className="min-h-screen bg-white pt-[8vh] p-6">
        <Header page={page} selectedDate={null} setSelectedDate={null} user={user}></Header>
        {makingPost && <MakePostModal makingPost={makingPost} toggleMakePostModalOff={toggleMakePostModalOff}></MakePostModal>}
        {editingProfile && <ProfileEditorModal makingEdits={editingProfile} toggleEditing={toggleEditingProfileOff}></ProfileEditorModal>}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto">
            {userInfo ? (
              //If the user has been found
              <>
                
                <img
                  src={userInfo.pfp_url}
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {userInfo.displayname}
                </h2>
                <p className="text-gray-500 mb-2">@{userInfo.username}</p>
                <p className="text-gray-700">{userInfo.biography}</p>
              </>
              
              ) : !userNotFound ? 
                
              (
                //If the user has not been found YET
                <p className="text-gray-500 text-center">Loading profile...</p>
              )
                :
              (
                //If the user has failed to be found
                <p className="text-gray-500 text-center">User not found.</p>
              )
            }
            {user == targetUser && (
                <button onClick={ () => setEditingProfile(true)} className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 mr-[3vw] text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900>">
                    Edit profile
                </button>
            )}
            {user == targetUser && (
                <button onClick={ () => setMakingPost(true)} className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 mr-[3vw] text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900>">
                    Make post
                </button>
            )}
          </div>
        </section>
      );
}
