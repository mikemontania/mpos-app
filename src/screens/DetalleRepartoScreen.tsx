import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import apiAxios from "../api/axios";
import { Reparto } from "../interfaces/Reparto.interfaces"; 
import { MapWithMarkers } from "../componentes/MapWithMarkers";
import Geolocation from '@react-native-community/geolocation';

interface RouteParams {
  codReparto: number;
}

export const DetalleRepartoScreen: React.FC = () => {
  const route = useRoute();
  const { codReparto } = route.params as RouteParams;
  const isFocused = useIsFocused();
  const [repartoModel, setRepartoModel] = useState<Reparto | undefined>();
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>();

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      const { data } = await apiAxios.get(`/repartos/${codReparto}`);
      if (data) {
        setRepartoModel(data);
        Geolocation.getCurrentPosition(info => {

          setCurrentLocation({ latitude: info.coords.latitude, longitude: info.coords.longitude })

        } );

        
      }
    } catch (error: any) {
      if (error.response) console.log("Error al realizar la consulta:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Otras partes de tu componente */}
      <MapWithMarkers repartoModel={repartoModel} currentLocation={currentLocation} />
    </View>
  );
};
 