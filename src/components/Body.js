import RestroCard, { isNewlyOnboarded } from "./RestroCard";
import { useState, useEffect, useContext } from "react";
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router-dom";
import useShowOnlineStatus from "../utils/useShowOnlineStatus";
import UserContext from "../utils/UserContext";
import myNameContext from "../utils/myNameContext";

const fallbackRestaurants = [
  {
    info: {
      id: "quickbite-pizza",
      name: "The Pizza Kitchen",
      cuisines: ["Pizzas", "Italian"],
      avgRating: 4.5,
      costForTwo: "Rs. 400 for two",
      imageUrl:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      sla: { deliveryTime: 30 },
    },
  },
  {
    info: {
      id: "quickbite-bowl",
      name: "Green Bowl Co.",
      cuisines: ["Healthy Food", "Salads"],
      avgRating: 4.3,
      costForTwo: "Rs. 350 for two",
      imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      sla: { deliveryTime: 25 },
    },
  },
  {
    info: {
      id: "quickbite-burger",
      name: "Burger Junction",
      cuisines: ["Burgers", "American"],
      avgRating: 4.2,
      costForTwo: "Rs. 300 for two",
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      sla: { deliveryTime: 20 },
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
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  // filteredRestro will have initially all restro but later contains filtered restros
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [hasApiError, setHasApiError] = useState(false);

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
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458004&lng=79.0881546&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      );
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
