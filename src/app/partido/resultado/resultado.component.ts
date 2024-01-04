import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPartido, Result, IPartidoStats, ResultStats } from '../../models/partido.model';
import { Errores } from '../../models/error.model';
import { MiAPiServiceService } from '../../services/mi-api.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent {

  constructor(private miApiService: MiAPiServiceService, private route: ActivatedRoute) { }

  partidos: Result[] = [];
  partidoStats: ResultStats = {} as ResultStats;
  fechaFormat: string = '';

  error: Errores = {} as Errores;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.obtenerPartidos()
    });
  }

  obtenerPartidos() {
    // Llama a la API para obtener el equipo correspondiente al id
    this.miApiService.getPartidos().subscribe({
      next: (data: IPartido) => {
        if (data.isSuccess == false) {
          this.error.errorMessages = data.errorMessages;
          this.error.statusCode = data.statusCode;
          console.error(this.error);
        }
        this.partidos = data.result;
        console.log(this.partidos)
      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
  }

  obtenerPartidoStats(idPartido: number) {
    this.miApiService.getPartidoStats(idPartido).subscribe({
      next: (data: IPartidoStats) => {
        if (data.isSuccess == false) {
          this.error.errorMessages = data.errorMessages;
          this.error.statusCode = data.statusCode;
          console.error(this.error);
        }
        this.partidoStats = data.result;
        const fechaCompleta = new Date(this.partidoStats.datosPartido.fecha);
        const mes = fechaCompleta.getMonth() + 1;
        const dia = fechaCompleta.getDate() + 1;
        const fechaFormateada = `${mes}/${dia}`;
        this.fechaFormat = fechaFormateada;
        console.log(data.result.datosPartido);

      },
      error: (error) => {
        console.error('Error al obtener el equipo', error);
      }
    });
  }
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>, idPartido: number) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
    this.obtenerPartidoStats(idPartido);
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }


}
