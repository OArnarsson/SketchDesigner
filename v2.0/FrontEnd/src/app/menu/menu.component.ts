import { Component, OnInit } from '@angular/core';
import { ManipulatorService } from '../manipulator/manipulator.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
    public itemList: any[];
    public errorMsg: any;
    public router: Router;

    constructor(private http: ManipulatorService) {
        this.itemList = [];
    }

    ngOnInit() {
        this.http.getAllwSpaces()
            .subscribe(
            wSpace => this.itemList = wSpace,
            error => this.errorMsg = <any>error);
    }

    openWorkspace(date) {
        this.router.navigateByUrl(`/${date}`);
    }

}


//this.itemList.push(wSpace)