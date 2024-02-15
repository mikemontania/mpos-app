import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { LoadingScreen } from "../screens/LoadingScreen";
import { AuthContext } from "../context/AuthContex"; 
import { RepartoScreen } from "../screens/RepartoScreen";
import { PedidoScreen } from "../screens/PedidoScreen";
import { PrincipalScreen } from "../screens/PrincipalScreen";
const Stack = createStackNavigator();

export const Navigator = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking") return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white"
        }
      }}
    >
      {status !== "authenticated" ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Principal"
            options={{ title: "Principal" }}
            component={PrincipalScreen}
          />
          <Stack.Screen
            name="Pedido"
            options={{ title: "Pedido" }}
            component={PedidoScreen}
          />
          <Stack.Screen
            name="Reparto"
            options={{ title: "Reparto" }}
            component={RepartoScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
