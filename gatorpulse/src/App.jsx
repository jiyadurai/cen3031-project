import Home from "./components/Home";

export default function App() {
  return (
    <div className="bg-white flex h-screen w-screen items-center justify-center">
      {/* <h1 className="text-3xl text-black font-bold underline mr-2">
        Hello world! This is GatorPulse
      </h1>
      <div>
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        DaisyUI Button
      </button>
      </div> */}
      <Home></Home>
    </div>
  )
}
