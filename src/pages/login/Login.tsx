import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import { UserType, HandleType } from '../../types';
import Loading from '../../components/Loading/Loading';
import logo from '../../images/logo.svg';
import './login.css';

const initialState = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default function Login() {
  const [userData, setUserData] = useState<UserType>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }:HandleType) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const disabledButton = ():boolean => {
    const falso = false;
    return userData.name.length >= 3 ? falso : !falso;
  };

  return (
    <section className="login_container">
      {isLoading ? <Loading /> : (
        <div className="form-logo-container">
          <div className="image-box">
            <img src={ logo } alt="Logotipo" />
          </div>

          <form
            className="form"
            onSubmit={ async (event) => {
              setIsLoading(true);
              event.preventDefault();
              await createUser(userData);
              navigate('/search');
            } }
          >
            <input
              placeholder="Qual é seu nome?"
              onChange={ handleChange }
              data-testid="login-name-input"
              type="text"
              name="name"
              value={ userData.name }
              className="input-login"
            />
            <button
              // className={ disabledButton() ? 'btn-disabled' : 'btn-login' }
              className="btn-login"
              data-testid="login-submit-button"
              disabled={ disabledButton() }
            >
              Entrar
            </button>
          </form>
        </div>
      )}
    </section>

  );
}
