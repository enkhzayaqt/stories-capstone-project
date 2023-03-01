import { csrfFetch } from "./csrf";

const INCREMENT = 'stories/INCEMENT';

// Action creators
export const incrementClaps = (clap) => ({
    type: INCREMENT,
    clap
});


// Thunk
export const incrementClapThunk = (storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories/${storyId}/clap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(incrementClaps(data));
        return data;
    }
};


// Initial State
const initialState = {
    claps: {}
};

// Reducer
export default function clapsReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                [action.clap.storyId]: action.clap.updated,
            }
        default:
            return state;
    }
}
