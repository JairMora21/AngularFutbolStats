export interface IEquipoStats {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: any;
  result:        Result;
}

export interface Result {
  golesAnotados:     number;
  golesRecibidos:    number;
  golesDiferencia:   number;
  amarillas:         number;
  rojas:             number;
  partidosJugados:   number;
  partidosGanados:   number;
  partidosEmpatados: number;
  partidosPerdidos:  number;
}
