import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Dimensions, View, ActivityIndicator } from "react-native";
 

interface RouteParams {
  pdf: any;
}

export const PDFViewer: React.FC = () => {
  const route = useRoute();
  const { pdf } = route.params as RouteParams;

  useEffect(() => {
    console.log(pdf);
  }, [pdf]);

  return (
    <View style={styles.container}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});