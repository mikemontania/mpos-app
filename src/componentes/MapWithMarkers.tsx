import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Callout as BaseCallout } from "react-native-maps";
import { Marcador } from "../screens/DetalleRepartoScreen";
import { Reparto } from "../interfaces/Reparto.interfaces";
import { CustomCallout } from "./CustomCallout";
import { FloatingDetailsButton } from "./FloatingDetailsButton";
import { MarkerModalDetails } from "./MarkerModalDetalis";
import { faSearchPlus, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native";
import { THEME_COLOR } from "../theme/theme";
import { MarkerModalEdit } from "./MarkerModalEdit";

interface MapWithMarkersProps {
  markers: Marcador[];
  getData: () => void; // Agrega el prop para el método getData
}

export const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
  getData,
  markers
}) => {
  const [markerColors, setMarkerColors] = useState<string[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState<Marcador | null>(
    null
  );
  const mapViewRef = useRef<MapView>(null);

  useEffect(() => {
    // Inicializa el estado de colores de marcadores al renderizar
    setMarkerColors(markers.map(() => "red"));
  }, [markers]);

  useEffect(() => {
    // Actualiza los colores de los marcadores cuando cambia la propiedad entregado en los markers
    setMarkerColors(
      markers.map((marker) =>
        marker.entregado ? (marker.ubicacionActual ? "blue" : "green") : "red"
      )
    );
  }, [markers]);

  useEffect(() => {
    let maxLat = -90;
    let minLat = 90;
    let maxLon = -180;
    let minLon = 180;

    markers.forEach((marker) => {
      maxLat = Math.max(maxLat, marker.latitud);
      minLat = Math.min(minLat, marker.latitud);
      maxLon = Math.max(maxLon, marker.longitud);
      minLon = Math.min(minLon, marker.longitud);
    });

    const midLat = (maxLat + minLat) / 2;
    const midLon = (maxLon + minLon) / 2;
    const latDelta = maxLat - minLat + 0.02;
    const lonDelta = maxLon - minLon + 0.02;

    const initialRegion = {
      latitude: midLat,
      longitude: midLon,
      latitudeDelta: latDelta,
      longitudeDelta: lonDelta
    };

    if (markers.length > 0 && mapViewRef.current) {
      const coordinates = markers.map((marker) => ({
        latitude: marker.latitud,
        longitude: marker.longitud
      }));
      const edgePadding = { top: 70, right: 70, bottom: 70, left: 70 };
      mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding,
        animated: true
      });
      mapViewRef.current.animateToRegion(initialRegion, 0); // Ajusta la región inicial
    }
  }, [markers]);
  const handleZoomToFitMarkers = () => {
    if (markers.length > 0 && mapViewRef.current) {
      const coordinates = markers.map((marker) => ({
        latitude: marker.latitud,
        longitude: marker.longitud
      }));
      const edgePadding = { top: 70, right: 70, bottom: 70, left: 70 };
      mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding,
        animated: true
      });
    }
  };
  const handleCalloutClose = () => {
    setSelectedMarker(null);
    setIsModalVisible(false);
  };
  const handleEditClose = () => {
    setSelectedMarker(null);
    setIsModalVisibleEdit(false);
  };

  const handleMarkerPress = (index: number) => {
    setSelectedMarker(index);
  };

  const handleDetailsPress = (index: number) => {
    setSelectedMarker(index);
    setSelectedMarkerData(markers[index]);
    setIsModalVisible(true);
  };

  const handleEditPress = (index: number) => {
    setSelectedMarker(index);
    setSelectedMarkerData(markers[index]);
    setIsModalVisibleEdit(true);
  };
  return (
    <>
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        onMapReady={() => console.log("Mapa listo")}
        onPress={() => {
          if (selectedMarker !== null) {
            handleCalloutClose();
          }
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitud,
              longitude: marker.longitud
            }}
            title={marker.razonSocial + " - " + marker.docNro}
            description={ marker.direccion}
          
            pinColor={markerColors[index]}
            onPress={() => handleMarkerPress(index)}
          />
        ))}
      </MapView>

      {selectedMarker !== null &&
        markers[selectedMarker].ubicacionActual !== true && (
          // Utiliza el nuevo componente para manejar los detalles del marcador
          <FloatingDetailsButton
            title={markers[selectedMarker].razonSocial}
            onPressDetails={() => handleDetailsPress(selectedMarker)}
            onPressEdit={() => handleEditPress(selectedMarker)}
          />
        )}

      {/*Modal Detalles */}
      <MarkerModalDetails
        isVisible={isModalVisible}
        onClose={handleCalloutClose}
        update={getData}
        markerData={selectedMarkerData}
      />
      {/*Modal Edit */}
      {selectedMarkerData && <MarkerModalEdit
        isVisible={isModalVisibleEdit}
        onClose={handleEditClose}
        update={getData}
        markerData={selectedMarkerData}
      /> }
         {/* Botón para hacer zoom a los marcadores */}
         <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 70,
          left: 20,
          backgroundColor: "white",
          borderRadius: 30,
          padding: 10
        }}
        onPress={handleZoomToFitMarkers}
      >
        <FontAwesomeIcon icon={faSearchPlus} size={20} color={THEME_COLOR} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          backgroundColor: "white",
          borderRadius: 30,
          padding: 10
        }}
        onPress={getData}
      >
        <FontAwesomeIcon icon={faSync} size={20} color={THEME_COLOR} />
      </TouchableOpacity>

      <CustomCallout onClose={handleCalloutClose} />
    </>
  );
};
