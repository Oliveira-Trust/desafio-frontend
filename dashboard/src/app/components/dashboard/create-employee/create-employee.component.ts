import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DasboardService } from "../dashboard.service";

@Component({
    selector:'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

    public form!: FormGroup;
    public submitted: boolean = false;

  constructor(
    private modalService: NgbModal, 
    private fb: FormBuilder,
    private dashboardService: DasboardService
    ) {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      name:['', Validators.required],
      surname: ['', Validators.required],
      position: ['', Validators.required],
      departament: ['', Validators.required],
      date:['', Validators.required]
    })
  }

  saveEmployee(){
    this.submitted = true;
    if(this.form.valid) {
      this.dashboardService.postEmployee(this.form.value)
      this.modalService.dismissAll();
    }
  }

  resetForm() {
    this.submitted = false;
    this.createForm();
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.resetForm();
    }, (reason) => {
      this.resetForm();
    });
  }



}