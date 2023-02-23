import React from "react";

const Story = (props) => {
    const { id, title, body, image } = props.data;

    return (
        <div className="story-container">
            <a href={`/stories/${id}`} className="story-thumb-link">
                <div className="thumb-img-container">
                    {image !== 'no image yet' ?
                        <img src={image} className="thumb-img" alt="Image" />
                        :
                        <div className="no-image-container"><span>No Image</span></div>
                    }
                </div>
                <div className="title-body-container">
                    <div className="title">{title}</div>
                </div>
                <div className="body">{body}</div>
            </a>
        </div>
    );
};

export default Story;
