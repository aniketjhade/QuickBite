import { CDN_URL } from "../utils/constant";

const RestroCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, imageUrl, name, cuisines, avgRating, costForTwo } =
    resData?.info;

  const { deliveryTime } = resData?.info?.sla;

  return (
    <div className=" w-[300px] m-2 p-2 hover:bg-green-100">
      <div>
        <img
          alt="image"
          className="h-48 w-full rounded-xl "
          src={imageUrl || CDN_URL + cloudinaryImageId}
        />
        <h3 className="font-bold text-xl m-1 py-1">{name}</h3>
        <h5 className=" m-1">{cuisines.join(", ")}</h5>
        <h5 className=" m-1">{avgRating} star</h5>
        <h5 className=" m-1">{deliveryTime} Mins</h5>
        <h5 className=" m-1">{costForTwo}</h5>
      </div>
    </div>
  );
};

// Higher order component

export const isNewlyOnboarded = (RestroCard) => {
  return (props) => {
    return (
      <div>
        <p className="absolute bg-black text-white ml-4">Newly Onboarded</p>
        <RestroCard {...props} />
      </div>
    );
  };
};

export default RestroCard;
