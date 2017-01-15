import {Component, ViewChild, ElementRef, Renderer} from '@angular/core';
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
    public hasCtrl:boolean;


  constructor(rend: Renderer){
      this.canvasArr = [];
      this.newCanvas();
      this.renderer = rend;
      this.gui = new GUI();
      this.hasCtrl = false;
      //This is used for keyShortcuts
      this.renderer.listenGlobal('document', 'keyup', (event)=>{
          this.analyzeKey(event.key);
      });

      //This is used for displaying input
      this.renderer.listenGlobal('document', 'mousedown', (event)=>{
          this.displayVirtualInput(event);
      });
  }
    //This is used to get the Dom elem of canvas parent elem.
    @ViewChild('canvasContainer') canvasRef: ElementRef;
    @ViewChild('textInput') textInput: ElementRef;

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
  public displayVirtualInput(event:any){
      console.log(this.textInput.nativeElement.style.display);
      //first we check if user input is on the canvas
      if(this.gui.tool == 'type' && this.VirtualInCanvas(this.activeCanvas.rawCanvasObj,event.pageX,event.pageY)){
          if(this.textInput.nativeElement.style.display != 'block'){
              let left = event.pageX+ "px";
              let top = event.pageY+ "px";
              this.textInput.nativeElement.style.position = 'absolute';
              this.textInput.nativeElement.style.top = top;
              this.textInput.nativeElement.style.left = left;
              this.textInput.nativeElement.style.display = 'block';
              console.log(this.textInput.nativeElement.id);
          }
          //now we check if user is trying to click away from the input
          else{
              if(!this.VirtualInCanvas(this.textInput.nativeElement,event.pageX,event.pageY)){
                  this.hideVirtual();
              }
          }

      }
  }
  public hideVirtual(){
      if(this.textInput.nativeElement.value == ""){
          this.textInput.nativeElement.value = "New Text";
      }
      this.activeCanvas.newText(this.textInput.nativeElement.value, this.textInput.nativeElement.offsetLeft, this.textInput.nativeElement.offsetTop);
      this.textInput.nativeElement.value = "";
      this.textInput.nativeElement.style.display = 'none';
  }

  public VirtualInCanvas(rawObject:HTMLElement,x,y){
      if(rawObject.offsetLeft <= x && x <=
          (rawObject.offsetLeft+rawObject.offsetWidth)
          && rawObject.offsetTop <= y
          && y <= (rawObject.offsetTop+rawObject.offsetHeight)){
          return true;
      }
      return false;
  }
  public doneTyping(){
      console.log("done typing");
  }
  public analyzeKey(key){
      if(this.gui.tool == 'type' && this.textInput.nativeElement.style.display == 'block'){
          if(key.toLowerCase() == 'enter'){
              this.hideVirtual();
          }
          return;
      }
      switch (key.toLowerCase()){
          case "s":
              this.changeTool('select');
              break;
          case "b":
              this.changeTool('pen');
              break;
          case "r":
              this.changeTool('square');
              break;
          case "c":
              this.changeTool('circle');
              break;
          case "l":
              this.changeTool('line');
              break;
          case "t":
              this.changeTool('type');
              break;
          case "e":
              this.changeTool('eraser');
              break;
          case "z":
              if(this.hasCtrl){
                  this.hasCtrl = false;
                  this.undoRedo('undo');
              }
              break;
          case "y":
              if(this.hasCtrl){
                  this.hasCtrl = false;
                  this.undoRedo('redo');
              }
              break;
          case "a":
              this.newCanvas();
          case "control":
              this.hasCtrl = true;
      }
  }


}
