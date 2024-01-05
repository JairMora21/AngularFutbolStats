import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { IEquipoStats } from '../models/equipoStats.model';
import { IEquipos, IEquipo } from '../models/equipos.model';
import { ITopStats, ITopStatsCards } from '../models/topStats.model';
import { ITemporada, IUltimaTemporada } from '../models/temporada.model';
import { IJugadores, IJugadoresStats } from '../models/jugador.model';
import { IPartido, IPartidoStats } from '../models/partido.model';


import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DataService } from './data.service';




@Injectable({
  providedIn: 'root'
})
export class MiAPiServiceService {

  private apiUrl = 'http://localhost:9097/api'

  constructor(private _http: HttpClient, private data: DataService) { }



  getPartidos(): Observable<IPartido> {
    return this.data.temporadaId$.pipe(
      switchMap((idTemporada) => {
        const url = `${this.apiUrl}/Partido/Partidos/${idTemporada}`;
        return this._http.get<IPartido>(url);
      })
    );
  }

  getPartidoStats(idPartido: number): Observable<IPartidoStats> {
    const url = `${this.apiUrl}/Partido/PartidoStats/${idPartido}`;
    return this._http.get<IPartidoStats>(url);
  }


    getJugadorStats(idJugador: number): Observable<IJugadoresStats> {
    return this.data.temporadaId$.pipe(
      switchMap((idTemporada) => {
        let params = new HttpParams();

        if (idTemporada != 0) {
          params = params.set('idTemporada', idTemporada.toString());
        }
        const url = `${this.apiUrl}/Equipo/JugadorStats/${idJugador}`;
        return this._http.get<IJugadoresStats>(url, { params });
      })
    );
  }


  getJugadores(idEquipo: number): Observable<IJugadores> {
    const url = `${this.apiUrl}/Equipo/Jugadores/${idEquipo}`;
    return this._http.get<IJugadores>(url);
  }




  /**
 * Obtiene la lista de los jugadores con mas partidos parámetros opcionales.
 *
 * @param idEquipo - Identificador único del equipo.
 * @param limite - Número opcional que representa el límite de resultados a obtener.
 * @returns Observable que emite la respuesta de la solicitud HTTP con los mejores partidos.
 */
getTopPartidos(idEquipo: number, limite: number | null): Observable<ITopStats> {
  // Utiliza el servicio 'temporadaId$' para obtener el ID de temporada actual.
  return this.data.temporadaId$.pipe(
    switchMap((idTemporada) => {
      // Crea un objeto 'HttpParams' para gestionar los parámetros de la URL.
      let params = new HttpParams();
      // Añade el parámetro 'idTemporada' si el valor es diferente de cero.
      if (idTemporada != 0) {
        params = params.set('idTemporada', idTemporada.toString());
      }
      // Añade el parámetro 'limite' si el valor no es nulo.
      if (limite !== null) {
        params = params.set('limite', limite.toString());
      }
      // Construye la URL completa para la solicitud HTTP.
      const url = `${this.apiUrl}/Equipo/TopPartidos/${idEquipo}`;
      // Realiza la solicitud HTTP utilizando los parámetros construidos.
      return this._http.get<ITopStats>(url, { params });
    })
  );
}

  //Tiene la misma logica que el metodo GetTopPartidos
  getTopGoleadores(idEquipo: number, limite: number | null): Observable<ITopStats> {
    return this.data.temporadaId$.pipe(
      switchMap((idTemporada) => {
        let params = new HttpParams();
        if (idTemporada != 0) {
          params = params.set('idTemporada', idTemporada.toString());
        }
        if (limite !== null) {
          params = params.set('limite', limite.toString());
        }
        const url = `${this.apiUrl}/Equipo/TopGoleadores/${idEquipo}`;
        return this._http.get<ITopStats>(url, { params });
      })
    );
  }

  //Tiene la misma logica que el metodo GetTopPartidos
  getTopTarjetas(idEquipo: number, limite: number | null): Observable<ITopStatsCards> {
    return this.data.temporadaId$.pipe(
      switchMap((idTemporada) => {
        let params = new HttpParams();
        if (idTemporada != 0) {
          params = params.set('idTemporada', idTemporada.toString());
        }
        if (limite !== null) {
          params = params.set('limite', limite.toString());
        }
        const url = `${this.apiUrl}/Equipo/TopTarjetas/${idEquipo}`;
        return this._http.get<ITopStatsCards>(url, { params });
      })
    );
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

  getTemporadas(idEquipo: number): Observable<ITemporada> {
    let url = `${this.apiUrl}/Temporada/Temporadas/${idEquipo}`;
    return this._http.get<ITemporada>(url);
  }


  getUltimaTemporadas(idEquipo: number): Observable<IUltimaTemporada> {
    let url = `${this.apiUrl}/Temporada/UltimaTemporada/${idEquipo}`;
    return this._http.get<IUltimaTemporada>(url);
  }

  /**
   * Consultas GET para obtener datos de los equipo sdisponibles
  */
  getTeams(): Observable<IEquipos> {
    let url = `${this.apiUrl}/Equipo/Equipos`;
    return this._http.get<IEquipos>(url);
  }
  getTeam(idEquipo: number): Observable<IEquipo> {
    let url = `${this.apiUrl}/Equipo/Equipo/${idEquipo}`;
    return this._http.get<IEquipo>(url);
  }
}



