export class Establecimiento {
    nombre: string;
    tipo: string;
    direccion: string;
    cod_postal: string;
    longitud: string;
    latitud: string;
    telefono: string;
    descripcion: string;
    localidad: Localidad;
    provincia: Provincia;
}
export class Localidad {
  codigo: string;
  nombre: string;
}
export class Provincia {
  codigo: string;
  nombre: string;
}