import React from "react";
import { useSelector } from "react-redux";
import "./story.css";

const Story = (props) => {
    const user = useSelector((state) => state.session.user);

    const { id, title, body } = props.data;

    return (
        <div className="spot-container">
            <a href={`/stories/${id}`} className="spot-thumb-link">
                {/* <div className="thumb-img-container">
                    {previewImage !== 'no image yet' ?
                        <img src={previewImage} className="thumb-img" alt="Spot Image" />
                        :
                        <div className="no-image-container"><span>No Image</span></div>
                    }
                </div> */}
                <div className="address-review-container">
                    <div className="title">{title}</div>
                </div>

                <div className="desc">{body}</div>
            </a>

        </div>

    );
};

export default Story;
