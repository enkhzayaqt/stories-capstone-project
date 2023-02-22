import { csrfFetch } from "./csrf";

const GET_STORIES = "stories/GET_STORIES";
const GET_STORYDETAILS = "stories/GET_STORYDETAILS";
const CREATE_STORY = 'stories/CREATE_STORY';


// Action creators
export const getStories = (stories) => ({
    type: GET_STORIES,
    stories
});

export const getStoryDetails = (story) => ({
    type: GET_STORYDETAILS,
    story
});

export const createStory = (story) => ({
    type: CREATE_STORY,
    story
})


// Thunk
export const getStoriesThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/stories`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getStories(data));
        return data;
    }
};

export const getStoryDetailsThunk = (storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories/${storyId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getStoryDetails(data));
        return data;
    }
};

export const createStoryThunk = (userInput) => async (dispatch) => {
    const response = await csrfFetch('/api/stories/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createStory(data));
        return data;
    }
}


// Initial State
const initialState = {
    allStories: {},
    storyDetails: {}
};

// Reducer
export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STORIES: {
            const newState = {};
            action.stories.Stories.forEach((story) => {
                newState[story.id] = story;
            });
            return {
                ...state,
                allStories: newState
            }
        }
        case CREATE_STORY:
            return {
                ...state,
                [action.story.id]: action.story
            }
        case GET_STORYDETAILS: {
            return {
                ...state,
                storyDetails: action.story,
            };
        }
        default:
            return state;
    }
}
