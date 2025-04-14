import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/Home";
import FeedPage from "./components/FeedPage";


export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} page={page} setPage={setPage} setUser={setUser} />} />
        <Route path="/feed" element={<FeedPage page={page} setPage={setPage} user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  )
}
