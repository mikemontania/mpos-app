import {
  View,
  Text,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContex";
import { appStyles } from "../theme/theme";
import { Background } from "../componentes/Background";
import { WhiteLogo } from "../componentes/WhiteLogo"; 
import { StackScreenProps } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; 
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

interface Props extends StackScreenProps<any, any> {}
export const LoginScreen = ({ navigation }: Props) => {
  const [rememberMe, setRememberMe] = useState(false);
  const { login, errorMessage, removeError } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


 
  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Login incorrecto', errorMessage, [{ text: 'OK', onPress: removeError, }]);
  }, [errorMessage]);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const storedCredentials = await AsyncStorage.getItem('storedCredentials');
        console.log('Stored Credentials:', storedCredentials);

        if (storedCredentials) {
          const parsedData = JSON.parse(storedCredentials);
          console.log('Parsed Data:', parsedData);

          setRememberMe(parsedData.rememberMe);

          if (parsedData.rememberMe) {
            console.log('Setting username and Password:', parsedData.username, parsedData.password);
            setUsername(parsedData.username);
            setPassword(parsedData.password);
          }
        }
      } catch (error) {
        console.error('Error al cargar las credenciales almacenadas:', error);
      }
    };

    loadStoredCredentials();
  }, []);

  const onLogin = async () => {
    console.log({ username, password });
    Keyboard.dismiss();
    if (rememberMe) {
      const storedCredentials = JSON.stringify({ username, password, rememberMe });
      await AsyncStorage.setItem("storedCredentials", storedCredentials);
    } else {
      await AsyncStorage.removeItem("storedCredentials");
    }
    login({   username, password });
  };

  return (
    <>
      {/* Background */}
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={appStyles.formContainer}>
          {/* Keyboard avoid view */}
          <WhiteLogo />

          <Text style={appStyles.title}>Login</Text>

          <Text style={appStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              appStyles.inputField,
              Platform.OS === "ios" && appStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => setUsername(value.toLowerCase())}
            value={username}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={appStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              appStyles.inputField,
              Platform.OS === "ios" && appStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => setPassword(value)}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={appStyles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <FontAwesomeIcon
              icon={rememberMe ? faCheckSquare : faSquare}
              size={30}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={appStyles.rememberText}>Recordar credenciales</Text>
          </TouchableOpacity>

          {/* Boton login */}
          <View style={appStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={appStyles.button}
              onPress={onLogin}
            >
              <Text style={appStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
