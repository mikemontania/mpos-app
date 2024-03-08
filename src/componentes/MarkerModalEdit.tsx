import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator, 
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { THEME_COLOR  } from "../theme/theme";
import apiAxios from "../api/axios";
import { Marcador } from "../screens/DetalleRepartoScreen";
import {
  faTimes, 
  faMapMarkerAlt,
  faPhone,
  faSearchMinus,
  faSearchPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MapView, { Marker, Region } from "react-native-maps";

interface MarkerModalEditProps {
  isVisible: boolean;
  onClose: () => void;
  update: () => void;
  markerData: Marcador;
}

export const MarkerModalEdit: React.FC<MarkerModalEditProps> = ({
  isVisible,
  onClose,
  update,
  markerData
}) => {
  const [loading, setLoading] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [markerLocation, setMarkerLocation] = useState({
    latitude: markerData.latitud,
    longitude: markerData.longitud
  });
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    setLoading(markerData ? false : true);
    setDireccion(markerData?.direccion || "");
    setTelefono(markerData?.telefono || "");
    setMarkerLocation({
      latitude: markerData.latitud,
      longitude: markerData.longitud
    });
    setMapRegion({
      latitude: markerData.latitud,
      longitude: markerData.longitud,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, [markerData]);

  const handleUbication  = () => {
    if (mapRegion) {
      const newRegion = {
        ...mapRegion,
        latitudeDelta: mapRegion.latitudeDelta  *2,
        longitudeDelta: mapRegion.longitudeDelta*2 ,
      };
      setMapRegion(newRegion);
    }
  };

  const handleZoomIn = async () => {
    if (mapRef.current) {
      try {
        const camera = await mapRef.current.getCamera();
        if (camera) {
          const newZoom = camera.zoom! + 1;
          mapRef.current.animateCamera({ zoom: newZoom });
        }
      } catch (error) {
        console.error("Error al obtener la cámara:", error );
      }
    }
  };
  
  const handleZoomOut = async () => {
    if (mapRef.current) {
      try {
        const camera = await mapRef.current.getCamera();
        if (camera) {
          const newZoom = camera.zoom! - 1;
          mapRef.current.animateCamera({ zoom: newZoom });
        }
      } catch (error) {
        console.error("Error al obtener la cámara:", error );
      }
    }
  };
  
   
  const guardar = async () => {
    if (markerData) {
      try {
        setLoading(true); 
        console.log(markerData);
        const { data } = await apiAxios.put(`/repartos/cliente`, {
          codCliente: +markerData.codCliente,
          direccion: direccion,
          telefono: telefono,
          latitud: markerLocation.latitude,
          longitud: markerLocation.longitude
        });
        update();
        onClose();
      } catch (error: any) {
        console.error("Error al realizar la consulta:", error.message);
      }finally {
        setLoading(false);  
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={modalStyles.container}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <>
                {markerData !== null && (
                  <View style={{ flex: 1, padding: 10 }}>
                    {/* Header Section */}
                    <View style={modalStyles.headerContainer}>
                      <TouchableOpacity
                        style={modalStyles.closeButtonHeader}
                        onPress={onClose}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          size={30}
                          color={THEME_COLOR}
                        />
                      </TouchableOpacity>
                      <Text style={modalStyles.headerText}>
                        Cliente: {markerData?.razonSocial} -{" "}
                        {markerData?.docNro}
                      </Text>

                      {/* Inputs para dirección y teléfono */}
                      <View style={modalStyles.inputContainer}>
                      <FontAwesomeIcon style={{margin:5}}
                          icon={faMapMarkerAlt}
                          size={20}
                          color={THEME_COLOR}
                        />
                        <TextInput
                          style={modalStyles.inputEd}
                          placeholder="Dirección"
                          value={direccion}
                          onChangeText={(text) => setDireccion(text)}
                        />
                      
                      </View>

                      <View style={modalStyles.inputContainer}>
                      
                        <FontAwesomeIcon style={{margin:5}}
                          icon={faPhone}
                          size={20}
                          color={THEME_COLOR}
                        />
                          <TextInput
                          style={modalStyles.inputEd}
                          placeholder="Teléfono"
                          value={telefono}
                          onChangeText={(text) => setTelefono(text)}
                        />
                      </View>
                    </View>
                    {/* Mapa para modificar cliente */}
                    <View style={{ flex: 1 }}>
                    <MapView
                        ref={mapRef}
                        style={modalStyles.map}
                        region={mapRegion}
                        onPress={(event) =>
                          setMarkerLocation(event.nativeEvent.coordinate)
                        }
                        showsUserLocation={true}
                      >
                         <Marker
                          coordinate={markerLocation}
                          draggable
                          onDragEnd={(event) =>
                            setMarkerLocation(event.nativeEvent.coordinate)
                          }
                        />
                      </MapView>

                      {/* Botón flotante   */}
                      <View style={modalStyles.zoomButtonsContainer}>
                        <TouchableOpacity
                          style={modalStyles.zoomButton}
                          onPress={handleZoomIn}
                        >
                          <FontAwesomeIcon
                            icon={faSearchPlus}
                            size={20}
                            color={THEME_COLOR}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={modalStyles.zoomButton}
                          onPress={handleZoomOut}
                        >
                          <FontAwesomeIcon
                            icon={faSearchMinus}
                            size={20}
                            color={THEME_COLOR}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={modalStyles.zoomButton}
                          onPress={handleUbication}
                        >
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            size={20}
                            color={THEME_COLOR}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Botón de guardar */}
                    <TouchableOpacity
                      style={{
                        ...modalStyles.buttonStyle
                      }}
                      onPress={guardar}
                    >
                      <Text style={modalStyles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
  headerContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: THEME_COLOR
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: THEME_COLOR
  },
  input: {
    height: 40,
    borderColor: THEME_COLOR,
    color: THEME_COLOR,
    borderWidth: 1,
    fontSize: 9,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  inputEd: {
    flex: 1, // Para que ocupe todo el espacio disponible
    height: 40, // O ajusta la altura según sea necesario
    borderColor: THEME_COLOR,
    color: THEME_COLOR,
    borderWidth: 1,
    fontSize: 9,
    paddingLeft: 10,
    borderRadius: 8
  },
  map: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 8
  },
  zoomButtonsContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "column",
  },
  zoomButton: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    marginBottom: 5,
  },
  keyboardButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: THEME_COLOR
  },
  closeButtonHeader: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1
  },
  buttonStyle: {
    height: 45,
    backgroundColor: THEME_COLOR,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
