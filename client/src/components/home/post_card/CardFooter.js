import React from "react";
import { Link } from "react-router-dom";

const CardFooter = ({ post }) => {
  return (
    <div className="card_footer">
      <div className="card_footer-icon-menu">
        <div>
          <i className="far fa-heart" />
          <Link to={`/post/${post._id}`}>
            <i className="far fa-comment" />
          </Link>
          <i class="fas fa-paper-plane"></i>
        </div>
        <i className="far fa-bookmark" />
      </div>

      <div className="card_footer-count">
        <span>{post.likes.length}</span>
        <span>{post.comments.length} Comments</span>
      </div>
    </div>
  );
};

export default CardFooter;
