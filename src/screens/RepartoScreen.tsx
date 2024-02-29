import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import apiAxios from "../api/axios";
import { THEME_COLOR, appStyles } from "../theme/theme";
import { Reparto, RepartoPendiente } from "../interfaces/Reparto.interfaces";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFile, faInfoCircle, faMap } from "@fortawesome/free-solid-svg-icons";

export type RootStackParamList = {
  RepartoScreen: undefined;
  PDFViewer: { pdf: any };
  DetalleRepartoScreen: { codReparto: number };
};

export type RepartoScreensNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RepartoScreen"
>;
type Item = {
  item: RepartoPendiente;
  codEmpresa: number;
  onItemPress: (item: RepartoPendiente) => void;
  onDetailSelect: (item: RepartoPendiente) => void;
  onDocSelect: (item: RepartoPendiente) => void;
};

const Item = ({ item, onItemPress, onDetailSelect, onDocSelect }: Item) => {
  return (
    <TouchableOpacity onPress={() => onItemPress(item)}>
    <View style={appStyles.card}>
      <View style={appStyles.list}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={appStyles.buttonText}>Reparto:</Text>
          <Text style={appStyles.name}>{item.codReparto}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={appStyles.buttonText}>Documentos:</Text>
          <Text style={appStyles.description}>{item.documentos}</Text>
        </View>
        {/* Botones con iconos */}
 {/*        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
        
          <TouchableOpacity onPress={() => onItemPress(item)}>
            <View style={appStyles.iconButton}>
              <FontAwesomeIcon icon={faMap} size={32} color={THEME_COLOR} />
            </View>
          </TouchableOpacity>

        
          <TouchableOpacity onPress={() => onDetailSelect(item)}>
            <View style={appStyles.iconButton}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={32}
                color={THEME_COLOR}
              />
            </View>
          </TouchableOpacity>

        
          <TouchableOpacity onPress={() => onDocSelect(item)}>
            <View style={appStyles.iconButton}>
              <FontAwesomeIcon icon={faFile} size={32} color={THEME_COLOR} />
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
    </TouchableOpacity>
  );
};
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
      {repartoModel && (
        <FlatList
          data={repartoModel}
          renderItem={({ item }) => (
            <Item
              item={item}
              codEmpresa={user?.codEmpresa!}
              onItemPress={(selectedItem: RepartoPendiente) =>
                handleItemPress(selectedItem)
              }
              onDetailSelect={(selectedItem: RepartoPendiente) =>
                getDetail(selectedItem)
              }
              onDocSelect={(selectedItem: RepartoPendiente) =>
                getDoc(selectedItem)
              }
            />
          )}
          keyExtractor={(item) => item.codReparto.toString()}
        />
      )}
    </View>
  );
};
