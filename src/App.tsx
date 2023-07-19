import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import Search from './pages/search/Search';
import Album from './pages/album/Album';
import Layout from './pages/Layout';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>

        <Route path="/" element={ <Login /> } />

        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />

          <Route path="/album/:id" element={ <Album /> } />
        </Route>

        <Route path="*" element={ <NotFound /> } />
      </Routes>

    </>
  );
}

export default App;
