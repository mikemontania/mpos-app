import { View, Text, StyleSheet  } from 'react-native';
import React from 'react'; 
import { THEME_COLOR } from '../theme/theme';

export const PrincipalScreen = ( ) => { 
      return (
        <View style={styles.container}> 
          <Text style={styles.title}>¡Bienvenido a MPOS !</Text> 
          <Text style={styles.subtitle}>mpos@2024</Text> 
        </View>
      );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color:THEME_COLOR
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: THEME_COLOR,
  },
});
