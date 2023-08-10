import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';
import { UserType } from '../../types';
import './profile.css';

const initialProfileState:UserType = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default function Profile() {
  const [profile, setProfile] = useState<UserType>(initialProfileState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setIsLoading(true);
    setProfile(await getUser());
    setIsLoading(false);
  };

  return (
    <section className="profile-container">
      {isLoading ? <Loading /> : (
        <div className="profile-info_box">
          <div className="header-profile"> </div>

          {profile.image !== '' && (
            <div className="image-profile_box">
              <div>
                <img
                  className="profile-image"
                  data-testid="profile-image"
                  src={ profile.image }
                  alt="Imagem do perfil"
                />
              </div>
            </div>
          )}

          <div className="profile-infos">
            <p className="title-info">Nome</p>
            <p className="info">{ profile.name }</p>

            <p className="title-info">Email</p>
            <p className="info">{ profile.email }</p>

            <p className="title-info">Descrição</p>
            <p className="info">{ profile.description }</p>
            <Link className="btn-editar_perfil" to="/profile/edit">Editar perfil</Link>
          </div>
        </div>
      )}
    </section>
  );
}
