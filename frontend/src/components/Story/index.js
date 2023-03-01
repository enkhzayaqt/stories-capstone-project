import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementClapThunk } from "../../store/claps";

const Story = (props) => {
    const dispatch = useDispatch();
    const { id, title, body, image, Comments, User, Claps } = props.data;
    const sessionUser = useSelector((state) => state.session.user);
    const [totalClaps, setTotalClaps] = useState(0);
    const [userClapsCount, setUserClapsCount] = useState(0);
    const [counterClass, setCounterClass] = useState("clap-count-display");

    useEffect(() => {
        setTotalClaps(Claps.reduce((a, b) => a + b.count, 0));

        const userStoryClap = Claps.find(x => x.userId === sessionUser?.id);
        setUserClapsCount(userStoryClap ? userStoryClap.count : 0);

    }, [sessionUser, Claps]);

    const handleClap = () => {
        setCounterClass("clap-count-display show");
        if (userClapsCount < 50) {
            dispatch(incrementClapThunk(id));
            setTotalClaps(totalClaps + 1);
            setUserClapsCount(userClapsCount + 1)
        }
        setTimeout(() => {
            setCounterClass("clap-count-display");
        }, 1000);
    }


    return (
        <div className="story-container">
            <div className="story-thumb-container">
                <div className="story-thumb-author">Written by: {User.name}</div>
                <a href={`/stories/${id}`} className="story-thumb-link">
                    <div className="story-thumb-title">{title}</div>
                </a>
                <div className="story-thumb-body">{body}</div>
                <div className="story-thumb-meta" >
                    <span className={counterClass}>+{userClapsCount}</span>
                    <i className="fa-solid fa-hands-clapping clap-icon" onClick={handleClap}></i>
                    <span className="clap-total-count">{totalClaps}</span>
                    <a href={`/stories/${id}`} className="story-thumb-link">
                        <i className="fa-regular fa-comment"></i>
                        {Comments.length}
                    </a>

                </div>
            </div>
            <a href={`/stories/${id}`} className="story-thumb-link">
                <div className="story-thumb-img">
                    {image !== 'no image yet' ?
                        <img src={image} className="thumb-img" alt="Image" />
                        :
                        <div className="no-image-container"><span>No Image</span></div>
                    }
                </div>
            </a>
        </div>
    );
};

export default Story;
