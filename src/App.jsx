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

  const bgImagenes = {
    "04d":
      "bg-[url(https://services.meteored.com/img/article/fuertes-tormentas-en-avance-por-argentina-en-las-proximas-horas-7201-1_768.jpg)]",
    "10n":
      "bg-[url(https://png.pngtree.com/background/20231018/original/pngtree-downpour-on-brooding-clouds-a-rainy-season-s-fury-captured-in-picture-image_5598344.jpg)]",
    "01d":
      "bg-[url(https://i.pinimg.com/originals/d2/67/b7/d267b78dbb93198875530e90050166a4.jpg)]",
    "01n":
      "bg-[url(https://i.pinimg.com/550x/bf/55/89/bf5589383eefd146dc498ae9038f533d.jpg)]",
    "02d":
      "bg-[url(https://img.freepik.com/fotos-premium/cielo-nubes-dia-soleado_806675-324.jpg)]",
    "02n":
      "bg-[url(https://media.istockphoto.com/id/1214299348/es/foto/luna-brillante-nubes-oscuras.jpg?s=612x612&w=0&k=20&c=FguhwX5NC2CUDro6Tt_IG0YXZrmslhiQx36aNeFCB1w=)]",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [language]);

  return (
    <main
      className={`dark:brightness-50 duration-500 transition-colors font-[´lato´] flex justify-center items-center min-h-screen  text-white px-2 bg-no-repeat bg-cover bg-center ${
        bgImagenes[weather?.weather[0].icon]
      } `}
    >
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

// bg-[url(/fondopaisaje.jpg)]
