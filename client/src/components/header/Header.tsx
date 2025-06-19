import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: "1rem", backgroundColor: "#f2f2f2" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "1rem" }}>Bonjour, {user.firstName || user.email} !</span>
              <button onClick={logout}>Déconnexion</button>
            </>
          ) : (
            <span>Vous n'êtes pas connecté.</span>
          )}
        </div>
        <div>
          <Link to="/">Accueil</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/cards">Cartes</Link> | <Link to="/rick">Rick & Morty</Link> |{" "}
          {!user && (
            <>
              <Link to="/login">Connexion</Link> | <Link to="/signup">Inscription</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
