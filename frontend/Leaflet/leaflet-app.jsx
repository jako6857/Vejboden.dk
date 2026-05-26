import "./leaflet.scss";
import "leaflet/dist/leaflet.css";
import { LayersControl, LayerGroup } from "react-leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";
import { useState, useEffect } from "react";

const customIcon1 = new Icon({
  iconUrl: require("./icons/marker1.png"),
  iconSize: [30, 30], //38, 38
});

const customIcon2 = new Icon({
  iconUrl: require("./icons/marker2.png"),
  iconSize: [30, 30], //38, 38
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,

    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const markers = [
  {
    geocode: [57.042928, 9.918538],
    popUp: "AALBORG KENNEDY",
  },
  {
    geocode: [57.051588, 9.916695],
    popUp: "AALBORG VESTERBRO",
  },
];

const locationIcon = new Icon({
  iconUrl: require("./icons/image-removebg-preview (1).png"),
  iconSize: [28, 28],
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [hasLocated, setHasLocated] = useState(false);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      setAccuracy(e.accuracy);

      if (!hasLocated) {
        map.setView(e.latlng, 13.4);
        setHasLocated(true);
      }
    },
  });

  useEffect(() => {
    map.locate({
      setView: false,
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={locationIcon}>
      <Popup>Du står lige her!</Popup>
    </Marker>
  );
}

export default function App() {
  return (
    <MapContainer center={[0, 0]} zoom={0}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon2}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

//<MapContainer center={[57.050028, 9.965567]} zoom={15}>
//  <MapClickHandler />
//

//  <TileLayer
//    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//  />

//</MapContainer>;
//

// import { useMapEvents } from "react-leaflet";
//

//function MapClickHandler() {
//  useMapEvents({
//    click(e) {
//      alert("You clicked the map at " + e.latlng);
//    },
//  });

//  return null;
//}//
