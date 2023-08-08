import React, { useState } from 'react';
import { createUser } from '../services/userAPI'; // Importando a função createUser
import LoadingText from './Loading';

function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmitLogin = async () => {
    if (name.length >= 3) {
      setLoading(true);
      try {
        await createUser({ name });
        setLoading(false);
        window.location.href = '/search';
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ name }
        onChange={ handleNameChange }
        data-testid="login-name-input"
      />
      <button
        onClick={ handleSubmitLogin }
        disabled={ name.length < 3 }
        data-testid="login-submit-button"
      >
        {loading && <LoadingText />}
      </button>
    </div>
  );
}

export default Login;
