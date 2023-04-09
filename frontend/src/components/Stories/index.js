import React, { useEffect } from "react";
import { getStoriesThunk } from "../../store/stories";
import { useSelector, useDispatch } from "react-redux";
import Story from "../Story";

const Stories = () => {
    const dispatch = useDispatch();
    const storiesObj = useSelector((state) => state.stories.allStories);
    const stories = Object.values(storiesObj);
    const sortedStories = stories.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    useEffect(() => {
        dispatch(getStoriesThunk());
    }, [dispatch]);

    return (
        <div className="story-container-root">
            {
                sortedStories.map((story, idx) => {
                    return <Story data={story} key={idx} />
                })
            }
        </div>
    );
};

export default Stories;
