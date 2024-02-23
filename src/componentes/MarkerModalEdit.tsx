import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { THEME_COLOR, appStyles } from "../theme/theme";
import apiAxios from "../api/axios";
import { Marcador } from "../screens/DetalleRepartoScreen";
import { faTimes, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MapView, { Marker } from "react-native-maps"; 

interface MarkerModalEditProps {
  isVisible: boolean;
  onClose: () => void;
  update: () => void;
  markerData: Marcador | null;
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
  const [markerLocation, setMarkerLocation] = useState(markerData?.coordinate || { latitude: 0, longitude: 0 });

  useEffect(() => {
    setLoading(markerData ? false : true);
    setDireccion(markerData?.direccion || "");
    setTelefono(markerData?.telefono || "");
    setMarkerLocation(markerData?.coordinate || { latitude: 0, longitude: 0 });
  }, [markerData]);

  const guardar = async () => {
    if (markerData) {
      try {
        const updatedMarkerData = {
          ...markerData,
          direccion: direccion,
          telefono: telefono,
          coordinate: markerLocation
        };

        // Enviar updatedMarkerData al servidor para actualizar la información

        update();
        onClose();
      } catch (error: any) {
        console.error("Error al realizar la consulta:", error.message);
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={modalStyles.container}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <>
                {markerData !== null && (
                  <View style={{ flex:1, padding: 10 }}>
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
                        Cliente: {markerData?.title}
                      </Text>

                      {/* Inputs para dirección y teléfono */}
                      <TextInput
                        style={modalStyles.input}
                        placeholder="Dirección"
                        value={direccion}
                        onChangeText={(text) => setDireccion(text)}
                      />
                      <TextInput
                        style={modalStyles.input}
                        placeholder="Teléfono"
                        value={telefono}
                        onChangeText={(text) => setTelefono(text)}
                      />
                    </View>
                    {/* Mapa para modificar cliente */}
               <View style={{flex:1}}>

                    <MapView
                      style={modalStyles.map}
                      initialRegion={{
                        latitude: markerLocation.latitude,
                        longitude: markerLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                      }}
                      onPress={(event) => setMarkerLocation(event.nativeEvent.coordinate)}
                    >
                      <Marker
                        coordinate={markerLocation}
                        draggable
                        onDragEnd={(event) => setMarkerLocation(event.nativeEvent.coordinate)}
                      />
                    </MapView>

                    {/* Botón flotante para cerrar el teclado */}
                  
               </View>

                    {/* Botón de guardar */}
                    <TouchableOpacity
                      style={{
                        ...modalStyles.buttonStyle, 
                      }}
                      onPress={guardar}
                    >
                      <Text style={modalStyles.buttonText}>Guardar</Text>
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
    color:THEME_COLOR,
    borderWidth: 1,
    fontSize:9,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8
  },
  map: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 8
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
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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