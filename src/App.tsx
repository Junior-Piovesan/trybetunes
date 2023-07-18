import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';

function App() {
  return (
    <>

      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>

    </>
  );
}

export default App;
