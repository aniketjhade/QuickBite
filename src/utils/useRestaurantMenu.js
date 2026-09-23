import { useEffect, useState } from "react";
import { MENU_URL } from "./constant";
import { localRestaurantMenus } from "./localRestaurantData";

const useRestaurantMenu = (resId) => {
  const localMenu =
    localRestaurantMenus[resId] || localRestaurantMenus["quickbite-pizza"];
  const [resInfo, setResInfo] = useState(localMenu);

  useEffect(() => {
    const loadLiveMenu = async () => {
      try {
        const response = await fetch(MENU_URL + resId);
        if (!response.ok)
          throw new Error(`Menu API returned ${response.status}`);

        const jsonData = await response.json();
        if (jsonData?.data?.cards) setResInfo(jsonData.data);
      } catch (error) {
        console.warn("Live menu unavailable; using local data.", error);
      }
    };

    loadLiveMenu();
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
