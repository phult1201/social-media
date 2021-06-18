import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header">
      <nav className="header_nav">
        <Link to="/" className="header_logo">
          <h4 onClick={() => window.scrollTo({ top: 0 })}>Social - Network</h4>
        </Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
