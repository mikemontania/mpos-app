 
export interface Usuario {
    codUsuario:       number;
    codEmpresa:       number;
    codSucursal:      number;
    codEmpresaErp:    string;
    codPersonaErp:    string;
    sub:    string;
    codSucursalErp:   string;
    nombre:           string;
    username:         string;
    password:         string;
    authorities:      string[];
    img:              string;
    maxDescuentoImp:  number;
    maxDescuentoPorc: number;
    cantItem:         number;
}
export interface LoginResponse { 
    token:    string; 
}
