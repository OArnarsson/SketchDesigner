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
    public activeCanvas:Canvas;

  constructor(rend: Renderer){
      this.canvasArr = [];
      this.NewCanvas();
      this.renderer = rend;

  }
    //This is used to get the Dom elem of canvas parent elem.
    @ViewChild('canvasContainer') canvasRef: ElementRef;

    ngAfterViewInit() {
        this.refreshCanvasObject();
        //http://stackoverflow.com/questions/37421007/how-viewchild-can-get-elements-that-added-with-js-in-angular2
    };

    //LifeCycleHook, detects when a new canvas object has been created.
    ngAfterViewChecked() {
        this.refreshCanvasObject();
    };

  public NewCanvas(){
      let can = new Canvas(this.renderer);
      this.canvasArr.push(can);
      this.activeCanvas = this.canvasArr[0];
  }

  public refreshCanvasObject(){
      let i = 0;
      for(let child of this.canvasRef.nativeElement.children){
          this.canvasArr[i].rawCanvasObj = child;
          this.canvasArr[i].renderContext = child.getContext("2d");
          this.canvasArr[i].prepareCanvas();
          i++;
      }
  }

  public changeCanvas(canvas){
      this.activeCanvas = canvas;
  }
}
