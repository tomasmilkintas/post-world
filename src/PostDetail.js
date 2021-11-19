import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MappedPosts from "./MappedPosts";

import "./PostDetail.css";

const PostDetail = () => {
    const [post, setPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");

    const { id } = useParams();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const scrollTotheTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`),
        ])
            .then((responses) => {
                return Promise.all(
                    responses.map((response) => {
                        return response.json();
                    })
                );
            })
            .then((data) => {
                setPost(data[0]);
                setPosts(data[1]);
                setUser(data[2]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, post.userId]);

    return (
        <div className="singlePost">
            <Header />
            <div className="singlePostSection">
                <h2>{post.title && capitalizeFirstLetter(post.title)}</h2>
                <hr className="breakLine" />
                <p>{post.body && capitalizeFirstLetter(post.body)}</p>
                <p>
                    By: <span className="postSpan">{user.name ? user.name : "Unknown Author"}</span>
                </p>
                <hr className="breakLine" />
                <div>
                    <Link to={`/`}>
                        <span>Go back</span>
                    </Link>
                </div>
            </div>

            <div className="postsSection">
                <h2>
                    More by{" "}
                    <span className="postSpan">{user.name ? user.name : "this author"}</span>:
                </h2>
                {posts
                    .filter((val) => val.userId.toString().toLowerCase().indexOf(user.id) > -1)
                    .map((post) => (
                        <MappedPosts
                            post={post}
                            key={post.id}
                            toLink={`${post.id}`}
                            onClick={scrollTotheTop()}
                        />
                    ))}
            </div>

            <Footer />
        </div>
    );
};

export default PostDetail;
