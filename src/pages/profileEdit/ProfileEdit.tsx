import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';

type HandleChangeType = {
  target: { name: string, value: string },
};

const initialProfileState:UserType = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default function ProfileEdit() {
  const [profile, setProfile] = useState<UserType>(initialProfileState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    setIsLoading(true);
    setProfile(await getUser());
    setIsLoading(false);
  };

  const handleChange = ({ target: { name, value } }:HandleChangeType) => {
    const newProfile = {
      ...profile,
      [name]: value,
    };
    setProfile(newProfile);
  };

  const validNameImage = (info1:string, info2:string):boolean => {
    return info1.length > 0 && info2.length > 0;
  };

  const validEmailDescrip = (info:string):boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(profile.email) && info.length > 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await updateUser(profile);
    setIsLoading(false);
  };

  const { name, description, image } = profile;

  return (
    <section>
      {isLoading ? <Loading /> : (
        <form
          onSubmit={ (event) => {
            event.preventDefault();
            handleSubmit();
            navigate('/profile');
          } }
        >
          <fieldset>
            <legend>Editar perfil</legend>

            <input
              onChange={ handleChange }
              name="name"
              placeholder="Nome"
              value={ profile.name }
              type="text"
              data-testid="edit-input-name"
            />

            <input
              onChange={ handleChange }
              name="email"
              placeholder="Email"
              value={ profile.email }
              type="text"
              data-testid="edit-input-email"
            />

            <input
              onChange={ handleChange }
              name="image"
              placeholder="Imagem"
              value={ profile.image }
              type="text"
              data-testid="edit-input-image"
            />
            <textarea
              onChange={ handleChange }
              name="description"
              placeholder="Descrição"
              value={ profile.description }
              data-testid="edit-input-description"
            />

            <button
              disabled={ !(
                validNameImage(name, image) && validEmailDescrip(description)) }
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </fieldset>
        </form>
      )}
    </section>
  );
}
