import { Link } from "react-router-dom";
import "./Header.css";


function Header() {
    return (
        <div id='header-container'>
            <Link id='logo' to='/'>
                <span id='span-logo'>Stories</span>
            </Link>
        </div>
    )
}

export default Header;
