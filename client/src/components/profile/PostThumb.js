import React from "react";
import { Link } from "react-router-dom";

const PostThumb = ({ posts, result }) => {
  if (result === 0)
    return (
      <h1 style={{ textAlign: "center", fontSize: "2.4rem" }}>No Posts</h1>
    );
  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/profile/${post._id}`}>
          <div className="post_thumb_display">
            <img src={post.images[0].url} alt="post_thumb" />

            <div className="post_thumb_display_menu">
              <i className="far fa-heart">{post.likes.length}</i>
              <i className="far fa-comment">{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
