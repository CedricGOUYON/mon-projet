import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3310/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Réponse login:", data);

      if (!response.ok) {
        alert(data.message || "Erreur de connexion.");
        return;
      }

      // Mise à jour du contexte utilisateur
      login({
        email: data.email,
        firstName: data.firstName,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur serveur :", error);
      alert("Erreur lors de la connexion.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Connexion</button>
    </form>
  );
};

export default LoginForm;
