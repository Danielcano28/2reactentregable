import { useEffect, useState } from "react";
import WeatherStat from "./WeatherStat";

export const WeatherContainer = ({ weather, language, setLanguage }) => {
  const [iscelsius, setIscelsius] = useState(true);

  const changeUnitTemp = (temp) => {
    if (iscelsius) {
      const celsiusTemp = (temp - 273.15).toFixed(1);
      return `${celsiusTemp}°C`;
    } else {
      const fahrenheitTemp = (((temp - 273.15) * 9) / 5 + 32).toFixed(1);
      return `${fahrenheitTemp}°F`;
    }
  };

  const handleChangeUnitd = () => {
    setIscelsius(!iscelsius);
  };
  console.log(changeUnitTemp(weather.main.temp));

  const handleLanguage = () => {
    language === "en" ? setLanguage("es") : setLanguage("en");
  };

  console.log(weather);
  const [them, setThem] = useState("light");

  useEffect(() => {
    if (them === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [them]);

  const handleTheme = () => {
    setThem((prethem) => (prethem === "light" ? "dark" : "light"));
  };

  return (
    <section className="   text-center gap-5 grid place-items-center text-xl ">
      <h3 className=" text-[2rem] font-semibold dark:text-yellow-700 duration-500   ">
        {weather.name}, {weather.sys.country}
      </h3>

      <div className="grid gap-5 sm:grid-cols-[1fr_auto] ">
        <article className="bg-slate-500/40 rounded-2xl grid grid-cols-2 items-center p  :dark:text-black-700 ">
          <h4 className=" text-black-700 duration-500 text-[1.5rem] col-span-2 text-lg capitalize fon    ">
            {weather.weather[0].description}
          </h4>

          <span className="text-[6rem] font-extralig text-black-600">
            {changeUnitTemp(weather.main.temp)}
          </span>
          <picture className="grid justify-center items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
            />
          </picture>
        </article>

        <article className="grid grid-cols-3 justify-items-center bg-slate-500/40 rounded-2xl p-2 py-3 sm:grid-cols-1  ">
          <WeatherStat icon="/wind.png" unit="m/s" value={weather.wind.speed} />

          <WeatherStat
            icon="/humidity.png"
            unit="%"
            value={weather.main.humidity}
          />
          <WeatherStat
            icon="/pressure.png"
            unit="hPa"
            value={weather.main.pressure}
          />
        </article>
      </div>

      <button
        className=" bg-slate-500/40 text-white-600 rounded-2xl w-36 py-2"
        onClick={handleChangeUnitd}
      >
        C° / F°
      </button>

      <button
        className=" bg-slate-500/40 text-white-600 rounded-2xl w-36 py-2"
        onClick={handleLanguage}
      >
        EN / ES
      </button>

      <button
        className="w-36 py-2 bg-slate-500/40 rounded-2xl"
        onClick={handleTheme}
      >
        dark / light
      </button>
    </section>
  );
};
