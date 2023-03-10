import { csrfFetch } from "./csrf";

const GET_STORIES = "stories/GET_STORIES";
const GET_STORYDETAILS = "stories/GET_STORYDETAILS";
const CREATE = 'stories/CREATE';
const DELETE = 'stories/DELETE';
const EDIT = "stories/EDIT";

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
    type: CREATE,
    story
})

export const deleteStory = (storyId) => ({
    type: DELETE,
    storyId
})

export const editStory = (story) => ({
    type: EDIT,
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
    const { image, title, body } = userInput;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image) formData.append("image", image);

    const response = await csrfFetch('/api/stories/', {
        method: 'POST',
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createStory(data));
        return data;
    }
}

export const editStoryThunk = (input, storyId) => async (dispatch) => {
    const { image, title, body } = input;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/stories/${storyId}`, {
        method: 'PUT',
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(editStory(data));
        return data;
    }
}

export const deleteStoryThunk = (storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories/${storyId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteStory(data));
        return data
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
        case CREATE:
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
        case DELETE: {
            const newState = {
                ...state
            }
            delete newState.allStories[action.storyId]
            return newState
        }
        case EDIT: {
            return {
                ...state,
                [action.story.id]: action.story
            }
        }
        default:
            return state;
    }
}
