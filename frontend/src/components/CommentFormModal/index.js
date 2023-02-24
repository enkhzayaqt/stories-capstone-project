import React, { useEffect, useState } from "react";
import * as commentActions from "../../store/comment";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function CommentFormModal({ storyid, callbackClose }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = [];
    if (comment === "") errors.push("Please enter your comment");
    setErrors(errors);
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(commentActions.addCommentThunk({ comment }, storyid))
      .then(() => {
        callbackClose();
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        const { message } = data;
        setErrors([message]);
      });
  };

  return (
    <div className="new-review-container">
      <h1 className="title">Write your Comment</h1>
      <form onSubmit={handleSubmit}>
        <ul className="error-container">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Comment
          <textarea
            className="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary margin-top-10">Submit</button>
      </form >
    </div >
  );
}

export default CommentFormModal;
