export interface ITemporada {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: any;
  result:        Result[];
}

export interface IUltimaTemporada {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: any;
  result:        Result;
}
export interface Result {
  id:              number;
  clasificacion:   null;
  equipo:          string;
  noTemporada:     number;
  fechaInicio:     Date;
  fechaFinal:      null;
  posicion:        null;
  nombreTemporada: string;
}
