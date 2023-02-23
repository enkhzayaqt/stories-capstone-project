import { Link } from "react-router-dom";

function Write() {
    return (
        <div >
            <Link to='/stories/new'>
                <i className="fa-light fa-pen-to-square">Write</i>
            </Link>
        </div>
    )
}

export default Write;
