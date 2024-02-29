import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import apiAxios from "../api/axios"; 
import { MapWithMarkers } from "../componentes/MapWithMarkers";
import Geolocation from "@react-native-community/geolocation";

interface RouteParams {
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
  ubicacionActual: boolean;
  comprobante: string;
  importe: number;
  codVenta: number;
  codCliente: number;
  codRepartoDocs: number;
}

export const DetalleRepartoScreen: React.FC = () => {
  const route = useRoute();
  const { codReparto } = route.params as RouteParams;
  const isFocused = useIsFocused();
  const [markers, setMarkers] = useState<Marcador[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    console.log("repartos");
    setIsLoading(true);

    try {
      const { data } = await apiAxios.get(
        `/repartos/marcadores?codreparto=${codReparto}`
      );
      console.log(data);
      if (data) {
        // Agregar tu ubicación actual como marcador adicional
        Geolocation.getCurrentPosition((info) => {
          const ubicacionActual = {
            latitud: info.coords.latitude,
            longitud: info.coords.longitude,
            razonSocial: "Yo",
            docNro:'',
            direccion: "Tu ubicación actual",
            entregado: true, // Puedes ajustar esto según tus necesidades
            ubicacionActual: true
          };

          // Agregar la ubicación actual a la lista de marcadores
          setMarkers([...data, ubicacionActual]);
        });

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
        <MapWithMarkers
          getData={getData}
          markers={markers}
        />
      )}
    </View>
  );
};
