import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStoryThunk } from "../../store/stories";

const Story = (props) => {
    const dispatch = useDispatch();
    const { id, userId, title, body, image, Comments, User } = props.data;
    console.log('props.data', props.data)
    // const user = useSelector(state => state.stories.storyDetails.user)
    const [claps, setClaps] = useState(props.data.claps);

    const handleClap = () => {
        setClaps(previousState => previousState + 1);
    }
    return (
        <div className="story-container">
            <div className="story-thumb-container">
                <div className="story-thumb-author">Written by: {User.name}</div>
                <a href={`/stories/${id}`} className="story-thumb-link">
                    <div className="story-thumb-title">{title}</div>
                </a>
                <div className="story-thumb-body">{body}</div>

                <div className="story-thumb-meta" >
                    <div >
                        <i className="fa-solid fa-hands-clapping" onClick={handleClap}></i>
                        {claps}
                        <a href={`/stories/${id}`} className="story-thumb-link">
                            <i className="fa-regular fa-comment"></i>
                        </a>
                        {Comments.length}
                    </div>
                    <div>

                    </div>


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
