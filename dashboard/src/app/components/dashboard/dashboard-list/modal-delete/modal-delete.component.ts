import {Component, EventEmitter, Output} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { EmployeesDTO } from '../dto/employees.dto';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html'
})
export class DeleteModalComponent {

    @Output() delete = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.delete.emit('delete');
    }, (reason) => {
        
    });
  }

}