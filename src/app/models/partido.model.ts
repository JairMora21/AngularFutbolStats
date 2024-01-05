export interface IPartido {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: null;
  result:        Result[];
}

export interface Result {
  id:          number;
  equipo:      string;
  equipoEscudo: string;
  temporada:   string;
  tipoPartido: string;
  resultado:   string;
  fecha:       Date;
  nombreRival: string;
  golesFavor:  number;
  golesContra: number;
}


export interface IPartidoStats {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: null;
  result:        ResultStats;
}

export interface ResultStats {
  datosPartido:  DatosPartido;
  goleadores:    Goleadore[];
  participantes: Participante[];
  tarjetas:      Tarjeta[];
}

export interface DatosPartido {
  id:          number;
  equipo:      string;
  equipoEscudo: string;
  temporada:   string;
  tipoPartido: string;
  resultado:   string;
  fecha:       Date;
  nombreRival: string;
  golesFavor:  number;
  golesContra: number;
}

export interface Goleadore {
  nombre:   string;
  cantidad: number;
}

export interface Participante {
  nombre: string;
  dorsal: string;

}

export interface Tarjeta {
  nombre:        string;
  tarjeta:       string;
  idTipoTarjeta: number;
}

