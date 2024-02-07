import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendarDays,
  faUserTie,
  faScrewdriverWrench,
  faLock,
  faCircleUser,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { useState } from "react";

const Header = () => {
    const user = useSelector(selectUser);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleLinkClick = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    return(
        <header>
            <div className="menuContainer">
                <div className="content">
                    <nav role="navigation">
                        <div id="menuToggle">
                            <input type="checkbox" checked={isCheckboxChecked} onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}/>
                            <span></span>
                            <span></span>
                            <span></span>
                            <ul id="menu">
                                <li><h1>MeetSync</h1></li>
                                <li><Link to="/" onClick={handleLinkClick}><FontAwesomeIcon icon={faHouse}/>Home</Link></li>
                                <li><Link to="/event" onClick={handleLinkClick}><FontAwesomeIcon icon={faCalendarDays}/>Events</Link></li>
                                {user.isLogged === false ? (  
                                <>                                 
                                    <li><Link to="/register" onClick={handleLinkClick}><FontAwesomeIcon icon={faLock}/>Sign up</Link></li>
                                    <li><Link to="/login" onClick={handleLinkClick}><FontAwesomeIcon icon={faCircleUser}/>Log in</Link></li>
                                </>                                     
                                ) : (
                                <>                  
                                    <li><Link to="/profil" onClick={handleLinkClick}><FontAwesomeIcon icon={faUserTie}/>{user.infos.firstname}</Link></li>
                                    {user.infos.role === "admin" && 
                                        <li><Link to="/admin" onClick={handleLinkClick}><FontAwesomeIcon icon={faScrewdriverWrench}/>Admin</Link></li>
                                    }
                                    <li><Link to="/logout" onClick={handleLinkClick}><FontAwesomeIcon icon={faPowerOff}/>Logout</Link></li>
                                </>
                                )}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;