import { useState } from 'react';
import Header from './Header'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import HomeScreen from '../../public/UFbackground1.jpg'

export default function Home() {

    const [OpenLoginModal, setLoginVisibility] = useState(false);
    const [OpenSignUpModal, setSignUpVisibility] = useState(false);
    const toggleLoginModalOff = () => {
        console.log("toggleLoginModalOff called");
        setLoginVisibility(false);
    }
    const toggleSignUpModalOff = () => {
        console.log("toggleSignModalOff called");
        setSignUpVisibility(false);
    }

  return (
    <section className={`bg-cover bg-center h-[100vh] w-[100%] absolute`}  style={{ backgroundImage: `url(${HomeScreen})` }}>
        <Header></Header>
        {OpenLoginModal && <LoginModal OpenLoginModal={OpenLoginModal} toggleModalOff={toggleLoginModalOff}></LoginModal>}
        {OpenSignUpModal && <SignUpModal OpenSignUpModal={OpenSignUpModal} toggleModalOff={toggleSignUpModalOff}></SignUpModal>}
        <div className="flex flex-col items-center justify-center w-[100%] h-[100vh]">
            <div className='w-[50vw] h-[30vh] flex justify-center items-center rounded-md text-center bg-[#f0ffffc9]'>
                <button onClick={ () => setLoginVisibility(true)} className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 mr-[3vw] text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                    Login
                </button>
                <button onClick={ () => setSignUpVisibility(true)} className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                    Sign Up
                </button>
            </div>
        </div>
    </section>
  )
}
