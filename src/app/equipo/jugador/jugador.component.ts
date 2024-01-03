import { Component, OnInit } from '@angular/core';
import {IJugadores, Result, IJugadoresStats, ResultStats} from '../../models/jugador.model';
import {Errores} from '../../models/error.model';
import {MiAPiServiceService} from '../../services/mi-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css', '../equipo.component.css']
})
export class JugadorComponent {

  constructor(private miApiService: MiAPiServiceService, private route: ActivatedRoute) {}

  jugadores: Result[] = [];
  jugadorStats: ResultStats = {} as ResultStats;
  error: Errores = {} as Errores;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.obtenerJugadores()
    });
  }

  obtenerJugadores() {
    // Llama a la API para obtener el equipo correspondiente al id
    this.miApiService.getJugadores(this.idEquipo()).subscribe({
      next: (data: IJugadores) => {
        if (data.isSuccess == false) {
          this.error.errorMessages = data.errorMessages;
          this.error.statusCode = data.statusCode;
          console.error(this.error);
        }
        this.jugadores = data.result;
        console.log(this.jugadores);

      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
  }

  obtenerStatsJugadores(idJugador: number){
    this.miApiService.getJugadorStats(this.idEquipo()).subscribe({
      next: (data: IJugadoresStats) => {
        if (data.isSuccess == false) {
          this.error.errorMessages = data.errorMessages;
          this.error.statusCode = data.statusCode;
          console.error(this.error);
        }
        this.jugadorStats = data.result;
        console.log(this.jugadores);

      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
  }
  idEquipo(): number{
    // Obtén el id del equipo desde los parámetros de la ruta
    const idEquipoParam = this.route.snapshot.paramMap.get('id');
    const idEquipo = idEquipoParam ? +idEquipoParam : 0;
    return idEquipo;
  }
}
