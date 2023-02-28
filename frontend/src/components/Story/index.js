import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Story = (props) => {
    const dispatch = useDispatch();
    const { id, userId, title, body, image } = props.data;
    // const user = useSelector(state => state.stories.storyDetails.user)
    const [clap, setClap] = useState(0);

    const handleClap = () => {
        setClap(clap + 1);
        dispatch()
    }
    return (
        <div className="story-container">
            <div className="story-thumb-container">
                <div className="story-thumb-author">User info {userId}</div>
                <a href={`/stories/${id}`} className="story-thumb-link">
                    <div className="story-thumb-title">{title}</div>
                </a>
                <div className="story-thumb-body">{body}</div>
                <div className="story-thumb-meta" onClick={handleClap}>
                    <i className="fa-solid fa-hands-clapping"></i>
                    { clap}
                </div>
            </div>
            <a href={`/stories/${id}`} className="story-thumb-link">
                <div className="story-thumb-img">
                    {image !== 'no image yet' ?
                        <img src={image} className="thumb-img" alt="Image" />
                        :
                        <div className="no-image-container"><span>No Image</span></div>
                    }
                </div>
            </a>
        </div>
    );
};

export default Story;
