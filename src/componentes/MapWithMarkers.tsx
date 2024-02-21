import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Reparto } from "../interfaces/Reparto.interfaces";
import { Text, View } from "react-native";  

interface MapWithMarkersProps {
  repartoModel?: Reparto;
  currentLocation?: { latitude: number; longitude: number };
}

export const MapWithMarkers: React.FC<MapWithMarkersProps> = ({ repartoModel, currentLocation }) => {
    const [polylines, setPolylines] = useState<any[]>([]);
    const mapViewRef = useRef<MapView>(null);
  const docs = repartoModel?.documento || [];
  const markers = docs.map((documento) => ({
    coordinate: {
        latitude: documento.cliente.latitud || 0,
        longitude: documento.cliente.longitud || 0,
      },
      title: documento.cliente.razonSocial || "",
      description: documento.cliente.direccion || "",
      entregado:documento.entregado
    }));

 
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
          const edgePadding = { top: 70, right: 70, bottom: 70, left: 70 }; // zoom
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
          pinColor={marker.entregado ? "green" : "red"}
        />
      ))}
      {currentLocation && (
        <Marker
          coordinate={currentLocation}
          title="Ubicación Actual"
          pinColor="blue" // Puedes cambiar el color del marcador según tus preferencias
        />
      )}
    </MapView>
        <View style={{ position: 'absolute', top: 100, left: 50 }} /> 
      </>
    );
  
};
 