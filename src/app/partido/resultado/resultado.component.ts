import { Component } from '@angular/core';
import { ModalService } from './modal-service.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent {

  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.openModal();
  }
}
