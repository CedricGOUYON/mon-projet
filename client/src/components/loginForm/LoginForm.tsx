import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3310";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("firstName", data.firstName || "utilisateur");

        setShowModal(true);
        setEmail("");
        setPassword("");
        setResponseMsg("");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setResponseMsg(data.message || "Erreur de connexion");
      }
    } catch (error) {
      setResponseMsg("Erreur réseau, réessaie plus tard");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor="password">Mot de passe :</label>
        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Se connecter</button>
      </form>

      {responseMsg && <p style={{ color: "red" }}>{responseMsg}</p>}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            <h3>Connexion réussie !</h3>
            <p>Redirection en cours...</p>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
