import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';
import { UserType } from '../../types';

const initialProfileState:UserType = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default function Profile() {
  const [profile, setProfile] = useState<UserType>(initialProfileState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setIsLoading(true);
    setProfile(await getUser());
    setIsLoading(false);
  };

  return (
    <section>
      {isLoading ? <Loading /> : (
        <div>

          <div>
            <img
              data-testid="profile-image"
              src={ profile.image }
              alt="Imagem do perfil"
            />
            <Link to="/profile/edit">Editar perfil</Link>
            {/* <button onClick={ () => navigate('/profile/edit') }>Editar perfil</button> */}
          </div>
          <div>
            <p>Nome</p>
            <p>{ profile.name }</p>

            <p>Email</p>
            <p>{ profile.email }</p>

            <p>Descrição</p>
            <p>{ profile.description }</p>
          </div>
        </div>

      )}
    </section>
  );
}
