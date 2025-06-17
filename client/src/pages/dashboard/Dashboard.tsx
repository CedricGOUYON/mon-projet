import { useEffect, useState } from "react";

function Dashboard() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  return (
    <>
      <h1>Bonjour {firstName || "cher utilisateur"} !</h1>
    </>
  );
}

export default Dashboard;
