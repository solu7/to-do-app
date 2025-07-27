import "./NavItem.css";
import { Link } from "react-router-dom";

function NavItem({ icon, name }) {
  const navIcon = icon;
  return (
    <Link className="nav-item">
      <img className="nav-icon" src={navIcon} alt="Nav item icon" />
      <li>{name}</li>
    </Link>
  );
}
export default NavItem;
