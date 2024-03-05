import React, { useContext } from "react";

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView
} from "@react-navigation/drawer";

import {
  Image,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity
} from "react-native";
import { appStyles } from "../theme/theme";
import { PrincipalScreen } from "../screens/PrincipalScreen";
import { PedidoScreen } from "../screens/PedidoScreen";
import { RepartoScreen } from "../screens/RepartoScreen";
import { AuthContext } from "../context/AuthContex";
import { DetalleRepartoScreen } from "../screens/DetalleRepartoScreen";
import { PDFViewer } from "../componentes/PDFViewer";
const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
 const { user, token, logOut } = useContext(AuthContext);

  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: dimensions.width >= 768 ? "permanent" : "front",
        /*       drawerStyle: {
        backgroundColor: '#04B3FF',  
      }, */
        /*       headerStyle: {
        backgroundColor: '#04B3FF',  
      }, */
        headerTintColor: "#04B3FF",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
      drawerContent={(props) => <MenuInterno {...props} />}
    >
      <Drawer.Screen
        name="Principal"
        component={PrincipalScreen}
        options={{ drawerLabel: "Principal" }}
      />
      <Drawer.Screen
        name="Pedido"
        component={PedidoScreen}
        options={{ drawerLabel: "Pedido" }}
      />
      <Drawer.Screen
        name="Reparto"
        component={RepartoScreen}
        options={{ drawerLabel: "Reparto" }}
      />
      <Drawer.Screen
        name="DetalleRepartoScreen"
        component={DetalleRepartoScreen}
        options={{
          drawerLabel: "Detalle Reparto",
          headerTitle: "Mapa" // Agrega esta línea para personalizar el título
        }}
      />
      <Drawer.Screen
        name="PDFViewer"
        component={PDFViewer}
        options={{ drawerLabel: "PDF Viewer" }}
      />
    </Drawer.Navigator>
  );
};

const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
  const { user, token, logOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView>
      {/* Parte del avatar */}
      <View style={appStyles.avatarContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={appStyles.avatar}
        />
        <Text style={appStyles.avatarTexto}>{user?.username}</Text>
      </View>

      {/* Opciones de menú */}
      <View style={appStyles.menuContainer}>
        <TouchableOpacity
          style={appStyles.menuBoton}
          onPress={() => navigation.navigate("Principal")}
        >
          <Text style={appStyles.menuTexto}>Principal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={appStyles.menuBoton}
          onPress={() => navigation.navigate("Pedido")}
        >
          <Text style={appStyles.menuTexto}>Pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={appStyles.menuBoton}
          onPress={() => navigation.navigate("Reparto")}
        >
          <Text style={appStyles.menuTexto}>Reparto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={appStyles.menuBoton} onPress={() => logOut()}>
          <Text style={appStyles.menuTexto}>Salir</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
