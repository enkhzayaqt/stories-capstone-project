import { Link } from "react-router-dom";

function Write() {
    return (
        <div >
            <Link to='/stories/new'>
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Write</span>
            </Link>
        </div>
    )
}

export default Write;
