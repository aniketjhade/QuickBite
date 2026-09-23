import RestroCard, { isNewlyOnboarded } from "./RestroCard";
import { useState, useEffect, useContext } from "react";
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
  {
    info: {
      id: "quickbite-crustos",
      name: "Crusto's - Cheese Burst Pizza By Olio",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/12/24/b0b5a797-b55c-4d0d-8a7f-519285a493b8_739173.JPG",
      cuisines: ["Pizzas", "Pastas", "Italian", "Fast Food"],
      avgRating: 4.0,
      costForTwo: "Rs. 300 for two",
      sla: { deliveryTime: 36 },
    },
  },
  {
    info: {
      id: "quickbite-pizza-hut",
      name: "Pizza Hut",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/6/15/a1f38ddd-e4d6-4ca6-9e34-453e9d04a324_383690.JPG",
      cuisines: ["Pizzas"],
      avgRating: 4.1,
      costForTwo: "Rs. 300 for two",
      sla: { deliveryTime: 33 },
    },
  },
  {
    info: {
      id: "quickbite-cakezone",
      name: "Cheesecakes By CakeZone",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/5/15/aca6431c-f3a8-414d-8175-799fdb32c918_741991.jpg",
      cuisines: ["Beverages", "Desserts", "Ice Cream", "Juices"],
      avgRating: 3.8,
      costForTwo: "Rs. 200 for two",
      sla: { deliveryTime: 28 },
    },
  },
  {
    info: {
      id: "quickbite-dominos",
      name: "Domino's Pizza",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/9/3/6d41f167-76d1-4c40-9832-b5e3628dde8f_76087.JPG",
      cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
      avgRating: 4.3,
      costForTwo: "Rs. 400 for two",
      sla: { deliveryTime: 30 },
    },
  },
  {
    info: {
      id: "quickbite-kfc",
      name: "KFC",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/7/1/2173c72a-6ece-4e68-a924-367f6f6bc531_340377.JPG",
      cuisines: ["Burgers", "Fast Food", "Rolls & Wraps"],
      avgRating: 4.2,
      costForTwo: "Rs. 400 for two",
      sla: { deliveryTime: 41 },
    },
  },
  {
    info: {
      id: "quickbite-kwality-walls",
      name: "Kwality Wall's Ice Cream And More",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/6/13/eb7f4b65-43b8-47a2-af88-6350fbe9fcd2_510859.JPG",
      cuisines: ["Desserts", "Ice Cream", "Ice Cream Cakes"],
      avgRating: 4.5,
      costForTwo: "Rs. 200 for two",
      sla: { deliveryTime: 29 },
    },
  },
  {
    info: {
      id: "quickbite-mcdonalds",
      name: "McDonald's",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/6/18/2a5528c5-80c0-47a5-8afb-5a6d3e7a2a5d_256895.JPG",
      cuisines: ["Burgers", "Beverages", "Cafe", "Desserts"],
      avgRating: 4.4,
      costForTwo: "Rs. 400 for two",
      sla: { deliveryTime: 40 },
    },
  },
  {
    info: {
      id: "quickbite-burger-king",
      name: "Burger King",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/18/30080344-82ac-4002-8f51-db1645b4e41d_697183.jpg",
      cuisines: ["Burgers", "American"],
      avgRating: 4.3,
      costForTwo: "Rs. 350 for two",
      sla: { deliveryTime: 40 },
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
  const [listOfRestaurants, setListOfRestaurants] =
    useState(fallbackRestaurants);

  const [filteredRestro, setFilteredRestro] = useState(fallbackRestaurants);

  const [searchText, setSearchText] = useState("");
  console.log("list of restros", listOfRestaurants);

  const OpenRestaurant = isNewlyOnboarded(RestroCard);

  useEffect(() => {
    const loadLiveRestaurants = async () => {
      try {
        const response = await fetch(RESTAURANT_API_URL);
        if (!response.ok)
          throw new Error(`Restaurant API returned ${response.status}`);

        const jsonData = await response.json();
        const restaurants = findRestaurants(jsonData?.data);
        if (!restaurants?.length)
          throw new Error("Restaurant data is unavailable");

        setListOfRestaurants(restaurants);
        setFilteredRestro(restaurants);
      } catch (error) {
        console.warn("Live restaurants unavailable; using local data.", error);
      }
    };

    loadLiveRestaurants();
  }, []);

  const onlineStatus = useShowOnlineStatus();

  const { loggedInUser, setUserName } = useContext(UserContext);

  const { name } = useContext(myNameContext);

  if (onlineStatus === false)
    return <h1>You are offline !! Please check your internet connection...</h1>;

  return (
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
