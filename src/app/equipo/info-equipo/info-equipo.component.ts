import { Component, OnInit } from '@angular/core';
import {IEquipo, Result} from '../../models/equipos.model';
import {MiAPiServiceService} from '../../services/mi-api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-info-equipo',
  templateUrl: './info-equipo.component.html',
  styleUrls: ['./info-equipo.component.css']
})
export class InfoEquipoComponent {

  constructor(private miApiService: MiAPiServiceService, private router: Router, private route: ActivatedRoute) {}

  equipo: Result = {
    id: 0,
    nombre: "",
    lugar: "",
    escudo: ""
  };
 ngOnInit() {
    // Llama a obtenerEquipo() cuando se inicializa el componente
    this.obtenerEquipo();

    // Suscríbete a cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
      // Llama a obtenerEquipo() cuando cambian los parámetros de la ruta
      this.obtenerEquipo();
    });
  }

  obtenerEquipo() {
    // Obtén el id del equipo desde los parámetros de la ruta
    const idEquipoParam = this.route.snapshot.paramMap.get('id');
    const idEquipo = idEquipoParam ? +idEquipoParam : 0;

    // Llama a la API para obtener el equipo correspondiente al id
    this.miApiService.getTeam(idEquipo).subscribe({
      next: (data: IEquipo) => {
        this.equipo = data.result;
      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
  }

}
