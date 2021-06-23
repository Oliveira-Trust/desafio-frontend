import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import {DecimalPipe} from '@angular/common';
import { Observable } from "rxjs";
import { DasboardService } from "../dashboard.service";
import { EmployeesService } from "./directives/sort.service";
import { NgbdSortableHeader, SortColumn, SortDirection, SortEvent } from "./directives/sortable.directive";
import { EmployeesDTO } from "./dto/employees.dto";

@Component({
    selector: 'app-dashboard-list',
    templateUrl: './dashboard-list.component.html',
    styleUrls: ['dashboard-list.component.scss'],
    providers: [EmployeesService]
})
export class DashboardListComponent implements OnInit{

    public employeesList: Observable<EmployeesDTO[]>;
    public total: Observable<number>;

    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

    constructor(
        private dashboardService: DasboardService,
        public employeeSortService: EmployeesService
    ){ 
        this.employeesList = employeeSortService.getEmployees;
        this.total = employeeSortService.getTotal;
        console.log(this.employeesList)
        
    }

    ngOnInit(){}

    onSort({column, direction}: SortEvent) {
        console.log(column, direction)
        // resetting other headers
        this.headers.forEach(header => {
          if (header.sortable !== column) {
            header.direction = '';
          }
        });
    
        this.employeeSortService.sortColumn = column;
        this.employeeSortService.sortDirection = direction;
      }

      
}