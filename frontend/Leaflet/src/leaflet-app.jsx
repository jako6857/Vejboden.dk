import "./leaflet.css";
import "leaflet/dist/leaflet.css";

import { supabase } from "./supabaseClient";

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



import fruitImg from "./images/fruit.png";
import vegetablesImg from "./images/vegetable.png";
import produceImg from "./images/produce.png";

import organicImg from "./images/organic.png";
import localImg from "./images/local.png";

import farmImg from "./images/farm.png";
import geolocationImg from "./images/geolocation.png";




const defaultMarkers = [
  {
    geocode: [57.042928, 9.918538],
    popUp: "AALBORG KENNEDY",
  },
  {
    geocode: [57.051588, 9.916695],
    popUp: "AALBORG VESTERBRO",
  },
];

const getMarkerImage = (groupType) => {
  const typeMap = {
    fruit: fruitImg,
    vegetables: vegetablesImg,
    produce: produceImg,

    organic: organicImg,
    local: localImg,
    farm: farmImg,
  };

  const imagePath = typeMap[groupType?.toLowerCase()];
  return imagePath || null;

};




const createIconWithURL = (url, size = [40, 40]) => {
  return new Icon({
    iconUrl: url,
    iconSize: size,
    shadowUrl: null,

  });

};

const getMarkerIcon = (groupType) => {
  const markerImage = getMarkerImage(groupType);
  if (markerImage) {
    return createIconWithURL(markerImage, [40, 40]);
  }


  return new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-blue.png",
    iconSize: [25, 41],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
};




const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,

    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const locationIcon = new Icon({
  iconUrl: geolocationImg,
  iconSize: [40, 40],
});


function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [hasLocated, setHasLocated] = useState(false);

  
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);

      if (!hasLocated) {
        try {
          map.setView(e.latlng, 13.4);
          setHasLocated(true);

        } catch (err) {
          console.error("Error setting map:", err);
        }
      }
    },
    locationerror(e) {
    console.error("Geolocation error:", e);
    },

  });




  useEffect(() => {
    try {
      map.locate({
        setView: false,
      });

    } catch (err) {
      console.error("Error map.locate:", err);
    }

  }, [map]);

  if (!position) {
    return null; }


  return (
    <Marker position={position} icon={locationIcon}>
      <Popup>Du står lige her!</Popup>
    </Marker>
  );
}




export default function App() {
  const [markers, setMarkers] = useState(defaultMarkers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setLoading(true);
        console.log("Fetching markers from Supabase");
        
        const { data, error } = await supabase
        .from("Vejbod")
          .select("*");

        if (error) {
          console.error("Supabase API Error:", error);
          setError(error.message);
          setMarkers(defaultMarkers);

        } else if (data && data.length > 0) {
          console.log("API Success!", data.length, "markers");
          console.log("First marker data:", data[0]);

          


          const transformedMarkers = data.map((item) => {
            const lat = item.latitude || item.lat || item.Latitude;
            const lng = item.longitude || item.lng || item.lon || item.Longitude;
            const name = item.name || item.Name || item.vejbod_name || "Vejbod";
            const groupType = item.group_type || item.groupType || item.type || "produce";
            const description = item.description || item.notes || "";
            const altitude = item.altitude || item.elevation || null;
            // help from copilot
            

            if (lat !== undefined && lng !== undefined) {
              return {
                geocode: [parseFloat(lat), parseFloat(lng)],
                popUp: name,
                groupType: groupType,
                description: description,
                altitude: altitude,
              };
            }

            return null;
          }).filter(m => m !== null);
          

          if (transformedMarkers.length > 0) {
            setMarkers(transformedMarkers);
            console.log("Successfully transformed", transformedMarkers.length, "markers for display");
            console.table(transformedMarkers);
          } else
             {
            console.warn("No coordinates found in data");
            setMarkers(defaultMarkers);

          }



        } else {
          console.log("No data returned");
          setMarkers(defaultMarkers);
        }
      } catch (err) {
        console.error("Error fetching markers:", err);

        setError(err.message);
        setMarkers(defaultMarkers);
      } finally {
        setLoading(false);
      }
    };




    fetchMarkers();
  }, []);

  return (
    <>
      {loading && (
        <div style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,

          backgroundColor:"white",
          padding: "10px",
          borderRadius: "5px"
          
          }}>
          <p>Loading markers...</p>
        </div>

      )}


      {error && (
        <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 1000, backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
          <p style={{ color: "red" }}>Error: {error}</p>
        </div> )}


      <MapContainer 
        center={[57.050028, 9.965567]} 
        zoom={7}
        style={{ width: "100%", height: "100vh" }} >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />



        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers && markers.length > 0 && markers.map((marker, index) => {
            if (!marker || !marker.geocode || marker.geocode.length !== 2) {
            return null; }
            
            

            const markerIcon = getMarkerIcon(marker.groupType);
            const markerImage = getMarkerImage(marker.groupType);
            
            return (
              <Marker key={index} position={marker.geocode} icon={markerIcon}>
                <Popup>
                  <div style={{ minWidth: "250px" }}>


                    <h3 style={{ margin: "0 0 10px 0" }}>{marker.popUp}</h3>

                    {markerImage && (
                      <img 
                        src={markerImage} 
                        alt={marker.popUp}
                        style={{ width: "100%", height: "auto", borderRadius: "5px", marginBottom: "10px" }}
                      />

                    )}


                    {marker.description && <p style={{ margin: "10px 0" }}>{marker.description}</p>}
                    {marker.groupType && <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>Type: {marker.groupType}</p>}
                    {marker.altitude && <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>Altitude: {marker.altitude}m</p>}
                  </div>
                </Popup>
              </Marker>
            );
          
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </>


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

