import { Link } from "react-router";
import "./Header.css";

function Header() {
  return (
    <>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
    </>
  );
}

export default Header;
