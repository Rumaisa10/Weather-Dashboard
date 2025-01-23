import { useContext, useEffect, useState } from "react";
import RedHeart from "../assets/heart-red.svg";
import HeartIcon from "../assets/heart.svg";
import { FavouriteContext, WeatherContext } from "../context";

export default function AddFav() {
  const { addToFavourites, removeFromFavourites, favourites } =
    useContext(FavouriteContext);

  const [isFavourite, toggleFavourite] = useState(false);
  const { weatherData } = useContext(WeatherContext);
  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    const found = favourites.find((fav) => fav.location === location);
    toggleFavourite(!!found); // Ensure isFavourite is boolean
  }, [favourites, location]);

  function handleFavorite() {
    const found = favourites.find((fav) => fav.location === location);
    if (!found) {
      addToFavourites(latitude, longitude, location);
      toggleFavourite(true); // Set explicitly after adding
    } else {
      removeFromFavourites(location);
      toggleFavourite(false); // Set explicitly after removing
    }
  }

  return (
    <div className="flex items-center justify-end space-x-6">
      <button
        className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
        onClick={handleFavorite}
      >
        <span>Add to Favourite</span>
        <img src={isFavourite ? RedHeart : HeartIcon} alt="" />
      </button>
    </div>
  );
}
