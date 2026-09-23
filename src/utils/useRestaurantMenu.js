import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const apiMenuData = await fetch(MENU_URL + resId);
    const jsonData = await apiMenuData.json();
    console.log("resInfo", jsonData);

    setResInfo(jsonData.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
