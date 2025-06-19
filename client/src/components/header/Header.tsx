import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-top">
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          {user ? <span className="user-name">Bonjour, {user.firstName || user.email} !</span> : <span className="not-connected">Vous n'êtes pas connecté.</span>}
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Accueil
          </Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/cards" onClick={() => setMenuOpen(false)}>
            Cartes
          </Link>
          <Link to="/rick" onClick={() => setMenuOpen(false)}>
            Rick & Morty
          </Link>
          {!user && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Connexion
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Inscription
              </Link>
            </>
          )}
          {user && (
            <button
              className="logout-button"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              Déconnexion
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
