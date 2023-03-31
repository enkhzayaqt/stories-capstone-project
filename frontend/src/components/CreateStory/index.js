import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStoryThunk, getStoryDetailsThunk } from "../../store/stories";

const CreateStory = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state?.session?.user);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const newStory = {
                userId: user.id,
                title,
                body,
                image
            };
            const createdStory = await dispatch(createStoryThunk(newStory));
            history.push(`/stories/${createdStory.id}`)
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
        }
    };

    const validate = () => {
        const errors = [];
        if (title?.length === 0) errors.push("Please enter a title");
        if (title?.length < 3 || title?.length > 80) errors.push("Title must be between 3 to 80 characters")
        if (body?.length === 0) errors.push("Please enter a body");
        if (body?.length < 30 || title?.length > 2000) errors.push("Body must be between 30 to 2000 characters")
        setErrors(errors);
        if (errors.length > 0) return false;
        else return true;
    };

    const cancel = (e) => {
        e.preventDefault();
        history.push(`/`);
    };

    return (
        <div className="create-story-container">
            <button className="btn btn-blue" onClick={() => { history.push('/') }}>
                <i className="fa-solid fa-chevron-left"></i><span style={{ marginLeft: 10 }}>Back</span>
            </button>

            <h1>Create Story</h1>
            <ul className="error-container">{errors.map((error) => <li key={error}>{error}</li>)}</ul>
            <form onSubmit={handleSubmit}>
                <div className="create-story-content">
                    <div className="column">
                        <label> Title: <span className="asterisk">*</span>
                            <input className="input"
                                type="text"
                                placeholder="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label> Body: <span className="asterisk">*</span>
                            <textarea
                                className="input"
                                placeholder="body"
                                value={body}
                                rows="3"
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </label>
                        <label> Image:
                            <input className="input" type="file" onChange={updateFile} />
                        </label>
                    </div>
                    <div className="column">

                        <div className="margin-top-10" style={{ float: 'right' }}>
                            <button className="btn btn-blue" style={{ marginRight: 15 }} onClick={(e) => cancel(e)}>Cancel</button>
                            <button className="btn btn-primary" type="submit">Publish</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateStory;
