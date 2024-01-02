import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEquipoStats} from '../models/equipoStats.model';
import {IEquipos, IEquipo} from '../models/equipos.model';
import {ITemporada } from '../models/temporada.model';



@Injectable({
  providedIn: 'root'
})
export class MiAPiServiceService {

  private apiUrl = 'http://localhost:9097/api'
  constructor(private _http: HttpClient) { }

  getTemporadas(idEquipo: number): Observable<ITemporada>{
    let url = `${this.apiUrl}/Temporada/Temporadas/${idEquipo}`;
    return this._http.get<ITemporada>(url);
  }
  getTeam(idEquipo: number): Observable<IEquipo>{
    let url = `${this.apiUrl}/Equipo/Equipo/${idEquipo}`;
    return this._http.get<IEquipo>(url);
  }
  getTeams(): Observable<IEquipos>{
    let url = `${this.apiUrl}/Equipo/Equipos`;
    return this._http.get<IEquipos>(url);
  }

  getTeamStats(idEquipo: number, idTemporada: number | null = null): Observable<IEquipoStats> {
    let url = `${this.apiUrl}/Equipo/EquipoStats/${idEquipo}`;
    if (idTemporada !== null) {
      url += `?idTemporada=${idTemporada}`;
    }
    return this._http.get<IEquipoStats>(url);
  }


}
