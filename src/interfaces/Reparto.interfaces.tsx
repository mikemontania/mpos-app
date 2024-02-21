 
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

export interface Producto {
    codProducto:            number;
    codProductoErp:         string;
    nombreProducto:         string;
    empresa:                Empresa;
    unidad:                 Unidad;
    descripcion:            string;
    codBarra:               string;
    categoriaProducto:      CategoriaProducto;
    marca:                  string;
    presentacion:           string;
    color:                  string;
    peso:                   number;
    catABC:                 string;
    img:                    string;
    obs:                    string;
    destacado:              boolean;
    inventariable:          boolean;
    activo:                 boolean;
    sinDescuento:           boolean;
    iva:                    number;
    ivaEspecial:            boolean;
    cantidadMin:            number;
    cantidadMax:            number;
    fechaCreacion:          null;
    fechaModificacion:      null | string;
    codUsuarioCreacion:     null;
    codUsuarioModificacion: number | null;
    grpMaterial:            null | string;
    concatCodNombre:        string;
    concatCodErpNombre:     string;
    codMaterial:            string;
}

export interface CategoriaProducto {
    codCategoriaProducto:    number;
    codCategoriaProductoErp: string;
    descripcion:             string;
    codEmpresa:              number;
}

export interface Empresa {
    codEmpresa:       number;
    codEmpresaErp:    string;
    razonSocial:      string;
    nombre:           string;
    actividad1:       string;
    actividad2:       string;
    direccionGen:     string;
    telefonoGen:      string;
    ruc:              string;
    tipoNegocio:      TipoNegocio;
    rubro:            null;
    img:              string;
    logoReporte:      null;
    logoHeaderDark:   null;
    logoHeaderLight:  null;
    logoTextDark:     null;
    logoTextLight:    null;
    cantItem:         number;
    maxDescuentoPorc: number;
    maxDescuentoImp:  number;
    tipoLicencia:     TipoLicencia;
}

export interface TipoLicencia {
    codTipoLicencia: number;
    descripcion:     string;
    cantTerminales:  number;
    cantSucursales:  number;
    cantUsuarios:    number;
    precio:          number;
}

export interface TipoNegocio {
    codTipoNegocio: number;
    descripcion:    TipoNegocioDescripcion;
    valor:          string;
}

export enum TipoNegocioDescripcion {
    Showroom = "SHOWROOM",
}

export interface Unidad {
    codUnidad:    number;
    codUnidadErp: CodUnidadERP;
    nombreUnidad: NombreUnidad;
    codEmpresa:   number;
    cantidad:     number;
}

export enum CodUnidadERP {
    Un = "UN",
}

