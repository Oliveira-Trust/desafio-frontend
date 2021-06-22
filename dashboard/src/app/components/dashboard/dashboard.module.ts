import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
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
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports:[
        HeaderComponent,
        MenuComponent,
        UserMenuComponent,
        DashboardListComponent
    ]
})
export class DashboardModule {}