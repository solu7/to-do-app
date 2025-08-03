import "./NavItem.css";
import { Link } from "react-router-dom";

function NavItem({ icon, name, onClick }) {
  const navIcon = icon;
  return (
    <Link className="nav-item" onClick={onClick}>
      <img className="nav-icon" src={navIcon} alt="Nav item icon" />
      <li>{name}</li>
    </Link>
  );
}
export default NavItem;
