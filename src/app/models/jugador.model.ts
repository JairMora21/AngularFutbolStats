export interface IJugadores {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: null;
  result: Result[];
}


export interface Result {
  id:       number;
  posicion: string;
  equipo:   string;
  nombre:   string;
  apellido: string;
  img:      null;
  dorsal:   string;
  activo:   boolean;
}

export interface IJugadoresStats {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: null;
  result: ResultStats;
}

export interface ResultStats {
  id: number;
  golesTemp: number;
  golesTotal: number;
  amarillasTemp: number;
  amarillasTotal: number;
  rojasTemp: number;
  rojasTotal: number;
  partidosJugadosTemp: number;
  partidosJugadosTotal: number;
}
