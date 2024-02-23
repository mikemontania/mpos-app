 
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

interface FloatingDetailsButtonProps {
  title: string;
  onPressDetails: () => void;
}

export const FloatingDetailsButton: React.FC<FloatingDetailsButtonProps> = ({ title, onPressDetails }) => {
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
        borderColor: "gray", // Color del borde
      }}
    >
      <Text style={{ color: "green", fontSize: 9 }}>{title}</Text>
      <TouchableOpacity
        onPress={onPressDetails}
        style={{
          marginTop: 5,
          backgroundColor: "white",
          borderRadius: 30,
          padding: 10,
          borderWidth: 1,
          borderColor: "green",
        }}
      >
        <Text style={{ color: "green", fontSize: 9 }}>Detalles</Text>
      </TouchableOpacity>
      {/* Agrega más detalles según sea necesario */}
    </Animatable.View>
  );
};
 
