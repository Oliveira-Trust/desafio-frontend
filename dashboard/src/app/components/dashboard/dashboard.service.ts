import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'

import { environment } from "src/environments/environment";
import { employeesMock } from "./employees.mock";
import { EmployeesDTO } from "./dashboard-list/dto/employees.dto";
import { CreateEmployeeDTO } from "./create-employee/dto/create-employee.dto";

@Injectable({providedIn: 'root'})
export class DasboardService {

    constructor(
        private http: HttpClient
    ){}

    getEmployees(): EmployeesDTO[]{
        // Este seria o retorno com um serviço real
        // const url = environment.url + environment.extensions.getEmployees;
        // return this.http.get(url);

        return employeesMock;
    }

    postEmployee(body: CreateEmployeeDTO){
        // const url = environment.url + environment.extensions.postEmployee;
        // return this.http.post(url, body);
        const id = employeesMock[employeesMock.length - 1].id;
        const newEmployee = {id:id+1, ...body}
        console.log(newEmployee)
        employeesMock.push(newEmployee);
        
    }
}