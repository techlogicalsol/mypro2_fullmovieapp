import React from "react";
import { Link } from "react-router-dom";

function NavBar(){
    return(
      <div className="container-fluid main_nav">
        
  <ul className="nav">

  <li className="nav-item">
    <Link className="nav-link" to="/">
      <img src="/images/logo1.png" className="logo"/>
    </Link>
  </li>

  <li className="nav-item">
    <Link className="nav-link" to="/trending">
      Trending
      <i className="fas fa-poll myIcon"></i>
    </Link>
  </li>

  <li className="nav-item">
  <Link className="nav-link" to="/movies">
    Movies
    <i className="fas fa-film myIcon"></i>
  </Link>
  </li>

  <li className="nav-item">
  <Link className="nav-link" to="/series">
    Series
    <i className="fas fa-tv myIcon"></i>
  </Link>
  </li>

  <li className="nav-item">
  <Link className="nav-link" to="/search">
    Search
    <i className="fas fa-search myIcon"></i>
  </Link>
  </li>
</ul>

        </div>
    )
}

export default NavBar