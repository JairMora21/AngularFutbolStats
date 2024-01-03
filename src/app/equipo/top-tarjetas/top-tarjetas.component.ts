import { Component, OnInit, Output } from '@angular/core';
import {ITopStatsCards, ResultCards} from '../../models/topStats.model';
import {Errores} from '../../models/error.model';

import {MiAPiServiceService} from '../../services/mi-api.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-tarjetas',
  templateUrl: './top-tarjetas.component.html',
  styleUrls: ['./top-tarjetas.component.css', '../equipo.component.css']
})
export class TopTarjetasComponent {

  constructor(
    private miApiService: MiAPiServiceService,
    private route: ActivatedRoute,
    private data: DataService ) {}

    TopTarjetasLimit: ResultCards[] = []
    TopTarjetas: ResultCards[] = []


    errores: Errores= { } as Errores

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.ObtenerTopTarjetas(null)
        this.ObtenerTopTarjetas(this.data.limiteDatos)
      });
    }

    ObtenerTopTarjetas(limite: number | null){
      this.miApiService.getTopTarjetas(this.idEquipo(), limite).subscribe({
        next: (data: ITopStatsCards) => {
          if (data.isSuccess == false) {
            this.errores.errorMessages = data.errorMessages;
            this.errores.statusCode = data.statusCode;
            console.log(this.errores);
          }
          else if (limite == null){
            this.TopTarjetas = data.result;
          } else {
            this.TopTarjetasLimit = data.result;

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
