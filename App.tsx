import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator'; 
import { AuthProvider } from './src/context/AuthContex'; 


 const AppState = ({ children}:{ children : JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider> 
    { children} 
    </AuthProvider>
  )
}


export const App = () => {
  return (
    <NavigationContainer> 
    <AppState>
    <Navigator /> 
    </AppState>
    </NavigationContainer>
  )
}
 