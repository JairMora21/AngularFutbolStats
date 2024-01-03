import { Component, OnInit, Output } from '@angular/core';
import {ITopStats, Result} from '../../models/topStats.model';
import {Errores} from '../../models/error.model';

import {MiAPiServiceService} from '../../services/mi-api.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-goles',
  templateUrl: './top-goles.component.html',
  styleUrls: ['./top-goles.component.css' , '../equipo.component.css']
})
export class TopGolesComponent {

  constructor(
    private miApiService: MiAPiServiceService,
    private route: ActivatedRoute,
    private data: DataService ) {}

    TopGolesLimit: Result[] = []
    TopGoles: Result[] = []


    errores: Errores= { } as Errores

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.ObtenerTopGoleadores(null)
        this.ObtenerTopGoleadores(this.data.limiteDatos)
      });
    }
    ObtenerTopGoleadores(limite: number | null){
      this.miApiService.getTopGoleadores(this.idEquipo(), limite).subscribe({
        next: (data: ITopStats) => {
          if (data.isSuccess == false) {
            this.errores.errorMessages = data.errorMessages;
            this.errores.statusCode = data.statusCode;
            console.log(this.errores);
          }
          else if (limite == null){
            this.TopGoles = data.result;
          } else {
            this.TopGolesLimit = data.result;

          }
        },
        error: (error: any) => {
          console.error('Error en la solicitud HTTP:', error);
        }
      });
    }

    idEquipo(): number{
      const idEquipoParam = this.route.snapshot.paramMap.get('id');
      const idEquipo = idEquipoParam ? +idEquipoParam : 0;
      return idEquipo;
    }
}
