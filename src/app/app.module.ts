import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EquipoComponent } from './equipo/equipo.component';
import { PartidoComponent } from './partido/partido.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TemporadaComponent } from './equipo/temporada/temporada.component';
import { InfoEquipoComponent } from './equipo/info-equipo/info-equipo.component';
import { StatsComponent } from './equipo/stats/stats.component';
import { TopGolesComponent } from './equipo/top-goles/top-goles.component';
import { TopPJComponent } from './equipo/top-pj/top-pj.component';
import { TopTarjetasComponent } from './equipo/top-tarjetas/top-tarjetas.component';
import { JugadorComponent } from './equipo/jugador/jugador.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipoComponent,
    PartidoComponent,
    EstadisticasComponent,
    TemporadaComponent,
    InfoEquipoComponent,
    StatsComponent,
    TopGolesComponent,
    TopPJComponent,
    TopTarjetasComponent,
    JugadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
