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
    public subscription: any;

    constructor(private http: ManipulatorService) {
        this.itemList = [];
        this.doubleCheck(); //Re-Subscribe but with delay.
    }

    ngOnInit() {
        this.subscription = this.http.getAllwSpaces()
            .subscribe(
            wSpace => this.itemList = wSpace,
            error => this.errorMsg = <any>error);
    }
    doubleCheck(){
        let that = this;
        setTimeout(function(){
            that.subscription = that.http.getAllwSpaces()
                .subscribe(
                    wSpace => that.itemList = wSpace,
                    error => that.errorMsg = <any>error);
        }, 1000);
    }
}
