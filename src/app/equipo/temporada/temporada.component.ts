import { Component, OnInit } from '@angular/core';
import {ITemporada, Result, Errores} from '../../models/temporada.model';
import {MiAPiServiceService} from '../../services/mi-api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.css']
})
export class TemporadaComponent {

  constructor(
    private miApiService: MiAPiServiceService,
    private router: Router,
    private route: ActivatedRoute) {}

    temporadas: Result[] = []

    errores: Errores= {
      errorMessages : 0,
      statusCode: 0
    };

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.ObtenerTemporadas();
      });
    }

    ObtenerTemporadas(){
    const idEquipoParam = this.route.snapshot.paramMap.get('id');
    const idEquipo = idEquipoParam ? +idEquipoParam : 0;
    // Llama a la API para obtener el equipo correspondiente al id
    this.miApiService.getTemporadas(idEquipo).subscribe({
      next: (data: ITemporada) => {
        if(data.isSuccess == false){
          this.errores.errorMessages = data.errorMessages;
          this.errores.statusCode = data.statusCode;
          console.log(this.errores);
        } else {
          this.temporadas = data.result;
        }
      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
    }
}
