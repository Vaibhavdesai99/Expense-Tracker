import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { authStates } from "../StoreRedux/auth-reducer";
// import AuthContext from "../Store/AuthContext";
const Navbar = () => {
  const dispatch = useDispatch();
  // const authCtx = useContext(AuthContext);

  // LogOut Handler:
  const logOut = () => {
    dispatch(authStates.logOut());
  };
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/Home" className="navbar__link">
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/about" className="navbar__link">
            About
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/products" className="navbar__link">
            Products
          </Link>
        </li>

        <li className="navbar__item">
          <Link to="/Expenses" className="navbar__link">
            Expenses
          </Link>
        </li>
        <Link to="/LogIn">
          <button
            style={{
              color: "white",
              background: "black",
              padding: "5px 9px",
              borderRadius: "10px",
            }}
            onClick={logOut}
          >
            Logout
          </button>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
