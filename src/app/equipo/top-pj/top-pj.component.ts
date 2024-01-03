import { Component, OnInit, Output } from '@angular/core';
import {ITopStats, Result} from '../../models/topStats.model';
import {Errores} from '../../models/error.model';

import {MiAPiServiceService} from '../../services/mi-api.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-pj',
  templateUrl: './top-pj.component.html',
  styleUrls: ['./top-pj.component.css','../equipo.component.css']
})
export class TopPJComponent {

  constructor(
    private miApiService: MiAPiServiceService,
    private route: ActivatedRoute,
    private data: DataService ) {}

    TopPartidosLimit: Result[] = []
    TopPartidos: Result[] = []


    errores: Errores= { } as Errores

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.ObtenerTopPartidosJugados(null)
        this.ObtenerTopPartidosJugados(this.data.limiteDatos)
      });
    }
    ObtenerTopPartidosJugados(limite: number | null){
      this.miApiService.getTopPartidos(this.idEquipo(), limite).subscribe({
        next: (data: ITopStats) => {
          if (data.isSuccess == false) {
            this.errores.errorMessages = data.errorMessages;
            this.errores.statusCode = data.statusCode;
            console.log(this.errores);
          }
          else if (limite == null){
            this.TopPartidos = data.result;
          } else {
            this.TopPartidosLimit = data.result;

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
