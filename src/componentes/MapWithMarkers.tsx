import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Callout as BaseCallout } from "react-native-maps";
import { Marcador } from "../screens/DetalleRepartoScreen"; 
import { CustomCallout } from "./CustomCallout";
import { FloatingDetailsButton } from "./FloatingDetailsButton";
import { MarkerModalDetails } from "./MarkerModalDetalis";
import { 
  faCrosshairs,
  faSearchPlus,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native";
import { THEME_COLOR } from "../theme/theme";
import { MarkerModalEdit } from "./MarkerModalEdit";
import Geolocation from "@react-native-community/geolocation";

interface MapWithMarkersProps {
  markers: Marcador[];
  getData: () => void; // Agrega el prop para el método getData
}

export const MapWithMarkers: React.FC<MapWithMarkersProps> = ({
  getData,
  markers
}) => {
  const lat = -25.29688941637652;
  const lng = -57.59492960130746;
  const [markerColors, setMarkerColors] = useState<string[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState<Marcador | null>(
    null
  ); 
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const mapViewRef = useRef<MapView>(null);

  useEffect(() => {
    // Inicializa el estado de colores de marcadores al renderizar
    setMarkerColors(markers.map(() => "red"));
  }, [markers]);

  useEffect(() => {
    // Actualiza los colores de los marcadores cuando cambia la propiedad entregado en los markers
    setMarkerColors(
      markers.map((marker) => {
        if (marker.latitud === 0 && marker.longitud === 0) {
          return "orange";
        } else if ( marker.latitud === -25.29688941637652 &&  marker.longitud === -57.59492960130746 ) {
          return "orange";
        } else {
          return marker.entregado ? "green" : "red";
        }
      })
    );
  }, [markers]);

  useEffect(() => {
    handleZoomToFitMarkers()
  }, [markers]);
 
  const getCurrentPositionPromise = () => {
    return new Promise<{ coords: { latitude: number; longitude: number } }>(
      (resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject);
      }
    );
  };
  
  const handleZoomToFitMarkers = async () => {
    try {
      const info = await getCurrentPositionPromise();
      const ubicacionActual = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      };
  
      setUserLocation(ubicacionActual);
  
      if (markers.length > 0 && mapViewRef.current) {
        let coordinates = markers.map((marker) => ({
          latitude: marker.latitud,
          longitude: marker.longitud
        }));
  
        if (ubicacionActual) {
          coordinates = [...coordinates, ubicacionActual];
        }
  
        const edgePadding = { top: 70, right: 70, bottom: 70, left: 70 };
        mapViewRef.current.fitToCoordinates(coordinates, {
          edgePadding,
          animated: true
        });
      }
    } catch (error) {
      console.error("Error al obtener la ubicación actual:", error);
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
        showsUserLocation={true} 
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitud,
              longitude: marker.longitud
            }}
            title={marker.razonSocial + " - " + marker.docNro}
            description={marker.direccion}
            pinColor={markerColors[index]}
            onPress={() => handleMarkerPress(index)}
          ></Marker>
        ))}
      </MapView>

      {selectedMarker !== null  && (
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
      {selectedMarkerData && (
        <MarkerModalEdit
          isVisible={isModalVisibleEdit}
          onClose={handleEditClose}
          update={getData}
          markerData={selectedMarkerData}
        />
      )}
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
        <FontAwesomeIcon icon={faCrosshairs} size={20} color={THEME_COLOR} />
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
