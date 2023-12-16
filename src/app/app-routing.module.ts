import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoComponent } from './equipo/equipo.component';
import { PartidoComponent } from './partido/partido.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  {path: 'equipo/:id', component: EquipoComponent},
  {path: 'partidos/:id', component: PartidoComponent},
  {path: 'estadisticas/:id', component: EstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
