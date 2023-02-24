import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Write() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div >
            {sessionUser && (
                <Link to='/stories/new'>
                <i className="fa-solid fa-pen-to-square"></i>
                <span>Write</span>
            </Link>
            )}
        </div>
    )
}

export default Write;
