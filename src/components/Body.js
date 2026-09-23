import RestroCard, { isNewlyOnboarded } from "./RestroCard";
import { useState, useEffect, useContext } from "react";
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router-dom";
import useShowOnlineStatus from "../utils/useShowOnlineStatus";
import UserContext from "../utils/UserContext";
import myNameContext from "../utils/myNameContext";

const Body = () => {
  // listOfRestaurants to get all the restro from Api call
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  // filteredRestro will have initially all restro but later contains filtered restros
  const [filteredRestro, setFilteredRestro] = useState([]);

  const [searchText, setSearchText] = useState("");
  console.log("list of restros", listOfRestaurants);

  const OpenRestaurant = isNewlyOnboarded(RestroCard);

  // useEffect will be rendered after entire component rendering is completed.
  useEffect(() => {
    apiData();
  }, []);

  // first render
  // console.log("rendered component");

  const apiData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458004&lng=79.0881546&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING "
    );
    const jsonData = await data.json();

    // whenever state variable updates React will trigger the reconciliation cycle i.e re-renders the component
    // second render after an API call
    setListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    setFilteredRestro(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  const onlineStatus = useShowOnlineStatus();

  const { loggedInUser, setUserName } = useContext(UserContext);

  const { name } = useContext(myNameContext);

  if (onlineStatus === false)
    return <h1>You are offline !! Please check your internet connection...</h1>;

  return listOfRestaurants.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="">
      <input
        type="text"
        className="border border-black m-4 px-2 py-1 rounded-md"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>

      <button
        className="px-2 py-1 font-medium text-xl bg-blue-200 rounded-lg mr-5 "
        onClick={() => {
          const filteredRestroData = listOfRestaurants.filter((res) =>
            res.info.name.toLowerCase().includes(searchText.toLowerCase())
          );

          setFilteredRestro(filteredRestroData);
          console.log(filteredRestroData);
        }}
      >
        search
      </button>

      <button
        className="px-2 py-1 font-medium text-xl bg-gray-200 rounded-lg "
        onClick={() => {
          const filteredList = listOfRestaurants.filter(
            (rest) => rest.info.avgRating > 4
          );
          setListOfRestaurants(filteredList);
        }}
      >
        Sort by Ratings
      </button>
      <span>{name}</span>
      <label className="p-2 m-2">Usrname: </label>
      <input
        type="text"
        className="border border-black p-1 "
        value={loggedInUser}
        onChange={(e) => setUserName(e.target.value)}
      ></input>

      <div className="flex flex-wrap ">
        {filteredRestro.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {/* If the restaurant is open then show here */}
              {restaurant.info.isNewlyOnboarded ? (
                <OpenRestaurant resData={restaurant} />
              ) : (
                <RestroCard resData={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
