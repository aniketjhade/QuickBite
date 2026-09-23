import { localRestaurantMenus } from "./localRestaurantData";

const useRestaurantMenu = (resId) => {
  return localRestaurantMenus[resId] || localRestaurantMenus["quickbite-pizza"];
};

export default useRestaurantMenu;
