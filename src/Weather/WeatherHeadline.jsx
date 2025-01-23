import { useContext } from "react";
import Cloud from ".././assets/cloud.svg";
import Haze from ".././assets/haze.svg";
import Sunny from ".././assets/icons/sunny.svg";
import Rain from ".././assets/rainy.svg";
import Thunder from ".././assets/thunder.svg";
import PinIcon from "../assets/pin.svg";
import { WeatherContext } from "../context/index";
import { getFormattedDate } from "../utils/date-utils";

export default function WeatherHeadline() {
  const { weatherData } = useContext(WeatherContext);
  const { climate, location, temperature, time } = weatherData;

  function getWeatherIcon(climate) {
    switch (climate) {
      case "Rain":
        return Rain;
      case "Clouds":
        return Cloud;
      case "Clear":
        return Sunny;
      case "Thunder":
        return Thunder;
      case "Fog":
        return Haze;
      case "Mist":
        return Haze;
      case "Haze":
        return Haze;

      default:
        return Sunny;
    }
  }
  return (
    <>
      <div className="max-md:flex items-center justify-between md:-mt-10">
        <img src={getWeatherIcon(climate)} alt="cloud" />
        <div className="max-md:flex items-center max-md:space-x-4">
          <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
            {Math.round(temperature)}
          </h1>
          <div className="flex items-center space-x-4 md:mb-4">
            <img src={PinIcon} />
            <h2 className="text-2xl lg:text-[50px]">{location}</h2>
            <p className="text-sm lg:text-lg">
              {getFormattedDate(time, "time", false)}-
              {getFormattedDate(time, "date", false)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
