import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app works!';
  public sideMenu:boolean;

  constructor(){
      this.sideMenu = false;
  }

    public toggleSideMenu(){
        this.sideMenu = !this.sideMenu;
    }
    public setSideMenuOff(){
        this.sideMenu = false;
    }
}
