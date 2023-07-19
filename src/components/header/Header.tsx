import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../Loading/Loading';

const initialState = {
  name: '',
  email: '',
  image: '',
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
    <header data-testid="header-component">
      <nav>
        <NavLink data-testid="link-to-search" to="/search"> Pesquisar </NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile"> Profile </NavLink>
      </nav>

      <div>
        {isLoading ? <Loading /> : (
          <p data-testid="header-user-name">{profileInfo.name}</p>
        )}

      </div>
    </header>
  );
}
