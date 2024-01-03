import { Component, OnInit } from '@angular/core';
import {IEquipo, Result} from '../../models/equipos.model';
import {Errores} from '../../models/error.model';
import {MiAPiServiceService} from '../../services/mi-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-info-equipo',
  templateUrl: './info-equipo.component.html',
  styleUrls: ['./info-equipo.component.css']
})
export class InfoEquipoComponent {

  constructor(private miApiService: MiAPiServiceService, private route: ActivatedRoute) {}

  equipo: Result = {} as Result;
  error: Errores = {} as Errores;

 ngOnInit() {
    this.route.params.subscribe(params => {
      // Llama a obtenerEquipo() cuando cambian los parámetros de la ruta
      this.obtenerEquipo();
    });
  }

  idEquipo(): number{
    // Obtén el id del equipo desde los parámetros de la ruta
    const idEquipoParam = this.route.snapshot.paramMap.get('id');
    const idEquipo = idEquipoParam ? +idEquipoParam : 0;
    return idEquipo;
  }
  obtenerEquipo() {
    // Llama a la API para obtener el equipo correspondiente al id
    this.miApiService.getTeam(this.idEquipo()).subscribe({
      next: (data: IEquipo) => {
        if (data.isSuccess == false) {
          this.error.errorMessages = data.errorMessages;
          this.error.statusCode = data.statusCode;
          console.log(this.error);
        }
        this.equipo = data.result;
      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
  }

}
