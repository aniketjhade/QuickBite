import ItemList from "./ItemList";

const RestaurantCategories = ({ data, showItems, setShowIndex }) => {
  //   console.log("itemCards1", data);

  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div>
      <div className=" mx-auto my-4 w-6/12 shadow-lg p-4 ">
        <div
          className="flex justify-between bg-gray-200 rounded-md p-2 cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span>🔽</span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategories;
