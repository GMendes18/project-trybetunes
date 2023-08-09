import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingText from './Loading';

function Header() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState('');

  useEffect(() => {
    const handleUserName = async () => {
      const user = await getUser();
      setUsers(user.name);
      setLoading(false);
    };

    handleUserName();
  }, []);

  return (
    <header data-testid="header-component">
      <nav>
        <NavLink to="/search" data-testid="link-to-search">
          Search
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favorites
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Profile
        </NavLink>
      </nav>
      {loading ? (
        <LoadingText />
      ) : (
        <h1 data-testid="header-user-name">
          Bem-vindo,
          {' '}
          {users}
        </h1>
      )}
    </header>
  );
}

export default Header;
