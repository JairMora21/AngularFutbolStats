import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private temporadaIdSubject = new BehaviorSubject<number>(0);
  temporadaId$ = this.temporadaIdSubject.asObservable();

  setTemporadaId(id: number) {
    this.temporadaIdSubject.next(id);
  }

  getTemporadaId(): number {
    return this.temporadaIdSubject.value;
  }
}
