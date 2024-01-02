import { Component, OnInit } from '@angular/core';
import { MiAPiServiceService } from '../../services/mi-api.service';
import {IEquipoStats} from '../../models/equipoStats.model';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private miApiService: MiAPiServiceService) {}

  equipoStats: IEquipoStats = {
    statusCode: 0,
    isSuccess: false,
    errorMessages: null,
    result: {
      golesAnotados: 0,
      golesRecibidos: 0,
      golesDiferencia: 0,
      amarillas: 0,
      rojas: 0,
      partidosJugados: 0,
      partidosGanados: 0,
      partidosEmpatados: 0,
      partidosPerdidos: 0
    }
  };
  puntosGanados: number = 0;
  puntos: number = 0;

  ngOnInit(): void {
    this.miApiService.getTeamStats(1).subscribe({
      next: (data: IEquipoStats) => {
        this.equipoStats = data;

        this.puntosGanados = this.equipoStats.result.partidosGanados * 3;
        this.puntos = this.puntosGanados + this.equipoStats.result.partidosEmpatados;
      },
      error: (error: any) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    });
  }
}
