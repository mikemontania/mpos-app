import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import apiAxios from "../api/axios";
import { MapWithMarkers } from "../componentes/MapWithMarkers"; 
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; 
import { faArrowAltCircleLeft, faCheck } from "@fortawesome/free-solid-svg-icons"; 
import { DetalleRepartoScreenNavigationProp, RootStackParamList } from "../types/types";
import { THEME_COLOR } from "../theme/theme";
import { LoadingScreen } from "./LoadingScreen";
interface DetalleRouteParams {
  codReparto: number;
}

export interface Marcador {
  latitud: number;
  longitud: number;
  razonSocial: string;
  docNro: string;
  direccion: string;
  telefono: string;
  entregado: boolean; 
  comprobante: string;
  importe: number;
  codVenta: number;
  codCliente: number;
  codRepartoDocs: number;
}

export const DetalleRepartoScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<DetalleRepartoScreenNavigationProp>();
  const { codReparto } = route.params as DetalleRouteParams;
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
      navigation.navigate("Reparto",undefined)
    } catch (error: any) {
      console.error("Error al finalizar", error.message); 
    }
  };
  const atras = async () => {
    console.log("repartos"); 
    try {
       navigation.navigate("Reparto",undefined)
    } catch (error: any) {
      console.error("Error  atras", error.message); 
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
        
        setMarkers([...data ]);
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
       <LoadingScreen />
      ) : (
        <>
          <MapWithMarkers getData={getData} markers={markers} />
          <TouchableOpacity
              style={{
                position: "absolute",
                top: 60,
                right: 12,
                backgroundColor: 'white', 
                padding: 10
              }}
              onPress={atras}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} size={20} color={THEME_COLOR} />
            </TouchableOpacity>
          {showButton && (
            <TouchableOpacity
            style={{
              position: "absolute",
              top: 110,
              right: 12,
              backgroundColor: 'white', 
              padding: 10
            }}
            onPress={finalizar}
          >
              <FontAwesomeIcon icon={faCheck} size={20} color={THEME_COLOR} />
          </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
