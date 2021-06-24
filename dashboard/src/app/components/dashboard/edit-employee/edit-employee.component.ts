import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StateService } from "src/app/shared/state.service";

import { DasboardService } from "../dashboard.service";

@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
    public form!: FormGroup;
    public submitted: boolean = false;

    @Output() openModal = new EventEmitter()

  constructor(
    private modalService: NgbModal, 
    private fb: FormBuilder,
    private dashboardService: DasboardService,
    private stateService: StateService
    ) {
    this.createForm();

  }

  createForm(){
    this.form = this.fb.group({
        id: ['', Validators.required],
        name:['', Validators.required],
        surname: ['', Validators.required],
        position: ['', Validators.required],
        departament: ['', Validators.required],
        date:['', [Validators.required]]
    })
  }

  formPopulate(){
      const selectedEmployee = this.stateService.getSelectedEmployee();
      const controls = this.form.controls;
    console.log(selectedEmployee)
      if(selectedEmployee != null){
        controls.id.patchValue(selectedEmployee.id);
        controls.name.patchValue(selectedEmployee.name);
        controls.surname.patchValue(selectedEmployee.surname);
        controls.position.patchValue(selectedEmployee.position);
        controls.departament.patchValue(selectedEmployee.departament);

        const date = selectedEmployee.date.split('/').reverse().join('-');
        controls.date.patchValue(date);
      }
  }

  saveEmployee(){
    this.submitted = true;
    if(this.form.valid) { console.log(this.form.value)
      this.dashboardService.postEmployee(this.form.value)
      this.modalService.dismissAll();
    }
  }

  resetForm() {
    this.submitted = false;
    this.createForm();
  }

  open(content: any) {
      this.openModal.emit();
      this.formPopulate();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.resetForm();
    }, (reason) => {
      this.resetForm();
    });
  }


}