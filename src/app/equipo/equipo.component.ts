import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {

  idTemporada: number = 0;

  temporadaRecibida($event: number){
    this.idTemporada = $event;
  }
}
