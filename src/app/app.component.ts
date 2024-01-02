import { Component, OnInit} from '@angular/core';
import {IEquipos, Result} from '../app/models/equipos.model';
import {MiAPiServiceService} from '../app/services/mi-api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Futbol Stats';

  equipoSeleccionado: number = 0;

  resultadosEquipos: Result[] = [];

constructor(private miApiService: MiAPiServiceService, private router: Router) {}

ngOnInit() {
  this.obtenerEquipos();
}

obtenerEquipos() {
  this.miApiService.getTeams().subscribe({
    next: (data: IEquipos) => {
      this.resultadosEquipos = data.result;
    },
    error: (error) => {
      console.error('Error al obtener equipos', error);
    }
  });
}
  EquipoSelect(idEquipo: number) {
    this.equipoSeleccionado = idEquipo;
    this.router.navigate(['/equipo', idEquipo]);
  }
}
