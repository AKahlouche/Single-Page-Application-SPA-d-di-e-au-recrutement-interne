import { NavLink } from "react-router-dom";
import "../styles/header.css";

export default function Header({ teamCount, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="brand">
          <div className="brand__title">HR-Connect Elite</div>
          <div className="brand__subtitle">Elite Dashboard</div>
        </div>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}
          >
            Accueil
          </NavLink>

          <NavLink
            to="/annuaire"
            className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}
          >
            Annuaire
          </NavLink>

          <NavLink
            to="/equipe"
            className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}
          >
            Mon Équipe <span className="badge">{teamCount}</span>
          </NavLink>

          <button className="themeBtn" onClick={onToggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}