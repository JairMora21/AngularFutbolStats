import { Component, OnInit} from '@angular/core';
import {IEquipos, Result} from '../app/models/equipos.model';
import {Errores} from '../app/models/error.model';
import {MiAPiServiceService} from '../app/services/mi-api.service';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { IUltimaTemporada } from './models/temporada.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Futbol Stats';

  equipoSeleccionado: number = 0;

  resultadosEquipos: Result[] = [];
  error : Errores = {} as Errores;

constructor(private miApiService: MiAPiServiceService,
   private router: Router,
   private data: DataService) {}

ngOnInit(): void {
  this.obtenerEquipos();
}

obtenerEquipos() {
  this.miApiService.getTeams().subscribe({
    next: (data: IEquipos) => {
      if(data.isSuccess == false){
        this.error.errorMessages = data.errorMessages;
        this.error.statusCode = data.statusCode;
        console.log(this.error);
      } else {
        this.resultadosEquipos = data.result;
      }
    },
    error: (error) => {
      console.error('Error al obtener equipos', error);
    }
  });
}
  EquipoSelect(idEquipo: number) {
    this.equipoSeleccionado = idEquipo;
    this.router.navigate(['/equipo', idEquipo]);
    this.ObtenerUltimaTemporada(idEquipo);
  }

    ObtenerUltimaTemporada(idEquipo: number) {
    this.miApiService.getUltimaTemporadas(idEquipo).subscribe({
      next: (data: IUltimaTemporada) => {
        if (data.isSuccess == false) {
          this.error.errorMessages = data.errorMessages;
          this.error.statusCode = data.statusCode;
          console.log(this.error);
        } else {
          this.data.setTemporadaId(data.result.id);
          console.log('IdTemporada '+data.result.id);

        }
      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      },
    });
  }
}
