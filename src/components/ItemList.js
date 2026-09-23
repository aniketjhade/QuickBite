import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constant";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  // Dispatch an action to the slice of redux

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          className="text-left border-b-8 my-3 border-gray-200 flex p-2"
          key={item.card?.info?.id}
        >
          <div className="w-9/12">
            <span className="font-semibold text-lg">
              {item.card?.info?.name}
            </span>
            <p className="font-lg text-lg">
              ₹
              {item.card?.info?.price
                ? item.card?.info?.price / 100
                : item.card?.info?.defaultPrice / 100}
            </p>
            <p className="font-light text-md my-3">
              {item.card?.info?.description}
            </p>
          </div>
          <div className="w-3/12 mb-2 ">
            <div className="absolute text-green-700 font-bold bg-white rounded-md px-2 py-1 mt-36 ml-14 shadow-lg">
              <button onClick={() => handleAddItem(item)}>Add +</button>
            </div>
            <img
              className="rounded-xl"
              src={CDN_URL + item.card?.info?.imageId}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
