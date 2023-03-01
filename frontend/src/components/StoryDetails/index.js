import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteStoryThunk, getStoryDetailsThunk, getStoriesThunk } from "../../store/stories";
import { deleteCommentThunk, getCommentsThunk } from "../../store/comment";
import EditCommentModal from '../EditCommentModal';
import CommentFormModal from '../CommentFormModal';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const StoryDetails = () => {
    const routeParams = useParams();
    const storyId = routeParams.id;
    const dispatch = useDispatch();
    const storyDetails = useSelector((state) => state.stories.storyDetails);
    const storyComments = useSelector((state) => state.comments.storyComments.comment);
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const { title, body, image, userId, user } = storyDetails;

    const deleteStory = () => {
        dispatch(deleteStoryThunk(storyId));
        dispatch(getStoriesThunk());
        history.push(`/`);
    }

    const editStory = (e) => {
        e.preventDefault();
        history.push(`/stories/${storyId}/edit`);
        dispatch(getStoryDetailsThunk(storyId));
        dispatch(getCommentsThunk(storyId));

    }

    const deleteComment = (commentId) => {
        dispatch(deleteCommentThunk(commentId));
        //refresh
        dispatch(getStoryDetailsThunk(storyId));
        dispatch(getCommentsThunk(storyId));
    };

    useEffect(() => {
        dispatch(getStoryDetailsThunk(storyId));
        dispatch(getCommentsThunk(storyId));
    }, []);


    const OnModalClose = () => {
        dispatch(getStoryDetailsThunk(storyId));
        dispatch(getCommentsThunk(storyId));
    }

    return (
        <div className="story-details-container">
             <div className="story-detail-title">
                <div className="story-title">
                    <h2>{title}</h2>
                </div>
                <div>
                    {sessionUser && sessionUser?.id === userId &&
                    <div className="btn-delete-edit-container">
                            <button
                                className="btn"
                                style={{ marginRight: 8 }}
                                onClick={(e) => editStory(e)}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                            <button
                                className="btn"
                                onClick={(e) => deleteStory(e)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                }
                </div>
            </div>
            <div>
                Written by: { user?.name}
            </div>
            <div className="spot-image-container">
                {image &&
                    <img className="spot-image" src={image} alt="Image" />
                }
            </div>
            <div>{body}</div>
            <br />

            {/* Comment Section */}
            <div>
                <div className="comment-container">
                    <div className="review-header">
                        <div className="write-review-modal">
                            {sessionUser &&
                                <button className="btn-openmodal btn-white">
                                    <OpenModalMenuItem
                                        itemText="Write a comment"
                                        modalComponent={<CommentFormModal storyId={storyId} callbackClose={() => OnModalClose()} />}
                                    />
                                </button>
                            }
                        </div>
                    </div>
                    <div className="review-body">
                        {
                            storyComments?.map((comment, idx) => {
                                const commentDate = new Date(comment.createdAt);

                                return (
                                    <div className="comment-item" key={idx}>
                                        <div className="comment-item-header">
                                            <div className="title">
                                                <div className="avatar">
                                                    <i className="far fa-user" />
                                                </div>
                                                <div className="titlebody">
                                                    <div className="name">{comment.User.name} </div>
                                                    <div className="date">{commentDate.toDateString()}</div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="comment-item-desc">{comment.comment}</div>
                                        <div className="buttons">
                                            {sessionUser?.id == comment.userId &&
                                                <div className="edit-delete-review-btn-container">
                                                    <button className="btn" style={{
                                                        marginRight: 5
                                                    }}>
                                                        <OpenModalMenuItem
                                                            itemText = <i className="fa-solid fa-pen-to-square"></i>
                                                            modalComponent={<EditCommentModal commentId={comment.id} comment={comment.comment} callbackClose={() => OnModalClose()} />}
                                                        />
                                                    </button>
                                                    <div className="btn-delete-edit-container">
                                                        <button className="btn" onClick={() => deleteComment(comment.id)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryDetails;
