import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardListComponent } from "./dashboard-list/dashboard-list.component";
import { HeaderComponent } from "./header/header.component";
import { MenuComponent } from "./menu/menu.component";
import { UserMenuComponent } from "./user-menu/user-menu.component";

@NgModule({
    declarations: [
        HeaderComponent,
        MenuComponent,
        UserMenuComponent,
        DashboardListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports:[
        HeaderComponent
    ]
})
export class DashboardModule {}