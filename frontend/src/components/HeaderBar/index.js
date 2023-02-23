import Header from "../Header";
import Dropdown from "../Dropdown";
import Write from "../Write";

const HeaderBar = () => {
    return (
        <div id="header-bar">
            <Header />
            <Write />
            <Dropdown />
        </div>
    )
}

export default HeaderBar;
