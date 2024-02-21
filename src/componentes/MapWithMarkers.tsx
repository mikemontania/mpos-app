import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Reparto } from "../interfaces/Reparto.interfaces";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { Marcador } from "../screens/DetalleRepartoScreen";

interface MapWithMarkersProps {
  repartoModel?: Reparto;
  currentLocation?: { latitude: number; longitude: number };
  markers: Marcador[];
  getData: () => void; // Agrega el prop para el método getData
}

export const MapWithMarkers: React.FC<MapWithMarkersProps> = ({ repartoModel, currentLocation, getData, markers }) => {
  const [polylines, setPolylines] = useState<any[]>([]);
  const mapViewRef = useRef<MapView>(null);
  const [markerColors, setMarkerColors] = useState<string[]>([]);

  useEffect(() => {
    // Inicializa el estado de colores de marcadores al renderizar
    setMarkerColors(markers.map(() => "red"));
  }, [markers]);

  useEffect(() => {
    // Actualiza los colores de los marcadores cuando cambia la propiedad entregado en los markers
    setMarkerColors(markers.map((marker) => (marker.entregado ? "green" : "red")));
  }, [markers]);

  let maxLat = -90;
  let minLat = 90;
  let maxLon = -180;
  let minLon = 180;

  markers.forEach((marker) => {
    maxLat = Math.max(maxLat, marker.coordinate.latitude);
    minLat = Math.min(minLat, marker.coordinate.latitude);
    maxLon = Math.max(maxLon, marker.coordinate.longitude);
    minLon = Math.min(minLon, marker.coordinate.longitude);
  });

  const midLat = (maxLat + minLat) / 2;
  const midLon = (maxLon + minLon) / 2;
  const latDelta = maxLat - minLat + 0.02;
  const lonDelta = maxLon - minLon + 0.02;

  const initialRegion = {
    latitude: midLat,
    longitude: midLon,
    latitudeDelta: latDelta,
    longitudeDelta: lonDelta,
  };

  useEffect(() => {
    if (markers.length > 0 && mapViewRef.current) {
      const coordinates = markers.map((marker) => marker.coordinate);
      const edgePadding = { top: 70, right: 70, bottom: 70, left: 70 };
      mapViewRef.current.fitToCoordinates(coordinates, { edgePadding, animated: true });
    }
  }, [markers]);

  return (
    <>
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        onMapReady={() => console.log("Mapa listo")}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={markerColors[index]} // Usar el color correspondiente
          />
        ))}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Ubicación Actual"
            pinColor="blue"
          />
        )}
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          backgroundColor: 'white',
          borderRadius: 30, // Hace que el botón sea redondeado
          padding: 10, // Ajusta según tu preferencia
        }}
        onPress={getData}
      >
        <FontAwesomeIcon icon={faSync} size={20} color="green" />
      </TouchableOpacity>
    </>
  );
};
