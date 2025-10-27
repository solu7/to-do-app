import "./NavItem.css";
import { Link } from "react-router-dom";

function NavItem({ icon, name, onClick, path }) {
  if (path) {
    return (
      <Link className="nav-item" to={path}> 
        <img className="nav-icon" src={icon} alt="Nav item icon" />
        <li>{name}</li>
      </Link>
    );
  }
  return (
    <Link className="nav-item" role="button" onClick={onClick}>
      <img className="nav-icon" src={icon} alt="Nav item icon" />
      <li>{name}</li>
    </Link>
  );
}
export default NavItem;
