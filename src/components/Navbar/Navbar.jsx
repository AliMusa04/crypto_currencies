import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const favCount = useSelector((state) => state.favCount.value);
  return (
    <>
      <header>
        <div className="img_div">
          <Link to={""}>
            <img
              src="https://www.imgacademy.com/sites/default/files/imga-blue.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="link_div">
          <ul>
            <li>
              <Link to={""}>Home</Link>
            </li>
            <li>
              <Link to={"/favourites"}>
                Favourites
                <span className="count">{favCount.length}</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="img_div_back"></div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Navbar;
