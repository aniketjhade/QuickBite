import ShimmerUI from "./ShimmerUI";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategories from "./RestaurantCategories";
import { useState } from "react";

const RestaurantManu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <ShimmerUI />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const restroCategories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    );

  console.log("categ", restroCategories);

  return (
    <div className="text-center">
      <h1 className="text-center font-bold text-2xl p-2 m-2">{name}</h1>
      <h2 className="font-semibold text-lg">
        {" "}
        {cuisines.join(", ")} - {costForTwoMessage}
      </h2>

      <h2 className="font-bold text-2xl text-gray-600 bg-gray-300 w-1/12 m-auto rounded-lg my-6 ">
        Menu
      </h2>

      {restroCategories.map((category, index) => (
        <RestaurantCategories
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantManu;
