import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit{

    public tab = 0;
    @Output() emitTab = new EventEmitter


    ngOnInit(){}

    selectTab(tab: number){
        this.tab = tab;
        this.emitTab.emit(tab);
    }
}