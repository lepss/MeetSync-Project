import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserTie,
  faScrewdriverWrench,
  faLock,
  faCircleUser,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Header = () => {
    const user = useSelector(selectUser);

    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <h1>MeetSync</h1>
                    </li>
                    <li>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHouse} /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/event">
                            Events
                        </Link>
                    </li>
                </ul>
                {user.isLogged === false ? (
                <ul>
                    <li><Link to="/register"><FontAwesomeIcon icon={faLock} /> Sign up</Link></li>
                    <li><Link to="/login"><FontAwesomeIcon icon={faCircleUser} /> Log in</Link></li>
                </ul>
                ) : (
                <ul>
                    <li>
                        <Link to="/profil">
                            <FontAwesomeIcon icon={faUserTie} /> {user.infos.firstname}
                        </Link>
                    </li>
                    {user.infos.role === "admin" && 
                        <li>
                            <Link to="/admin">
                                <FontAwesomeIcon icon={faScrewdriverWrench} /> admin
                            </Link>
                        </li>
                    }
                    <li>
                        <Link to="/logout">
                            <FontAwesomeIcon icon={faPowerOff} /> Logout
                        </Link>
                    </li>
                </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;