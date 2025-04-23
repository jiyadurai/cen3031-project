import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/Home";
import FeedPage from "./components/FeedPage";
import Profile from "./components/Profile";
import { UserContext } from './components/UserContext';
import MapViewer from './components/MapViewer';


export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home page={page} setPage={setPage} />} />
          <Route path="/feed" element={<FeedPage page={page} setPage={setPage} />} />
          <Route path="/profile/:targetUser" element={<Profile page={page} setPage={setPage} />}/>
          <Route path="/mapview" element={<MapViewer page={page} setPage={setPage}/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

// export default function App() {
//   return <h1>Hello from App!</h1>;
// }
