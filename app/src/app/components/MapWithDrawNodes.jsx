import { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

// Configura la ruta base de las imágenes de Leaflet
L.Icon.Default.imagePath = "/images/leaflet/";

// Configura el ícono por defecto para todos los marcadores
L.Marker.prototype.options.icon = L.icon({
  iconUrl: "marker-icon.png",
  iconRetinaUrl: "marker-icon-2x.png",
  shadowUrl: "marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapWithDrawNodes({ onMarkerDrawn, markerRef, latitude, longitude }) {
  const map = useMap();
  const [currentMarker, setCurrentMarker] = useState(null);
  const markersLayerRef = useRef();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    markersLayerRef.current = drawnItems;

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: true,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false,
      },
    });

    map.addControl(drawControl);

    const handleDrawnMarker = (e) => {
      const { layer } = e;

      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      if (currentMarker) {
        map.removeLayer(currentMarker);
      }

      layer.addTo(map);
      setCurrentMarker(layer);
      onMarkerDrawn(layer.toGeoJSON());
    };

    if (latitude !== null && longitude !== null) {
      if (currentMarker) {
        currentMarker.setLatLng([latitude, longitude]);
      } else {
        const marker = L.marker([latitude, longitude]);
        marker.addTo(map);
        setCurrentMarker(marker);
      }
    }

    map.on(L.Draw.Event.CREATED, handleDrawnMarker);

    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED, handleDrawnMarker);
    };
  }, [map, onMarkerDrawn, currentMarker, latitude, longitude]);

  return null;
}

export default MapWithDrawNodes;