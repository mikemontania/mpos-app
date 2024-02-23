// MarkerModal.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  StyleSheet
} from "react-native";
import { THEME_COLOR, appStyles } from "../theme/theme";
import apiAxios from "../api/axios";
import { Marcador } from "../screens/DetalleRepartoScreen";
import {
  CobranzaDetalle,
  Venta,
  VentaDetalle
} from "../interfaces/Venta.interfaces";
import { ImageLoader } from "./ImagenLoader";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
interface MarkerModalDetailsProps {
  isVisible: boolean;
  onClose: () => void;
  update: () => void;
  markerData: Marcador | null;
}

export const MarkerModalDetails: React.FC<MarkerModalDetailsProps> = ({
  isVisible,
  onClose,
  update,
  markerData
}) => {
  const [venta, setVenta] = useState({} as Venta);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [markerData]);

  useEffect(() => {
    setLoading(venta ? false : true);
  }, [venta]);

  const getData = async () => {
    if (markerData) {
      try {
        const { data } = await apiAxios.get(
          `/ventas/model/${markerData.codVenta}`
        );
        console.log(`/ventas/model/${markerData.codVenta}`);
        if (data) {
          console.log(data);
          setVenta(data.venta);
          console.log(data);
        }
      } catch (error: any) {
        console.error("Error al realizar la consulta:", error.message);
      }
    }
  };

  const entregar = async () => {
    if (markerData) {
      try {
        const { data } = await apiAxios.put(
          `/repartos/entregar?id=${markerData.codRepartoDoc}`
        );

        update();
        onClose();
      } catch (error: any) {
        console.error("Error al realizar la consulta:", error.message);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <>
            {markerData !== null && (
              <ScrollView contentContainerStyle={{ padding: 10 }}>
                <View style={{ padding: 10 }}>
                  {/* Header Section */}
                  <View style={modalStyles.headerContainer}>
                    <TouchableOpacity
                      style={modalStyles.closeButtonHeader}
                      onPress={onClose}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        size={30}
                        color={THEME_COLOR}
                      />
                    </TouchableOpacity>
                    <Text style={modalStyles.headerText}>
                      Cliente: {venta.cliente?.razonSocial}
                    </Text>

                    <Text style={modalStyles.secondaryTitle}>
                      Nro. Documento: {venta.cliente?.docNro}
                    </Text>
                    <Text style={modalStyles.secondaryTitle}>
                      Numero Comprobante: {venta?.nroComprobante}
                    </Text>
                    <Text style={modalStyles.secondaryTitle}>
                      Importe: {venta?.importeTotal?.toLocaleString()} Gs.
                    </Text>
                  </View>

                  {/* Product Details Section */}
                  <Text style={modalStyles.productDetailsHeading}>
                    Detalles del Producto:
                  </Text>
                  {venta.detalle?.map((detalle: VentaDetalle) => (
                    <View
                      key={detalle.codVentaDetalle}
                      style={modalStyles.productDetailContainer}
                    >
                      <View style={modalStyles.productImageContainer}>
                        <ImageLoader
                          imageUrl={`/productos/download-image/${detalle.producto.img}`}
                        />
                      </View>
                      <View style={modalStyles.productTextContainer}>
                        <Text style={modalStyles.regularText}>
                          Nombre Producto: {detalle.producto.nombreProducto}
                        </Text>
                        <Text style={modalStyles.regularText}>
                          Cantidad: {detalle.cantidad?.toLocaleString()}
                        </Text>
                        <Text style={modalStyles.regularText}>
                          Total: {detalle.importeTotal?.toLocaleString()} Gs.
                        </Text>
                      </View>
                    </View>
                  ))}

                  {/* Cobranza Details Section */}
                  <Text style={modalStyles.productDetailsHeading}>
                    Detalles de Cobranza:
                  </Text>
                  {venta.cobranza?.detalle.map(
                    (cobranzaDetalle: CobranzaDetalle) => (
                      <View
                        key={cobranzaDetalle.codCobranzaDetalle}
                        style={modalStyles.cobranzaDetailContainer}
                      >
                        <Text style={modalStyles.cobranzaDetailsTitle}>
                          Medio de Pago: {cobranzaDetalle.medioPago.descripcion}
                        </Text>
                        <Text style={modalStyles.cobranzaDetailsTitle}>
                          Abonado:{" "}
                          {cobranzaDetalle.importeAbonado?.toLocaleString()} Gs.
                        </Text>
                        <Text style={modalStyles.cobranzaDetailsText}>
                          Cobrado:{" "}
                          {cobranzaDetalle.importeCobrado?.toLocaleString()} Gs.
                        </Text>
                        <Text style={modalStyles.cobranzaDetailsText}>
                          Saldo: {cobranzaDetalle.saldo?.toLocaleString()} Gs.
                        </Text>
                      </View>
                    )
                  )}

                  {/* Close Button */}

                  {!markerData.entregado && (
                    <TouchableOpacity
                      style={{
                        ...modalStyles.buttonStyle,
                        margin: 10,
                        flex: 1
                      }}
                      onPress={entregar}
                    >
                      <Text style={modalStyles.buttonText}>entregar</Text>
                    </TouchableOpacity>
                  )}
                  {markerData.entregado && (
                    <TouchableOpacity
                      style={{
                        ...modalStyles.buttonStyle,
                        margin: 10,
                        flex: 1
                      }}
                      onPress={onClose}
                    >
                      <Text style={modalStyles.buttonText}>cerrar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};
export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
  headerContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: THEME_COLOR
  },

  headerText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: THEME_COLOR
  },
  secondaryTitle: {
    color: THEME_COLOR, // Color del tema
    fontSize: 10,
    fontWeight: "bold"
  },
  closeButtonLabel: {
    color: "white"
  },

  productTextContainer: {
    flex: 1
  },
  productDetailsHeading: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: THEME_COLOR // Puedes dejar este color como está o ajustarlo según tus preferencias
  },
  buttonStyle: {
    flex: 1,
    height: 45,
    backgroundColor: THEME_COLOR,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    elevation: 6
  },
  closeButton: {
    ...appStyles.blackButton,
    backgroundColor: THEME_COLOR,
    marginTop: 20
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8
  },
  closeButtonHeader: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1
  },
  regularText: {
    color: "white", // Establece el color del texto como blanco
    fontSize: 10
  },
  productDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 8
  },
  productImageContainer: {
    marginRight: 10
  },
  cobranzaDetailsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: THEME_COLOR
  },
  cobranzaDetailsText: {
    color: THEME_COLOR,
    fontSize: 10
  },
  cobranzaDetailContainer: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderColor: THEME_COLOR,
    borderWidth: 2
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
