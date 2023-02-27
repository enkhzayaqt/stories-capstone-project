import Dropdown from "../DropdownProfile";
import Write from "../Write";
import { Link } from "react-router-dom";
import logo from './logo.png'

const HeaderBar = () => {
    return (
        <div id="header-bar">
            <div id='header-container'>
                <Link id='logo' to='/'>
                    <img id='logo-img' alt="logo" src={logo}/>
                <span id='span-logo'>STORIES</span>
            </Link>
        </div>
            <Write />
            <Dropdown />
        </div>
    )
}

export default HeaderBar;
