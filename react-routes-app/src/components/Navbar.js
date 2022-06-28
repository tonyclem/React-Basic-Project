import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link
        to="/"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Home
      </Link>
      <Link
        to="/about"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        About
      </Link>
      <Link
        to="/products"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Products
      </Link>
      <Link
        to="/login"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Login
      </Link>
    </nav>
  );
};
export default Navbar;
