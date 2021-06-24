import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LandingPageComponent } from "./landing-page.component";

@NgModule({
    declarations: [
        LandingPageComponent
    ],
    imports: [
        CommonModule
    ],
    exports:[
        LandingPageComponent
    ]
})
export class LandingPageModule {}