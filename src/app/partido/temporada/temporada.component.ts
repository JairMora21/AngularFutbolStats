import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ITemporada, Result} from '../../models/temporada.model';
import {Errores} from '../../models/error.model';

import {MiAPiServiceService} from '../../services/mi-api.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temporada-partido',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.css']
})
export class TemporadaPartidoComponent {

  constructor(
    private miApiService: MiAPiServiceService,
    private route: ActivatedRoute,
    private data: DataService ) {}

    temporadaSelect: number = 0;

  seleccionarTemporada(event: any) {
    this.temporadaSelect = event.target.value;
    this.data.setTemporadaId(this.temporadaSelect)
  }

    temporadas: Result[] = []

    errores: Errores= { } as Errores


    ngOnInit() {
      this.route.params.subscribe(params => {
        this.ObtenerTemporadas();
      });
    }

    idEquipo(): number{
      const idEquipoParam = this.route.snapshot.paramMap.get('id');
      const idEquipo = idEquipoParam ? +idEquipoParam : 0;
      return idEquipo;
    }
    ObtenerTemporadas(){

      this.miApiService.getTemporadas(this.idEquipo()).subscribe({
      next: (data: ITemporada) => {
        if(data.isSuccess == false){
          this.errores.errorMessages = data.errorMessages;
          this.errores.statusCode = data.statusCode;
          console.log(this.errores);
        } else {
          this.temporadas = data.result.sort((a, b) => {
            return b.id - a.id;
          });
          this.temporadas = data.result;
        }
      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
    }
}
