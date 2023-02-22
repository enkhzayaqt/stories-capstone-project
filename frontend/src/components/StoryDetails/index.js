import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getStoryDetailsThunk, getStoriesThunk } from "../../store/stories";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./storyDetails.css";

const StoryDetails = () => {
    const routeParams = useParams();
    const storyId = routeParams.id;

    const dispatch = useDispatch();
    const storyDetails = useSelector((state) => state.story.storyDetails);

    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    const { title, body, userId } = spotDetails;

    useEffect(() => {
        dispatch(getStoryDetailsThunk(storyId));
    }, []);


    const OnModalClose = () => {
        dispatch(getStoryDetailsThunk(storyId));
    }

    return (
        <div className="spot-details-container">
            <div className="back-edit-delete-btn-container">
                <button className="btn btn-blue" onClick={() => history.push("/")}>
                    <i className="fa-solid fa-chevron-left"></i><span style={{ marginLeft: 10 }}>Back</span>
                </button>
            </div>

            <h2>{title}</h2>
            <>{body}</>
        </div >
    );
};

export default StoryDetails;
