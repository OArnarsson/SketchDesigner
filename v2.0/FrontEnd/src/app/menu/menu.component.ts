import { Component, OnInit } from '@angular/core';
import { ManipulatorService } from '../manipulator/manipulator.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
    public itemList: any[];
    public errorMsg: any;

    constructor(private http: ManipulatorService) {
        this.itemList = [];
    }

    ngOnInit() {
        this.http.getAllwSpaces()
            .subscribe(
            wSpace => this.itemList = wSpace,
            error => this.errorMsg = <any>error);
    }
}


//this.itemList.push(wSpace)