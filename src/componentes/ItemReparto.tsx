import { faMap, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity } from "react-native";
import { appStyles, THEME_COLOR } from "../theme/theme";
import { ItemReparto } from "../types/types";

export const Item = ({ item, onItemPress, onFinished }: ItemReparto) => {
    return (
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
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={appStyles.buttonText}>Total Gs:</Text>
            <Text style={appStyles.description}>
              {" "}
              {item.totalGs.toLocaleString("es-ES")}
            </Text>
          </View>
  
          {/* Botones con iconos */}
          <View 
            style={{ 
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center" // Alineación vertical centrada
            }}
          >
            <TouchableOpacity  style={{flex:1,flexDirection:'row' , alignContent:"center", justifyContent:'center' ,margin:5  ,backgroundColor:'white'} } onPress={() => onItemPress(item)}>
                <Text style={{ color: THEME_COLOR, paddingVertical:10, margin:5  }}>
                  Entregas
                </Text>
              <View style={appStyles.iconButton}>
                <FontAwesomeIcon icon={faMap} size={32} color={THEME_COLOR} />
              </View>
            </TouchableOpacity>
  
            {(item.entregados == item.documentos)&& item.faltantes == 0 && (
              <TouchableOpacity style={{flex:1,flexDirection:'row' , alignContent:"center", justifyContent:'center'  ,margin:5  ,backgroundColor:'white' } } onPress={() => onFinished(item)}>
                  <Text style={{ color: THEME_COLOR,  paddingVertical:10, margin:5  }}>
                    Finalizar
                  </Text>
                <View style={appStyles.iconButton}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    size={32}
                    color={THEME_COLOR}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };