import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export const EditarClienteScreen: React.FC = () => {
  const [nuevaDireccion, setNuevaDireccion] = useState("");

  const handleGuardarEdicion = () => {
    // Lógica para guardar la nueva dirección en tu estado o API
  };

  return (
    <View>
      {/* Diseño de la pantalla de edición */}
      <Text>Nueva Dirección:</Text>
      <TextInput
        value={nuevaDireccion}
        onChangeText={(text) => setNuevaDireccion(text)}
      />
      <TouchableOpacity onPress={handleGuardarEdicion}>
        <Text>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};
 