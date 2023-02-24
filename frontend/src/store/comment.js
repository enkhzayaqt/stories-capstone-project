import { csrfFetch } from "./csrf";

const GET = "comments/GET";
const ADD = 'comments/ADD';
const DELETE = "comments/DELETE";
const EDIT= "comments/EDIT";

// Action creators
export const getComments = (comments) => ({
    type: GET,
    comments
});

export const addComment = (comment) => ({
    type: ADD,
    comment
});

export const deleteComment = (commentId) => ({
    type: DELETE,
    commentId
})

export const editComment = (comment) => ({
    type: EDIT,
    comment
})


// Thunk
export const getCommentsThunk = (storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories/${storyId}/comments`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
        return data;
    }
};

export const addCommentThunk = (data, storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories/${storyId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data));
        return data;
    }
};

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteComment(commentId));
    }
}

export const editCommentThunk = (data, commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(editComment(data));
        return data;
    }
}

// Initial State
const initialState = {
    storyComments: {}
};

// Reducer
export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case GET: {
            return {
                ...state,
                storyComments: action.comments,
            };
        }
        case ADD:
            return {
                ...state,
                [action.comment.id]: action.comment,
            }
        case DELETE:
            const newState = {
                ...state,
            }
            delete newState.storyComments[action.commentId];
            return newState;
        case EDIT: {
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        }
        default:
            return state;
    }
}
