import { Component } from '@angular/core';
import {DesignerService} from "./designer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app works!';
  designs: any[];
  public sideMenu:boolean;

  constructor(private designerService: DesignerService){
      this.sideMenu = false;
  }

    public toggleSideMenu(){
        this.sideMenu = !this.sideMenu;
    }
    public setSideMenuOff(){
        this.sideMenu = false;
    }

    ngOnInit() {
      //this.designerService.getAllDesigns().subscribe(designs => {
       // this.designs = designs;
      //})
    }
}
