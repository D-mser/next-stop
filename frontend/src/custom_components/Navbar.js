import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function Navbar() {
  return (
    <nav id="navbar">
      <Link className="link float-left" to="/">
        <HomeIcon />
      </Link>

      <Link className="link float-left" to="/maps">
        Next Stop
      </Link>

      <Link className="link float-right" to="/login">
        <AccountCircleIcon />
      </Link>
    </nav>
  );
}
