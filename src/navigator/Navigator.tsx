import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { LoadingScreen } from "../screens/LoadingScreen";
import { AuthContext } from "../context/AuthContex";  
import { MenuLateral } from "./MenuLateral";
import { PermissionsContext, PermissionsProvider } from '../context/PermissionsContext';
import { PermissionsScreen } from "../screens/PermissionsScreen";
const Stack = createStackNavigator();

export const Navigator = () => {
  const { permissions } = useContext( PermissionsContext );
  const { status } = useContext(AuthContext);
  const Stack = createStackNavigator();

  const PermisionStack = () => ( 
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white'
      }
    }}
    >
      <Stack.Screen name="PermissionsScreen" component={ PermissionsScreen } />
    </Stack.Navigator>
    
  );


  const AuthStack = () => ( 
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white'
      }
    }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator> 
  );
  if (status === "checking") return <LoadingScreen />;

  return (
    status !== "authenticated" ? (
      <AuthStack />
    ) : ( 
        ( permissions.locationStatus === 'granted' )
          ?  <MenuLateral />
          : <PermisionStack />  
    )
  );
};