import React, { useEffect, useState } from "react";
import * as commentActions from "../../store/comment";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function CommentFormModal({ storyId, callbackClose }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // useEffect(() => {
  //   const errors = [];
  //   if (comment === "") errors.push("Please enter your comment");
  //   setErrors(errors);
  // }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      return dispatch(commentActions.addCommentThunk({ comment }, storyId))
      .then(() => {
        callbackClose();
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        const { message } = data;
        setErrors([message]);
      });
    }
  };

  const validate = () => {
    const errors = [];
    if (comment === "") errors.push("Please enter your comment");
    setErrors(errors);
    if (errors.length > 0) return false;
    else return true;
  }

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
          Comment:
          <textarea
            className="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary margin-top-10">Submit</button>
      </form >
    </div>
  );
}

export default CommentFormModal;
