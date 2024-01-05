export interface ITopStats {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: null;
  result:        Result[];
}

export interface ITopStatsCards {
  statusCode:    number;
  isSuccess:     boolean;
  errorMessages: null;
  result:        ResultCards[];
}



export interface Result {
  id:       number;
  nombre:   string;
  cantidad: number;
}


export interface ResultCards {
  id:        number;
  nombre:    string;
  rojas:     number;
  amarillas: number;
  total:     number;
}
