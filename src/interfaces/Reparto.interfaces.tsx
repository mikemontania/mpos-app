import { Producto, Unidad, Venta, Cliente } from "./Venta.interfaces";

export interface RepartoPendiente {
    codReparto: number;
    documentos: number;
    totalGs: number;
    totalKg: number;
    fechaReparto: string;
    finalizado: boolean;
    entregados: number;
    faltantes: number;
}
export interface Reparto {
    codReparto:          number;
    codEmpresa:          number;
    codSucursal:         number;
    chofer:              Chofer;
    ayudante1:           null;
    ayudante2:           null;
    vehiculo:            Vehiculo;
    codUsuarioCreacion:  number;
    obs:                 string;
    fechaReparto:        string;
    fechaCreacion:       string;
    fechaModificacion:   string;
    totalKg:             number;
    totalGs:             number;
    usuarioCreacion:     string;
    usuarioModificacion: string;
    finalizado:          boolean;
    anulado:             boolean;
    documento:           Documento[];
    detalle:             Detalle[];
}

export interface Chofer {
    codChofer:         number;
    codChoferErp:      string;
    codEmpresa:        number;
    activo:            boolean;
    docNro:            string;
    chofer:            string;
    tipoLicencia:      string;
    licencia:          string;
    direccion:         null;
    telefono:          null;
    codUltimoReparto:  null;
    fechaCreacion:     string;
    fechaModificacion: string;
    concatDocChofer:   string;
}

export interface Detalle {
    codRepartoDetalle: number;
    cantidad:          number;
    cantidadUnidad:    number;
    producto:          Producto;
    unidadMedida:      Unidad;
    totalKg:           number;
    totalGs:           number;
}
 
 
export interface Documento {
    codRepartoDocs: number;
    venta:          Venta;
    pedido:         null;
    cliente:        Cliente;
    totalKg:        number;
    totalGs:        number;
    docNro:         string;
    tipo:           string;
    entregado:      boolean;
    fechaReparto:   string;
    latitud:        number;
    longitud:       number;
}
 

export interface Vehiculo {
    codVehiculo:             number;
    codVehiculoErp:          string;
    codEmpresa:              number;
    activo:                  boolean;
    nroChapa:                string;
    nroChasis:               string;
    modelo:                  string;
    marca:                   string;
    color:                   string;
    combustible:             string;
    transmision:             string;
    codUltimoReparto:        null;
    fechaCreacion:           string;
    fechaModificacion:       string;
    concatMarcaModeloChasis: string;
    concatMarcaModeloChapa:  string;
}






