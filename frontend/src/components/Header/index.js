import { Link } from "react-router-dom";

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
