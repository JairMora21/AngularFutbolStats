import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITemporada, Result } from '../../models/temporada.model';
import { Errores } from '../../models/error.model';

import { MiAPiServiceService } from '../../services/mi-api.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.css']
})
export class TemporadaComponent {

  constructor(
    private miApiService: MiAPiServiceService,
    private route: ActivatedRoute,
    private data: DataService) { }

  temporadaSelect: number = 0;
  temporadas: Result[] = []
  primera: Result = {} as Result;
  errores: Errores = {} as Errores

  historica: Result = {
    id: 0,
    clasificacion: null,
    equipo: 'Histórica',
    noTemporada: 0,
    fechaInicio: new Date(),
    fechaFinal: null,
    posicion: null,
    nombreTemporada: 'Histórica'
  };
  seleccionarTemporada(event: any) {
    this.temporadaSelect = event.target.value;
    this.data.setTemporadaId(this.temporadaSelect)
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ObtenerTemporadas();
    });
  }

  idEquipo(): number {
    const idEquipoParam = this.route.snapshot.paramMap.get('id');
    const idEquipo = idEquipoParam ? +idEquipoParam : 0;
    return idEquipo;
  }
  ObtenerTemporadas() {

    this.miApiService.getTemporadas(this.idEquipo()).subscribe({
      next: (data: ITemporada) => {
        if (data.isSuccess == false) {
          this.errores.errorMessages = data.errorMessages;
          this.errores.statusCode = data.statusCode;
          console.log(this.errores);
        } else {
          this.temporadas = data.result;
          this.temporadas.push(this.historica);

        }
      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
  }
}
