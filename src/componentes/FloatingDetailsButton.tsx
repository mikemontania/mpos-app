import { faCheckCircle, faEdit, faInfo, faInfoCircle, faList, faUser, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { THEME_COLOR } from "../theme/theme";

interface FloatingDetailsButtonProps {
  title: string;
  onPressDetails: () => void;
  onPressEdit: () => void;
}

export const FloatingDetailsButton: React.FC<FloatingDetailsButtonProps> = ({
  title,
  onPressDetails,
  onPressEdit
}) => {
  return (
    <Animatable.View
      animation="slideInDown"
      duration={500}
      style={{
        position: "absolute",
        top: 5,
        padding: 10,
        flexDirection: "column",
        left: 10,
        borderRadius: 30,
        transform: [{ translateX: -50 }],
        justifyContent: "center",
        alignItems: "flex-start",
        borderColor: "gray" // Color del borde
      }}
    >
      <View style={{backgroundColor:'white', padding:5, borderRadius:2 ,  }}>
      <Text style={{ color: THEME_COLOR, fontSize: 9 }}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={onPressDetails}
        style={{
          marginTop: 5,
          backgroundColor: "white",
          borderRadius: 30,
          padding: 10, 
        }}
      >
        <FontAwesomeIcon
          icon={faList }
          size={20}
          color={THEME_COLOR}
           
        />

        {/*  <Text style={{ color: "green", fontSize: 9 }}>Detalles</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressEdit}
        style={{
          marginTop: 5,
          backgroundColor: "white",
          borderRadius: 30,
          padding: 10, 
        }}
      >
        <FontAwesomeIcon
          icon={faUserAstronaut}
          size={20}
          color= {THEME_COLOR}
           
        />

        {/*  <Text style={{ color: "green", fontSize: 9 }}>Cliente</Text> */}
      </TouchableOpacity>
      {/* Agrega más detalles según sea necesario */}
    </Animatable.View>
  );
};
