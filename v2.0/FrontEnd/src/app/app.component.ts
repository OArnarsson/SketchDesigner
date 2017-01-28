import { Component, ViewEncapsulation  } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public hiddenSideBar:boolean;
    public hiddenDropDown:boolean;
    public theme: string;
    constructor(){
        this.hiddenSideBar = true;
        this.hiddenDropDown = true;
        this.theme = 'Dark';
    }

    toggleLeftSidebar(){

        this.hiddenSideBar = !this.hiddenSideBar;
    }
    toggleDropDown(){
        this.hiddenDropDown = !this.hiddenDropDown;
    }
    setTheme(theme){
        this.theme = theme;
        this.hiddenDropDown = true;
    }
    hideSection(input){
        if(input == 'dropDown'){
            this.hiddenDropDown = true;
        }
        else{
            this.hiddenSideBar = true;
        }
    }
}
