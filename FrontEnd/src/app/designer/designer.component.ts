import {Component, Input, ViewChild, ElementRef, Renderer} from '@angular/core';
import {Canvas} from '../Classes/canvas'
import {GUI} from '../Classes/gui'
import {ColorPickerService} from 'angular2-color-picker';

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

    //Gui Functionality
  public newCanvas(){
      let can = new Canvas(this.renderer);
      can.gui = this.gui;
      this.canvasArr.push(can);
      this.activeCanvas = this.canvasArr[this.canvasArr.length -1];
  }
  public refreshGui(){
      this.activeCanvas.setToolClass(this.gui);
  }

  public setColor(value) {
      this.gui.strokeStyle = value;
      this.refreshGui();
  }

  public changeCanvas(canvas){
      this.activeCanvas = canvas;
      canvas.gui = this.gui;
  }
  public changeLineWidth($event){
      this.gui.lineWidth = $event.target.value;
      this.refreshGui();
  }
  public changeLineCap(value){
      this.gui.lineCap = value;
      this.gui.lineJoin = value;
      this.refreshGui();
  }
  public changeTool(value){
      console.log("changeTool to:"+value);
      this.gui.tool = value;
      this.refreshGui();
  }
  public undoRedo(action) {
    if(action == 'undo') {
      this.activeCanvas.undoDrawing();
    }
    else {
      this.activeCanvas.redoDrawing();
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


}
