import { useState, useEffect } from 'react';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';

const initialProfileState:UserType = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default function ProfileEdit() {
  const [profile, setProfile] = useState<UserType>(initialProfileState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    setIsLoading(true);
    setProfile(await getUser());
    setIsLoading(false);
  };

  return (
    <section>
      {isLoading ? <Loading /> : (
        <form onSubmit={ (event) => event.preventDefault() }>
          <fieldset>
            <legend>Editar perfil</legend>

            <input
              name="name"
              placeholder="Nome"
              value={ profile.name }
              type="text"
              data-testid="edit-input-name"
            />

            <input
              name="email"
              placeholder="Email"
              value={ profile.email }
              type="text"
              data-testid="edit-input-email"
            />

            <textarea
              name="description"
              placeholder="Descrição"
              value={ profile.description }
              data-testid="edit-input-description"
            />

            <input
              name="image"
              placeholder="Imagem"
              value={ profile.image }
              type="text"
              data-testid="edit-input-image"
            />

            <button data-testid="edit-button-save"> Salvar </button>
          </fieldset>
        </form>
      )}
    </section>
  );
}
