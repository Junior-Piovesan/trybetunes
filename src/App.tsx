import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import Search from './pages/search/Search';
import Album from './pages/album/Album';
import Layout from './pages/Layout';
import Favorites from './pages/favorites/Favorites';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profileEdit/ProfileEdit';
import group5 from './images/Group 5.svg';
import group6 from './images/Group 6.svg';
import './app.css';

function App() {
  return (
    <div className="app-container">

      {/* <img className="group-5-image" src={ group5 } alt="icone" />
      <img className="group-6-image" src={ group6 } alt="icone" />

      <div className="small-circle">  </div>
      <div className="big-circle"> </div> */}
      <Routes>

        <Route path="/" element={ <Login /> } />

        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />

          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEdit /> } />

        </Route>

        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
