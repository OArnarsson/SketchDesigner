import {Component, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import {Canvas} from '../Classes/canvas'

@Component({
  selector: 'app-designer',
  templateUrl: 'designer.component.html',
  styleUrls: ['./designer.component.sass']
})

export class DesignerComponent {
    private renderer:Renderer;
    public canvasArr:Canvas[];
    public sketchCanvas:any;

  constructor(rend: Renderer){
      this.canvasArr = [];
      this.mockCanvas();
      this.renderer = rend;
  }
    ngAfterViewInit() {
        console.log();
        //http://stackoverflow.com/questions/37421007/how-viewchild-can-get-elements-that-added-with-js-in-angular2


    };

  public mockCanvas(){
      let can = new Canvas(this.renderer);
      this.canvasArr.push(can);
  }
}
