import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import apiAxios from "../api/axios";
import { THEME_COLOR, appStyles } from "../theme/theme";
import {   RepartoPendiente } from "../interfaces/Reparto.interfaces";
 import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; 
import { faCar } from "@fortawesome/free-solid-svg-icons"; 
import { RepartoScreensNavigationProp } from "../types/types";
import { Item } from "../componentes/ItemReparto";
 
export const RepartoScreen = () => {
  const { user } = useContext(AuthContext);
  const [repartoModel, setRepartoModel] = useState<RepartoPendiente[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation<RepartoScreensNavigationProp>();

  const handleItemPress = (item: any) => {
    navigation.navigate("DetalleRepartoScreen", {
      codReparto: item.codReparto
    });
  };

  const finalizarReparto = async (item: any) => {
    try {
      const { data } = await apiAxios.put(
        `/repartos/finalizar?id=${item.codReparto}`
      );

      getData();
    } catch (error: any) {
      console.error("Error al realizar la consulta:", error.message);
    }
  };

  const getDetail = async (item: any) => {
    try {
      const { data } = await apiAxios.get(
        `/repartos/reportedetalle/?fecha=${item.fechaReparto}&codempresa=${user?.codEmpresa}&codreparto=${item.codReparto}`,
        { responseType: "blob" }
      );
      if (data) {
        navigation.navigate("PDFViewer", {
          pdf: { data }
        });
      }
    } catch (error: any) {
      if (error.response) console.log("Error al realizar la consulta:", error);
    }
  };
  const getDoc = async (item: any) => {
    try {
      const { data } = await apiAxios.get(
        `/repartos/reportedocs/?fecha=${item.fechaReparto}&codempresa=${user?.codEmpresa}&codreparto=${item.codReparto}`,
        { responseType: "blob" }
      );
      if (data) {
        navigation.navigate("PDFViewer", {
          pdf: { data }
        });
      }
    } catch (error: any) {
      if (error.response) console.log("Error al realizar la consulta:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  const getData = async () => {
    try {
      const { data } = await apiAxios.get(
        `/repartos/repartochofer/?codempresa=1&chofer=${user?.codPersonaErp}`
      );
      if (data) {
        console.log(data);

        setRepartoModel(data);
      }
    } catch (error: any) {
      if (error.response) console.log("Error al realizar la consulta:", error);
    }
  };
  return (
    <View style={appStyles.container}>
      {repartoModel.length > 0 ? (
        <FlatList
          data={repartoModel}
          renderItem={({ item }) => (
            <Item
              item={item}
              codEmpresa={user?.codEmpresa!}
              onItemPress={(selectedItem: RepartoPendiente) =>
                handleItemPress(selectedItem)
              }
              onFinished={(selectedItem: RepartoPendiente) =>
                finalizarReparto(selectedItem)
              }
            />
          )}
          keyExtractor={(item) => item.codReparto.toString()}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FontAwesomeIcon icon={faCar} size={50} color={THEME_COLOR} />
          <Text style={{ color: THEME_COLOR, textAlign: "center" }}>
            No existen repartos pendientes
          </Text>
        </View>
      )}
    </View>
  );
};
