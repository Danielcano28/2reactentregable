import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { WeatherContainer } from "./components/WeatherContainer";

function App() {
  const [weather, setWeather] = useState(null);
  const [language, setLanguage] = useState("en");

  const success = (posData) => {
    const lat = posData.coords.latitude;
    const lon = posData.coords.longitude;
    const API = "b6abcffcd1a09be87886bd70d120537a";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&lang=${language}`
      )
      .then(({ data }) => setWeather(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [language]);

  return (
    <main className="  dark:brightness-50 duration-500 transition-colors font-[´lato´] flex justify-center items-center min-h-screen bg-[url(/fondopaisaje.jpg)] text-white px-2 bg-no-repeat bg-cover bg-center ">
      {weather === null ? (
        <div className="bg-no-repeat bg-cover bg-center w-[100vw]">
          <img src="/fondo.png" alt="" />
        </div>
      ) : (
        <WeatherContainer
          weather={weather}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </main>
  );
}

export default App;
