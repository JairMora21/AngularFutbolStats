import { Component, OnInit } from '@angular/core';

import { MiAPiServiceService } from '../../services/mi-api.service';
import { DataService } from 'src/app/services/data.service';

import { IEquipoStats, Result } from '../../models/equipoStats.model';
import { Errores } from '../../models/error.model';

import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(
    private miApiService: MiAPiServiceService,
    private route: ActivatedRoute) { }

  equipoStats: Result = {} as Result;
  errores: Errores = {} as Errores;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ObtenerEquipoStats()
    });
  }

  idEquipo(): number {
    const idEquipoParam = this.route.snapshot.paramMap.get('id');
    const idEquipo = idEquipoParam ? +idEquipoParam : 0;
    return idEquipo;
  }

  ObtenerEquipoStats() {
    this.miApiService.getTeamStats(this.idEquipo()).subscribe({
      next: (data: IEquipoStats) => {
        if (data.isSuccess == false) {
          this.errores.errorMessages = data.errorMessages;
          this.errores.statusCode = data.statusCode;
          console.log(this.errores);
        }
        else {
          this.equipoStats = data.result;
        }
      },
      error: (error: any) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    });
  }


   // idTemporada(): number | null {
  //   const temporadaId: number | null = null;
  //   this.data.temporadaId$.subscribe((idTemporada) => {
  //     console.log('Hola desde stats: ' + idTemporada);
  //   });
  //   return temporadaId === 0 ? null : temporadaId;
  // }
}
