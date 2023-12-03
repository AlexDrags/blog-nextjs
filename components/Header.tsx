import classHeader from '../styles/header.module.scss';
import Navigation from './Navigation';
import Logo from './Logo';
import ButtonMenu from './ButtonMenu';

export default function Header() {
  return (
    <header className={classHeader.header}>
      <Logo />
      <Navigation />
    </header>
  );
}
