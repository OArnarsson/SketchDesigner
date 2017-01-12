import {Component, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import {Canvas} from '../Classes/canvas'
import {GUI} from '../Classes/gui'

@Component({
  selector: 'app-designer',
  templateUrl: 'designer.component.html',
  styleUrls: ['./designer.component.sass']
})

export class DesignerComponent {
    private renderer:Renderer;
    public canvasArr:Canvas[];
    public activeCanvas:Canvas;
    public gui:GUI;

  constructor(rend: Renderer){
      this.canvasArr = [];
      this.newCanvas();
      this.renderer = rend;
      this.gui = new GUI();
  }
    //This is used to get the Dom elem of canvas parent elem.
    @ViewChild('canvasContainer') canvasRef: ElementRef;

    ngAfterViewInit() {
        this.refreshCanvasObject();
        this.activeCanvas.gui = this.gui;
        //http://stackoverflow.com/questions/37421007/how-viewchild-can-get-elements-that-added-with-js-in-angular2
    };

    //LifeCycleHook, detects when a new canvas object has been created.
    ngAfterViewChecked() {
        this.refreshCanvasObject();
    };

  public newCanvas(){
      let can = new Canvas(this.renderer);
      this.canvasArr.push(can);
      this.activeCanvas = this.canvasArr[0];
  }

  public setColor() {
    if(this.gui.strokeStyle != 'red') {
      this.gui.strokeStyle = "red";
      this.activeCanvas.gui = this.gui;
    }
    else{
      this.gui.strokeStyle = 'black';
      this.activeCanvas.gui = this.gui;
    }
  }

  public refreshCanvasObject(){
      let i = 0;
      for(let child of this.canvasRef.nativeElement.children){
          this.canvasArr[i].rawCanvasObj = child;
          this.canvasArr[i].renderContext = child.getContext("2d");
          i++;
      }
  }

  public changeCanvas(canvas){
    this.activeCanvas = canvas;
    canvas.gui = this.gui;
  }
}
