import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'

import { environment } from "src/environments/environment";
import { employeesMock } from "./employees.mock";

@Injectable({providedIn: 'root'})
export class DasboardService {

    constructor(
        private http: HttpClient
    ){}

    getEmployees(){
        // Este seria o retorno com um serviço real
        // const url = environment.url + environment.extensions.getEmployees;
        // return this.http.get(url);
        console.log('chamou service')
        return employeesMock;
    }
}