import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

const Home = () =>{


    return(
    <section className="section">
        <div className="container">
            <div className="content">
                <div className="sub-content">
                    <h2 className="sub-content-title">Connect, Sync, Meet: Transform your professional network with MeetSync!</h2>
                    <p>MeetSync revolutionizes professional interactions by offering a dynamic platform to optimize your meetings at events. Thanks to our intuitive technology, create unique networking opportunities, schedule your meetings and share your experiences, all in just a few clicks. Join the MeetSync community and take your career to the next level.</p>
                    <Link to="/event">
                        <button className="button">Start now <FontAwesomeIcon icon={faAngleRight}/></button>
                    </Link>
                </div>
            </div>
        </div>
    </section>

    )
}

export default Home