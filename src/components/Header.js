import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
// import About from "./About";
import useShowOnlineStatus from "../utils/useShowOnlineStatus";
import UserContext from "../utils/UserContext";
import myNameContext from "../utils/myNameContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");

  const onlineStatus = useShowOnlineStatus();
  console.log(onlineStatus);

  const { loggedInUser } = useContext(UserContext);
  const { firstName } = useContext(myNameContext);

  const cartItems = useSelector((store) => store.cart.items);
  console.log("cartItems", cartItems);

  return (
    <div className="flex shadow-lg mb-2 justify-between items-center bg-green-200 font-bold sm:bg-yellow-200 md:bg-blue-200 lg:bg-green-200">
      <div className="h-24 w-24 ml-16">
        <img src={LOGO_URL} />
      </div>
      <div>
        <ul className="flex items-center p-4 m-4">
          <li className="p-3">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="p-3">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3">
            <Link to="/about">About</Link>
          </li>
          <li className="p-3">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="p-3">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="p-3 font-bold text-xl">
            <Link to="/cart">Cart: ({cartItems.length} items )</Link>
          </li>
          <button
            className="loginbtn"
            onClick={() => {
              loginBtn === "Login"
                ? setLoginBtn("Logout")
                : setLoginBtn("Login");
            }}
          >
            {loginBtn}
          </button>

          <li className="p-3">{loggedInUser}</li>
          <li className="p-3">{firstName}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
