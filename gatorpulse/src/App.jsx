import { useState } from "react";
import { db, collection, addDoc } from "./firebase";

export default function App() {
  const [count, setCount] = useState(0);
  const addData = async () => {
    setCount(count + 1);
    alert("Sending Document " + count)
    try {
      await addDoc(collection(db, "users"), {
        name: "Test Update: " + count,
        email: "name@example.com",
        createdAt: new Date(),
      });
      alert("Data added successfully! 🚀");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="bg-white flex h-screen w-screen items-center justify-center">
      <h1 className="text-3xl text-black font-bold underline mr-2">
        Hello world! This is GatorPulse
      </h1>
      <div>
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900 mr-[5px]">
        DaisyUI Button
      </button>
      <button onClick={addData} className="btn btn-outline btn-primary">Update FireBase DataBase</button>
      </div>
    </div>
  )
}
