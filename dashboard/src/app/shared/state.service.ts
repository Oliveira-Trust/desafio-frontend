import { Injectable } from "@angular/core";
import { EmployeesDTO } from "../components/dashboard/dashboard-list/dto/employees.dto";

@Injectable({providedIn: 'root'})
export class StateService {
    private selectedEmployee: EmployeesDTO | null;

    constructor(){
        this.selectedEmployee = null;
    }

    getSelectedEmployee(){
        return this.selectedEmployee;
    }

    setSelectedEmployee(employee: EmployeesDTO){
        this.selectedEmployee = employee;
    }

    clearSelectedEmployee(){
        this.selectedEmployee = null;
    }

}