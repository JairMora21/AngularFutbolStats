import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEquipoStats} from '../models/equipoStats.model';
import {IEquipos, IEquipo} from '../models/equipos.model';
import {ITemporada } from '../models/temporada.model';
import {switchMap } from 'rxjs/operators';
import { DataService } from './data.service';



@Injectable({
  providedIn: 'root'
})
export class MiAPiServiceService {

  private apiUrl = 'http://localhost:9097/api'

  constructor(private _http: HttpClient, private data: DataService) { }

  getTemporadas(idEquipo: number): Observable<ITemporada>{
    let url = `${this.apiUrl}/Temporada/Temporadas/${idEquipo}`;
    return this._http.get<ITemporada>(url);
  }

 /**
 * Obtiene las estadísticas del equipo para un ID de equipo dado y una temporada específica.
 * @param idEquipo ID del equipo para el cual se solicitan las estadísticas.
 * @returns Un observable que emite las estadísticas del equipo.
 */
getTeamStats(idEquipo: number): Observable<IEquipoStats> {
  return this.data.temporadaId$.pipe(
    switchMap((idTemporada) => {
      // Construye la URL base para la solicitud HTTP utilizando el ID del equipo.
      let url = `${this.apiUrl}/Equipo/EquipoStats/${idEquipo}`;
      // Agrega el parámetro de temporada a la URL si la temporada no es nula ni igual a cero.
      if (idTemporada != 0) {
        url += `?idTemporada=${idTemporada}`;
      }
      // Realiza la solicitud HTTP y devuelve el resultado como un observable de tipo IEquipoStats.
      return this._http.get<IEquipoStats>(url);
    })
  );
}


  getTeams(): Observable<IEquipos>{
    let url = `${this.apiUrl}/Equipo/Equipos`;
    return this._http.get<IEquipos>(url);
  }
  getTeam(idEquipo: number): Observable<IEquipo>{
    let url = `${this.apiUrl}/Equipo/Equipo/${idEquipo}`;
    return this._http.get<IEquipo>(url);
  }






}
