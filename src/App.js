import { useState } from "react";

import "./App.css";
import Mapa from "./components/Mapa";
import Sismos from "./components/Sismos";

function App() {
  const style = {
    color: "#3083DC",
  };
  const [sismos, setSismos] = useState([]);
  const [actual, setActual] = useState({
    // La moneda
    // latitude: -33.4429,
    // longitude: -70.6539,
    latitude: 0,
    longitude: 0,
    geo_reference: "",
  });

  return (
    <div className="App">
      <div className="bg__img"></div>
      <div className="title">
        <h1>
          <span style={style}>T</span>embló?
        </h1>
        <p>
          Una pequeño sitio web que muestra los últimos sismos ocurridos en
          Chile. Se nutre de la API{" "}
          <a href="https://xor.cl/api/sismo/">https://xor.cl/api/sismo/</a>
        </p>
      </div>
      <div className="contenido">
        <div className="tabla">
          <Sismos
            sismos={sismos}
            setSismos={setSismos}
            actual={actual}
            setActual={setActual}
          />
        </div>
        <div className="mapa-content">
          <div className="mapa-location">
            <h1>
              <span style={style}>E</span>n el mapa:{" "}
            </h1>
            <h2>Sismo a {actual.geo_reference}</h2>
            <div className="mapa-container">
              <Mapa actual={actual} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">@PelelaProgramador</div>
    </div>
  );
}

export default App;
