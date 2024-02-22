import React from "react";
import { View } from "react-native";
import  {  Callout as BaseCallout } from "react-native-maps";

interface CustomCalloutProps {
    children?: React.ReactNode;
    onClose: () => void;
  }
  export const CustomCallout: React.FC<CustomCalloutProps> = ({
    children,
    onClose
  }) => {
    const handleClose = () => {
      onClose();
    };
  
    return (
      <BaseCallout>
        <View>
          {children}
           
        </View>
      </BaseCallout>
    );
  };