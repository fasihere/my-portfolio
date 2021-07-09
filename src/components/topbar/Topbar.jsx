import "./topbar.scss"
import {Person,Mail} from "@material-ui/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity } from '@fortawesome/free-solid-svg-icons';
import {$mainColor} from "../../global.scss";

export default function Topbar({menuOpen, setMenuOpen}) {
    return (
        <div className={"topbar " + (menuOpen && "active")}>
            <div className="wrapper">
                <div className="left">
                    <a href="#intro" className="logo">
                        <FontAwesomeIcon icon={faInfinity} color="#15023a" size="3x" className="infi"/>
                    </a>
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>+91 7034 073143</span>
                    </div>
                    <div className="itemContainer">
                        <Mail className="icon"/>
                        <span>fasihere@gmail.com</span>
                    </div>
                </div>
                <div className="right">
                    <div className="hamburger" onClick={()=> setMenuOpen(!menuOpen)}>
                        <span className="line1"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
