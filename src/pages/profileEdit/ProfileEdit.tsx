import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';
import { validNameImage, validEmailDescrip } from '../../services/validations';
import './profileEdit.css';

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

  const handleSubmit = async () => {
    setIsLoading(true);
    await updateUser(profile);
    setIsLoading(false);
  };

  const { name, email, description, image } = profile;

  return (
    <section className="profile-edit_container">
      <div className="header-profile-edit"> </div>

      {profile.image !== '' && (
        <div className="image-container">
          <div>
            <img className="profile-img" src={ image } alt="Imagem do perfil" />
          </div>
        </div>
      )}

      {isLoading ? <Loading /> : (
        <form
          className="form-profile-edit"
          onSubmit={ (event) => {
            event.preventDefault();
            handleSubmit();
            navigate('/profile');
          } }
        >

          <label
            className="label-nome"
            htmlFor="name"
          >
            Nome
            <br />
            <input
              className="input-nome"
              onChange={ handleChange }
              name="name"
              id="name"
              placeholder="Fique a vontade para usar um nome social"
              value={ profile.name }
              type="text"
              data-testid="edit-input-name"
            />
          </label>

          <label
            className="label-email"
            htmlFor="email"
          >
            Email
            <br />
            <input
              className="input-email"
              onChange={ handleChange }
              name="email"
              id="email"
              placeholder="Escolha um email que consulta diariamente"
              value={ profile.email }
              type="text"
              data-testid="edit-input-email"
            />
          </label>

          <label
            className="label-image_link"
            htmlFor="image"
          >
            Imagem
            <br />
            <input
              className="input-image_link"
              onChange={ handleChange }
              name="image"
              id="image"
              placeholder="Insira um link"
              value={ profile.image }
              type="text"
              data-testid="edit-input-image"
            />
          </label>

          <label
            className="label-text-area"
            htmlFor="descrição"
          >
            descrição
            <br />
            <textarea
              className="text-area"
              onChange={ handleChange }
              name="description"
              id="descrição"
              placeholder="Sobre mim"
              value={ profile.description }
              data-testid="edit-input-description"
            />
          </label>

          <button
            className="btn-salvar"
            disabled={ !(
              validNameImage(name, image) && validEmailDescrip(description, email)) }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </form>
      )}
    </section>

  );
}
