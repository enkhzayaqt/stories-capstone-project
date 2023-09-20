import React from "react";
import Stories from "../Stories";
import TopicSelection from "../TopicSelection";

const HomePage = () => {
    return (
        <div className="home-page">
            <Stories />
            <TopicSelection />
        </div>
    );
};

export default HomePage;
