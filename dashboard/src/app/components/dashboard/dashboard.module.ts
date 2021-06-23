import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { DashboardListComponent } from "./dashboard-list/dashboard-list.component";
import { HeaderComponent } from "./header/header.component";


export const opts: Partial<IConfig> | (() => Partial<IConfig>) | null = null;
@NgModule({
    declarations: [
        HeaderComponent,
        DashboardListComponent,
        CreateEmployeeComponent,
        
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        NgbModule
    ],
    exports:[
        HeaderComponent,
        DashboardListComponent
    ]
})
export class DashboardModule {}