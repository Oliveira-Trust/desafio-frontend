import {Component, EventEmitter, Output} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { StateService } from 'src/app/shared/state.service';

import { EmployeesDTO } from '../dto/employees.dto';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html'
})
export class DeleteModalComponent {

    public employee!: EmployeesDTO | null;

    @Output() delete = new EventEmitter();
    @Output() openModal = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private stateService: StateService
    ) {

  }

  open(content: any) {
    this.openModal.emit();
    this.employee = this.stateService.getSelectedEmployee();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.delete.emit('delete');
    }, (reason) => {
        
    });
  }

}