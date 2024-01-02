export interface IEquipos {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: null;
  result:        Result[];
}

export interface IEquipo {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: null;
  result:        Result;
}

export interface Result {
  id:     number;
  nombre: string;
  lugar:  string;
  escudo: string;
}
