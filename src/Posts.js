import React, { useState, useEffect } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MappedPosts from "./MappedPosts";

import "./Posts.css";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");

    const resultsSorted = (itemSorted) => {
        const sortedResults = [...posts];

        if (itemSorted === "sortAZ") {
            sortedResults.sort((a, b) => a.title.localeCompare(b.title));
        } else if (itemSorted === "sortZA") {
            sortedResults.sort((a, b) => b.title.localeCompare(a.title));
        } else {
            return;
        }

        setPosts(sortedResults);
    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((posts) => {
                // console.log(posts);
                setPosts(posts);
            })
            .catch((err) => console.log(err.message));
    }, []);

    return (
        <div className="mainSection">
            <Header />
            <div className="searchSection">
                <h2 className="lighterWeight">Looking for something specific?</h2>
                <input
                    className="searchFilter"
                    type="text"
                    placeholder={`Search by title / text...`}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="sortingButtons">
                    <p className="lighterWeight">Sort title by:</p>
                    <button onClick={() => resultsSorted("sortAZ")}>&#8593; A - Z</button>
                    <button onClick={() => resultsSorted("sortZA")}>&#8595; Z - A</button>
                </div>
            </div>

            <div className="postsSection">
                <h2>Posts</h2>
                {posts
                    .filter(
                        (val) =>
                            val.title.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                            val.body.toLowerCase().indexOf(input.toLowerCase()) > -1
                    )
                    .map((post) => (
                        <MappedPosts post={post} key={post.id} toLink={`posts/${post.id}`} />
                    ))}
            </div>

            <Footer />
        </div>
    );
};

export default Posts;
