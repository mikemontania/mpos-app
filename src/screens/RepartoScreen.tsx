import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import { useIsFocused, useNavigation } from "@react-navigation/native"; 
import apiAxios from "../api/axios";
import { appStyles } from "../theme/theme";
import { Reparto } from "../interfaces/Reparto.interfaces";
import { StackNavigationProp } from "@react-navigation/stack";
 
export type RootStackParamList = {
    RepartoScreen: undefined;
    DetalleRepartoScreen: { codReparto: number };
  };
  
  export type RepartoScreensNavigationProp = StackNavigationProp<
    RootStackParamList,
    'RepartoScreen'
  >;
type Item = {
    item: Reparto;
    onItemPress: (item: Reparto) => void;
  };
  
  const Item = ({ item, onItemPress }: Item) => {
    return (
        <TouchableOpacity onPress={() => onItemPress(item)}>
        <View style={appStyles.card}>
          <View style={appStyles.list}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={appStyles.buttonText}>Reparto:</Text>
              <Text style={appStyles.name}>{item.codReparto}</Text>
            </View>
  
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={appStyles.buttonText}>Fecha:</Text>
              <Text style={appStyles.description}>{item.fechaReparto}</Text>
            </View>
  
         
          </View>
        </View>
      </TouchableOpacity>
    );
  };
export const RepartoScreen = () => {
  const { user } = useContext(AuthContext);
  const [repartoModel, setRepartoModel] = useState<Reparto[]>([]); 
  const isFocused = useIsFocused(); 
  const navigation = useNavigation<RepartoScreensNavigationProp>();

  const handleItemPress = (item: any) => {
    navigation.navigate('DetalleRepartoScreen', { codReparto: item.codReparto });


  }; 
  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  const getData = async () => {
    try {
        
      const { data } = await apiAxios.get(`/repartos/repartochofer/?codempresa=1&chofer=${user?.codPersonaErp}` );
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
     <Item item={item} onItemPress={(selectedItem: Reparto) => handleItemPress(selectedItem)} />
   )}
   keyExtractor={(item) => item.codReparto.toString()}
 />
    )} 
  </View>
  );
};
