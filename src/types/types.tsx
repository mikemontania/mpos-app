import { StackNavigationProp } from "@react-navigation/stack";
import { RepartoPendiente } from "../interfaces/Reparto.interfaces";

export type ItemReparto = {
    item: RepartoPendiente;
    codEmpresa: number;
    onItemPress: (item: RepartoPendiente) => void;
    onFinished: (item: RepartoPendiente) => void;
  };

  export type RootStackParamList = {
    Reparto: undefined;
    PDFViewer: { pdf: any };
    DetalleRepartoScreen: { codReparto: number };
  };
  
  export type RepartoScreensNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Reparto"
  >;
  export type DetalleRepartoScreenNavigationProp = StackNavigationProp<  RootStackParamList,  "DetalleRepartoScreen">;
