import React from "react";
import { Link } from "react-router-dom";

const MappedPosts = ({ post, toLink, onClick }) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div>
            <div className="posts">
                <Link to={toLink} className="postLink" onClick={onClick}>
                    <span>{capitalizeFirstLetter(post.title)}</span>
                </Link>
                <p className="postBody">{capitalizeFirstLetter(post.body)}</p>
            </div>
            <hr className="breakLine" />
        </div>
    );
};

export default MappedPosts;
