import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../../components/Loading/Loading';

const initialState = {
  name: '',
  email: '',
  image: '',
  description: '',
};

type HandleType = {
  target:{ name:string, value:string }
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
    <section>
      {isLoading ? <Loading /> : (
        <form
          onSubmit={ async (event) => {
            setIsLoading(true);
            event.preventDefault();
            await createUser(userData);
            navigate('/search');
          } }
        >
          <input
            onChange={ handleChange }
            data-testid="login-name-input"
            type="text"
            name="name"
            value={ userData.name }
            className="login-name"
          />
          <button
            data-testid="login-submit-button"
            disabled={ disabledButton() }
          >
            Entrar
          </button>
        </form>
      )}
    </section>

  );
}
