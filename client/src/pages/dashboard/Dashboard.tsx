import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Bienvenue {user?.firstName ?? "utilisateur"} !</h1>
    </div>
  );
};

export default Dashboard;
