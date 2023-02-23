import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteStoryThunk, getStoryDetailsThunk, getStoriesThunk } from "../../store/stories";

const StoryDetails = () => {
    const routeParams = useParams();
    const storyId = routeParams.id;
    const dispatch = useDispatch();
    const storyDetails = useSelector((state) => state.stories.storyDetails);
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const { title, body, image, userId } = storyDetails;

    const deleteStory = () => {
        dispatch(deleteStoryThunk(storyId));
        dispatch(getStoriesThunk());
        history.push(`/`);
    }

    const editStory = (e) => {
        e.preventDefault();
        history.push(`/stories/${storyId}/edit`);
        dispatch(getStoryDetailsThunk(storyId));
    }

    useEffect(() => {
        dispatch(getStoryDetailsThunk(storyId));
    }, []);


    const OnModalClose = () => {
        dispatch(getStoryDetailsThunk(storyId));
    }

    return (
        <div className="story-details-container">
            <div className="back-edit-delete-btn-container">
                <button className="btn btn-blue" onClick={() => history.push("/")}>
                    <i className="fa-solid fa-chevron-left"></i><span style={{ marginLeft: 10 }}>Back</span>
                </button>
                {user && user?.id === userId &&
                    <div className="btn-delete-edit-container">
                        <button className="btn btn-blue" style={{ marginRight: 8 }} onClick={(e) => editStory(e)}>
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button className="btn btn-primary" onClick={(e) => deleteStory(e)}>
                            <i className="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                }
            </div>
            <h2>{title}</h2>
            <div className="spot-image-container">
                {image &&
                    <img className="spot-image" src={image} alt="Image" />
                }
            </div>
            <div>{body}</div>
            <br/>
            <div>
                Written by {user?.name}
            </div>
        </div>
    );
};

export default StoryDetails;
