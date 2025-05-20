import '../index.css';
import ThemeSwitcher from './ThemeSwitcher';
function Header() {
  return (
    <header className="navbar bg-secondary text-primary-content">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">
          React Memory Card Game
        </a>
      </div>
      <div className="navbar-end p-2">
        <div id="theme-switcher">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