export enum NombreUnidad {
    Unidad = "UNIDAD",
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

export interface Cliente {
    codCliente:             number;
    codClienteErp:          string;
    razonSocial:            string;
    tipoDoc:                string;
    docNro:                 string;
    codEmpresa:             number;
    sucursalPref:           Sucursal;
    listaPrecio:            ListaPrecio;
    medioPagoPref:          MedioPagoPref;
    formaVentaPref:         FormaVenta;
    grupoDescuento:         GrupoDescuento;
    carnetGrupo:            string;
    carnetVencimiento:      string;
    categoria:              null;
    grupo:                  null;
    zona:                   null;
    direccion:              string;
    telefono:               string;
    obssap:                 null;
    email:                  string;
    web:                    null;
    catABC:                 string;
    obs:                    null;
    activo:                 boolean;
    codeBarra:              boolean;
    diasCredito:            number;
    fechaCreacion:          string;
    fechaModificacion:      string;
    codUsuarioCreacion:     number;
    codUsuarioModificacion: number | null;
    codUltimaVenta:         number;
    excentoIva:             boolean;
    predeterminado:         boolean;
    esPropietario:          boolean;
    empleado:               boolean;
    latitud:                number;
    longitud:               number;
    concatDocNombre:        string;
    concatCodNombre:        string;
    concatCodErpNombre:     string;
    puntos:                 number;
}

export interface FormaVenta {
    codFormaVenta:    number;
    descripcion:      FormaVentaPrefDescripcion;
    cantDias:         number;
    codFormaVentaErp: CodFormaVentaERP;
    codEmpresa:       number;
    esContado:        boolean;
}

export enum CodFormaVentaERP {
    CD = "CD",
}

export enum FormaVentaPrefDescripcion {
    Contado = "CONTADO",
}

export interface GrupoDescuento {
    codGrupo:    number;
    codEmpresa:  number;
    descripcion: string;
    descuento:   number;
}

export interface ListaPrecio {
    codListaPrecio:         number;
    codListaPrecioErp:      string;
    descripcion:            TipoNegocioDescripcion;
    codEmpresa:             number;
    ecommerce:              boolean;
    sincronizable:          boolean;
    fechaCreacion:          null;
    fechaModificacion:      null;
    codUsuarioCreacion:     null;
    codUsuarioModificacion: null;
}

export interface MedioPagoPref {
    codMedioPago:           number;
    codMedioPagoErp:        string;
    descripcion:            string;
    codEmpresa:             number;
    tieneTipo:              boolean;
    tieneRef:               boolean;
    tieneBanco:             boolean;
    esCheque:               boolean;
    esObsequio:             boolean;
    fechaCreacion:          null;
    fechaModificacion:      null;
    codUsuarioCreacion:     null;
    codUsuarioModificacion: null;
}

export interface Sucursal {
    codSucursal:            number;
    codSucursalErp:         CodSucursalERP;
    centro:                 Centro;
    nombreSucursal:         NombreSucursal;
    direccion:              Direccion;
    telefono:               Telefono;
    email:                  Email;
    principal:              boolean;
    codEmpresa:             number;
    latitud:                number;
    longitud:               number;
    modoVendedor:           ModoVendedor;
    fechaCreacion:          null;
    fechaModificacion:      null;
    codUsuarioCreacion:     null;
    codUsuarioModificacion: null;
    envioposventa:          boolean;
    mensaje:                string;
}

export enum Centro {
    P102 = "P102",
    P103 = "P103",
    P106 = "P106",
}

export enum CodSucursalERP {
    P101 = "P101",
    P102 = "P102",
    P106 = "P106",
}

export enum Direccion {
    AvenidaAvdaSantisimaTrinidadEDRRamonZubizarreta = "AVENIDA, AVDA. SANTISIMA TRINIDAD E/ DR. RAMON ZUBIZARRETA",
    JulioCorrea485EntreTteCesarVelazquezYDomingoPortillo = "JULIO CORREA 485 ENTRE TTE CESAR VELAZQUEZ Y DOMINGO PORTILLO",
    RutaDepartamentalD027ExRuta1EIsrael = "RUTA DEPARTAMENTAL D027 (EX RUTA 1 ) E/ISRAEL",
}

export enum Email {
    CapiataCavallaroCOMPy = "capiata@cavallaro.com.py",
    JuliocorreaCavallaroCOMPy = "juliocorrea@cavallaro.com.py",
    MburucuyaCavallaroCOMPy = "mburucuya@cavallaro.com.py",
}

export enum ModoVendedor {
    General = "GENERAL",
}

export enum NombreSucursal {
    Capiata = "CAPIATA",
    JulioCorrea = "JULIO CORREA",
    Mburucuya = "MBURUCUYA",
}

export enum Telefono {
    The0981390050 = "(0981) 390-050",
    The0981627369 = "(0981) 627-369",
    The0986133183 = "(0986) 133-183",
}

export interface Venta {
    codVenta:            number;
    codEmpresa:          number;
    codSucursal:         number;
    codEmpresaErp:       string;
    codSucursalErp:      CodSucursalERP;
    formaVenta:          FormaVenta;
    cliente:             Cliente;
    listaPrecio:         ListaPrecio;
    codVendedorErp:      string;
    fechaVenta:          string;
    fechaCreacion:       string;
    fechaModificacion:   string;
    codUsuarioCreacion:  number;
    terminalVenta:       TerminalVenta;
    tipoComprobante:     string;
    nroComprobante:      string;
    timbrado:            string;
    inicioTimbrado:      string;
    finTimbrado:         string;
    fechaVencimiento:    string;
    importeTotal:        number;
    subTotal:            number;
    importeNeto:         number;
    porcDescuento:       number;
    importeDescuento:    number;
    importeIva5:         number;
    importeIva10:        number;
    importeIvaExenta:    number;
    totalKg:             number;
    anulado:             boolean;
    esObsequio:          boolean;
    editable:            boolean;
    motivoAnulacion:     MotivoAnulacion | null;
    fechaAnulacion:      null | string;
    codUsuarioAnulacion: number | null;
    detalle:             null;
    cobranza:            Cobranza;
    tipoVenta:           string;
    modoEntrega:         string;
    estado:              string;
    pedido:              null;
    cupon:               null;
    vendedor:            Vendedor;
    codReparto:          number;
    deposito:            Deposito;
    descuentoProducto:   number;
    puntosObtenidos:     number;
    totalPuntos:         number;
}

export interface Cobranza {
    codCobranza:         number;
    codEmpresa:          number;
    codSucursal:         number;
    codUsuarioCreacion:  number;
    fechaCobranza:       string;
    importeCobrado:      number;
    importeAbonado:      number;
    saldo:               number;
    anulado:             boolean;
    codDoc:              null;
    codUsuarioAnulacion: number | null;
    fechaAnulacion:      null | string;
    tipo:                string;
    detalle:             null;
}

export interface Deposito {
    codDeposito:    number;
    codDepositoErp: string;
    nombreDeposito: string;
    codEmpresa:     number;
    sucursal:       Sucursal;
    tipoDeposito:   TipoDeposito;
    tipoVenta:      boolean;
}

export interface TipoDeposito {
    codTipoDeposito: number;
    descripcion:     string;
    codEmpresa:      number;
}

export interface MotivoAnulacion {
    codMotivoAnulacion:    number;
    codMotivoAnulacionErp: string;
    descripcion:           string;
    codEmpresa:            number;
}

export interface TerminalVenta {
    codTerminalVenta: number;
    descripcion:      NombreSucursal;
    id:               string;
    codEmpresa:       number;
    codSucursal:      number;
    disponible:       boolean;
}

export interface Vendedor {
    codVendedor:        number;
    codVendedorErp:     string;
    vendedor:           string;
    docNro:             string;
    codEmpresa:         number;
    usuario:            Usuario;
    direccion:          string;
    telefono:           string;
    email:              string;
    tarjeta:            null;
    codSupervisorErp:   string;
    tipo:               string;
    porcentajeComision: number;
    obs:                string;
    activo:             boolean;
    fechaCreacion:      string;
    fechaModificacion:  string;
    concatDocNombre:    string;
    concatCodErpNombre: null;
}

export interface Usuario {
    codUsuario:     number;
    nombrePersona:  string;
    codPersonaErp:  string;
    username:       string;
    rol:            Rol;
    codEmpresa:     number;
    sucursal:       Sucursal;
    createdAt:      string;
    modifiedAt:     string;
    lastLoginAt:    string;
    createdBy:      string;
    modifiedBy:     string;
    enabled:        boolean;
    img:            string;
    bloqueado:      boolean;
    intentoFallido: number;
}

export interface Rol {
    codRol:    number;
    nombreRol: string;
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
