import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../Loading/Loading';
import logo from '../../images/logo.svg';
import star from '../../images/🦆 icon _star empty_.svg';
import lupa from '../../images/Vector.svg';
import userProfile from '../../images/🦆 icon _profile_.svg';
import './header.css';

const initialState = {
  name: '',
  email: '',
  image: 'https://i.pinimg.com/564x/4e/2a/e1/4e2ae1e13e8fdb0fc459b9eabf996f85.jpg',
  description: '',
};

export default function Header() {
  const [profileInfo, setProfileInfo] = useState<UserType>(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setIsLoading(true);
    const profile:UserType = await getUser();
    setProfileInfo(profile);
    setIsLoading(false);
  };

  return (
    <header className="header-box" data-testid="header-component">

      <div className="image-box">
        <img className="image-logo-header" src={ logo } alt="Logotipo" />
      </div>

      <nav className="navbar-box">

        <div className="nav-box-header">
          <img src={ lupa } alt="Icone de lupa" />
          <NavLink
            className="link-nav-bar"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar
          </NavLink>
        </div>

        <div className="nav-box-header">
          <img src={ star } alt="Icone de estrela" />
          <NavLink
            className="link-nav-bar"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos
          </NavLink>
        </div>
        <div className="nav-box-header">

          <img src={ userProfile } alt="icone de usuario" />
          <NavLink
            className="link-nav-bar"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile
          </NavLink>
        </div>

      </nav>

      <div className="user-box">
        {isLoading ? <Loading /> : (
          <>
            <img
              className="image-user"
              src={ profileInfo.image }
              alt="Imagem do prefil"
            />
            <p className="name-user" data-testid="header-user-name">{profileInfo.name}</p>
          </>
        )}

      </div>
    </header>
  );
}
