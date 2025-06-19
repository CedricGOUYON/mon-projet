import "./signupForm.css";
import { useState } from "react";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Stocker le prénom dans localStorage
        localStorage.setItem("firstName", firstName);

        setShowModal(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setResponseMsg("");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      } else {
        setResponseMsg(data);
      }
    } catch {
      setResponseMsg("Erreur réseau, réessaie plus tard");
    }
  };

  return (
    <div className="signup-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Prénom :</label>
        <input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <br />
        <label htmlFor="lastName">Nom :</label>
        <input id="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <br />
        <label htmlFor="email">Email :</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor="password">Mot de passe :</label>
        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Créer un compte</button>
      </form>

      {responseMsg && <p className="error-msg">{responseMsg}</p>}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Votre compte a été créé avec succès !</h3>
            <p>Redirection en cours...</p>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
