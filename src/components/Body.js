import RestroCard, { isNewlyOnboarded } from "./RestroCard";
import { useState, useEffect, useContext } from "react";
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router-dom";
import useShowOnlineStatus from "../utils/useShowOnlineStatus";
import UserContext from "../utils/UserContext";
import myNameContext from "../utils/myNameContext";
import { RESTAURANT_API_URL } from "../utils/constant";

const fallbackRestaurants = [
  {
    info: {
      id: "quickbite-pizza",
      name: "Airport Centre Point - Sadar",
      cloudinaryImageId: "59042b47c295996dfa300193e93493c9",
      cuisines: ["North Indian", "Biryani", "Chinese", "Tandoor"],
      avgRating: 4.5,
      costForTwo: "Rs. 300 for two",
      sla: { deliveryTime: 39 },
    },
  },
  {
    info: {
      id: "quickbite-bowl",
      name: "Olio - The Wood Fired Pizzeria",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/12/24/af4c5491-786a-4458-9021-e2746af8642f_739172.JPG",
      cuisines: ["Pizzas", "Pastas", "Italian", "Fast Food"],
      avgRating: 3.9,
      costForTwo: "Rs. 300 for two",
      sla: { deliveryTime: 30 },
    },
  },
  {
    info: {
      id: "quickbite-burger",
      name: "Subway",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/12/af4a4c50-d6f4-4153-97a7-5bbd9e0b8fc4_695493.jpg",
      cuisines: ["Sandwich", "Salads", "Wrap", "Healthy Food"],
      avgRating: 4.1,
      costForTwo: "Rs. 400 for two",
      sla: { deliveryTime: 23 },
    },
  },
];

const findRestaurants = (value) => {
  if (!value || typeof value !== "object") return null;

  if (Array.isArray(value)) {
    for (const item of value) {
      const restaurants = findRestaurants(item);
      if (restaurants?.length) return restaurants;
    }
    return null;
  }

  const restaurants = value?.gridElements?.infoWithStyle?.restaurants;
  if (Array.isArray(restaurants) && restaurants.length) return restaurants;

  for (const child of Object.values(value)) {
    const nestedRestaurants = findRestaurants(child);
    if (nestedRestaurants?.length) return nestedRestaurants;
  }

  return null;
};

const Body = () => {
  // listOfRestaurants to get all the restro from Api call
  const [listOfRestaurants, setListOfRestaurants] =
    useState(fallbackRestaurants);

  // filteredRestro will have initially all restro but later contains filtered restros
  const [filteredRestro, setFilteredRestro] = useState(fallbackRestaurants);
  const [hasApiError, setHasApiError] = useState(false);

  const [searchText, setSearchText] = useState("");
  console.log("list of restros", listOfRestaurants);

  const OpenRestaurant = isNewlyOnboarded(RestroCard);

  // useEffect will be rendered after entire component rendering is completed.
  useEffect(() => {
    if (RESTAURANT_API_URL) apiData();
  }, []);

  // first render
  // console.log("rendered component");

  const apiData = async () => {
    try {
      const data = await fetch(RESTAURANT_API_URL);
      if (!data.ok) throw new Error(`Restaurant API returned ${data.status}`);

      const jsonData = await data.json();
      const restaurants = findRestaurants(jsonData?.data);

      if (!restaurants?.length)
        throw new Error("Restaurant data is unavailable");

      setListOfRestaurants(restaurants);
      setFilteredRestro(restaurants);
    } catch (error) {
      console.error("Unable to load live restaurants:", error);
      setHasApiError(true);
      setListOfRestaurants(fallbackRestaurants);
      setFilteredRestro(fallbackRestaurants);
    }
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
      {hasApiError && (
        <p className="m-4 rounded bg-yellow-100 p-3 text-yellow-900">
          Live restaurant data is unavailable, so QuickBite is showing sample
          restaurants.
        </p>
      )}
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
            res.info.name.toLowerCase().includes(searchText.toLowerCase()),
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
            (rest) => rest.info.avgRating > 4,
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
