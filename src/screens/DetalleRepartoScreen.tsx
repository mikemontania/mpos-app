import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import apiAxios from "../api/axios";
import { MapWithMarkers } from "../componentes/MapWithMarkers";
import Geolocation from "@react-native-community/geolocation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { THEME_COLOR } from "../theme/theme";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RepartoScreen";

interface RouteParams {
  codReparto: number;
}

export type DetalleRepartoScreenNavigationProp = StackNavigationProp<  RootStackParamList,  "DetalleRepartoScreen">;
export interface Marcador {
  latitud: number;
  longitud: number;
  razonSocial: string;
  docNro: string;
  direccion: string;
  telefono: string;
  entregado: boolean;
  ubicacionActual: boolean;
  comprobante: string;
  importe: number;
  codVenta: number;
  codCliente: number;
  codRepartoDocs: number;
}

export const DetalleRepartoScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<DetalleRepartoScreenNavigationProp>();
  const { codReparto } = route.params as RouteParams;
  const isFocused = useIsFocused();
  const [markers, setMarkers] = useState<Marcador[]>([]);
  const [showButton, setShowButton] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const finalizar = async () => {
    console.log("repartos"); 
    try {
      const { data } = await apiAxios.put(`/repartos/finalizar?id=${codReparto}` );
      navigation.navigate("RepartoScreen")
    } catch (error: any) {
      console.error("Error al finalizar", error.message); 
    }
  };

  const getData = async () => {
    console.log("repartos");
    setIsLoading(true);

    try {
      const { data } = await apiAxios.get(
        `/repartos/marcadores?codreparto=${codReparto}`
      );
      console.log(data);
      if (data) {
        // Verificar si todos los marcadores tienen entregado en true
        const allDelivered = data.every((marker: Marcador) => marker.entregado);
        // Agregar tu ubicación actual como marcador adicional
        Geolocation.getCurrentPosition((info) => {
          const ubicacionActual = {
            latitud: info.coords.latitude,
            longitud: info.coords.longitude,
            razonSocial: "Yo",
            docNro: "",
            direccion: "Tu ubicación actual",
            entregado: true, // Puedes ajustar esto según tus necesidades
            ubicacionActual: true
          };

          // Agregar la ubicación actual a la lista de marcadores
          setMarkers([...data, ubicacionActual]);
        });
        // Actualizar el estado del botón flotante
        setShowButton(allDelivered);
        // Detener la carga después de actualizar los marcadores
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error al realizar la consulta:", error.message);
      setIsLoading(false);
      // Puedes agregar una lógica para mostrar un mensaje de error al usuario
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Otras partes de tu componente */}
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <MapWithMarkers getData={getData} markers={markers} />
          {showButton && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                backgroundColor: "green",
                borderRadius: 30,
                padding: 10
              }}
              onPress={finalizar}
            >
              <FontAwesomeIcon icon={faCheck} size={20} color={"white"} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
