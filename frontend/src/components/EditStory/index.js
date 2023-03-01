import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editStoryThunk } from "../../store/stories";

const EditStory = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { storyId } = useParams();
    const user = useSelector((state) => state?.session?.user);
    const oldStory = useSelector((state) => state?.stories.storyDetails);

    const [title, setTitle] = useState(oldStory.title);
    const [body, setBody] = useState(oldStory.body);
    const [image, setImage] = useState(oldStory.image);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const newStory = {
                id: storyId,
                userId: user.id,
                title,
                body,
                image
            };

            const editedStory = await dispatch(editStoryThunk(newStory, storyId));

            if (editedStory) {
                history.replace(`/stories/${storyId}`);
            }
        }
    }

    const cancel = (e) => {
        e.preventDefault();
        history.push(`/stories/${storyId}`);
    };

    const validate = () => {
        const errors = [];
        if (title?.length === 0) errors.push("Please enter a title");
        if (title?.length < 3 || title?.length > 80) errors.push("Title must be between 3 to 80 characters")
        if (body?.length === 0) errors.push("Please enter a body");
        if (body?.length < 30 || title?.length > 2000) errors.push("Body must be between 30 to 2000 characters")
        if (image?.length === 0) errors.push("Please enter a image url");
        setErrors(errors);
        if (errors.length > 0) return false;
        else return true;
    };

    return (
        <div className="edit-story-container">
            <button className="btn btn-blue" onClick={() => { history.push(`/stories/${storyId}`) }}>
                <i className="fa-solid fa-chevron-left"></i><span style={{ marginLeft: 10 }}>Back</span>
            </button>

            <h1>Edit Story</h1>
            <ul className="error-container">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
            <form onSubmit={handleSubmit}>
                <label> Title:
                    <input className="input"
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label> Body:
                    <input className="input"
                        type="text"
                        placeholder="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </label>
                <label> Image:
                    <input className="input"
                        type="text"
                        placeholder="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>

                <button className="btn btn-blue" style={{ marginRight: 10 }} onClick={(e) => cancel(e)}>Cancel</button>
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditStory;
