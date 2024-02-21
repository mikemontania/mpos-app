import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import apiAxios from "../api/axios";
import { Documento, Reparto } from "../interfaces/Reparto.interfaces";
import { MapWithMarkers } from "../componentes/MapWithMarkers";
import Geolocation from "@react-native-community/geolocation";

interface RouteParams {
  codReparto: number;
}

export interface Marcador {
  coordinate: { latitude: number; longitude: number };
  title: string;
  description: string;
  entregado: boolean;
  nroComprobante:string;
  importe: number;
}


export const DetalleRepartoScreen: React.FC = () => {
  const route = useRoute();
  const { codReparto } = route.params as RouteParams;
  const isFocused = useIsFocused();
  const [markers, setMarkers] = useState<Marcador[]>([]);
  const [repartoModel, setRepartoModel] = useState<Reparto | undefined>();
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
      const { data } = await apiAxios.get(`/repartos/${codReparto}`);
      if (data) {
        setRepartoModel(data);

        const nuevosMarcadores = data.documento.map((documento: Documento) => ({
          coordinate: {
            latitude: documento.cliente.latitud || 0,
            longitude: documento.cliente.longitud || 0
          },
          nroComprobante: documento.venta.nroComprobante,
          importe: documento.venta.importeTotal,
          title: documento.cliente.razonSocial || "",
          description: documento.cliente.direccion || "",
          entregado: documento.entregado
        }));

        // Actualiza los marcadores y detiene la carga
        setMarkers(nuevosMarcadores);
        setIsLoading(false);

        Geolocation.getCurrentPosition((info) => {
          setCurrentLocation({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
          });
        });
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
        <MapWithMarkers repartoModel={repartoModel} currentLocation={currentLocation} getData={getData} markers={markers} />
      )}
    </View>
  );
};