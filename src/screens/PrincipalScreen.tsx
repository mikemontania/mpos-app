import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'; 
import { THEME_COLOR } from '../theme/theme';

export const PrincipalScreen = () => { 
  return (
    <View style={styles.container}> 
        <Text style={styles.title}>¡Bienvenido a MPOS!</Text> 
{/*       <Image
        source={require('../assets/logo-mb.png')}  
        style={styles.logo}
      /> */}
      <Text style={styles.subtitle}>mpos@2024</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20, // Puedes ajustar el margen según tus necesidades
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: THEME_COLOR,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: THEME_COLOR,
  },
});
