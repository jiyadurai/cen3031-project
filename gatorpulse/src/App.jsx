import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/Home";
import FeedPage from "./components/FeedPage";


export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </Router>
  )
}
