import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'

import { environment } from "src/environments/environment";
import { employeesMock } from "./employees.mock";
import { EmployeesDTO } from "./dashboard-list/dto/employees.dto";
import { CreateEmployeeDTO } from "./create-employee/dto/create-employee.dto";

@Injectable({providedIn: 'root'})
export class DasboardService {

    private employeeState;

    constructor(
        private http: HttpClient
    ){
        this.employeeState = employeesMock;
    }

    getEmployees(): EmployeesDTO[]{
        // Este seria o retorno com um serviço real
        // const url = environment.url + environment.extensions.getEmployees;
        // return this.http.get(url);

        return this.employeeState;
    }

    postEmployee(body: CreateEmployeeDTO){
        // const url = environment.url + environment.extensions.postEmployee;
        // return this.http.post(url, body);
        const id = this.employeeState[this.employeeState.length - 1].id;
        const newEmployee = {id:id+1, ...body}

        this.employeeState.push(newEmployee);
        
    }

    deleteEmployee(employee: EmployeesDTO){
        // const url = environment.url + environment.extensions.deleteEmployee + `${employee.id}`;
        // return this.http.delete(url);
        const index = this.employeeState.findIndex(obj => obj.id == employee.id);
        this.employeeState.splice(index,1);
        return this.employeeState;
    }
}