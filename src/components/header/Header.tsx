import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header data-testid="header-component">
      <nav>
        <NavLink data-testid="link-to-search" to=" /search"> Pesquisar </NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
        <NavLink data-testid="link-to-profile" to="/profile"> Profile </NavLink>
      </nav>
    </header>
  );
}
