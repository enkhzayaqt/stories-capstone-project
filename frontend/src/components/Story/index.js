import React from "react";
import { useSelector } from "react-redux";

const Story = (props) => {
    const { id, userId, title, body, image } = props.data;
    const user = useSelector(state => state.stories.storyDetails.user)

    return (
        <div className="story-container">
            <div className="story-thumb-container">
                <div className="story-thumb-author">User info {user.name}</div>
                <a href={`/stories/${id}`} className="story-thumb-link">
                    <div className="story-thumb-title">{title}</div>
                </a>
                <div className="story-thumb-body">{body}</div>
                <div className="story-thumb-meta">Writing</div>
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
