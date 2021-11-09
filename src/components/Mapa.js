import React from "react";
import GoogleMapReact from "google-map-react";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const AnyReactComponent = ({ text }) => (
  <div className="location">
    {text}
    <MyLocationIcon color="error" />
  </div>
);

export default function Mapa({ actual }) {
  const coor = { lat: actual.latitude, lng: actual.longitude };

  const coordinates = { lat: 33.4429, lng: 70.6539 };

  console.log();
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "40vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={coordinates}
        center={coor}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={coor.lat} lng={coor.lng} text="Suceso" />
      </GoogleMapReact>
    </div>
  );
}
