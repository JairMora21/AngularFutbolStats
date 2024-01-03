import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  //Limite de datos para las estadisticas de los TOP goleadores, partidos jugados y tarjetas
  limiteDatos: number = 2;

  // BehaviorSubject que almacena el valor actual de la temporada con un valor inicial de 0.
  private temporadaIdSubject = new BehaviorSubject<number>(0);

  // Observable público para que los componentes puedan suscribirse a cambios en el valor de la temporada.
  public temporadaId$: Observable<number> = this.temporadaIdSubject.asObservable();

  // Método para actualizar el valor de la temporada.
  setTemporadaId(id: number): void {
    this.temporadaIdSubject.next(id);
  }

  // Método para obtener el valor actual de la temporada.
  getTemporadaId(): number {
    return this.temporadaIdSubject.value;
  }
}
