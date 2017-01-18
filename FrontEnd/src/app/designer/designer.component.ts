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
    public clipboard:any;


  constructor(rend: Renderer){
      this.canvasArr = [];
      this.newCanvas();
      this.renderer = rend;
      this.gui = new GUI();
      this.clipboard = null;
      //This is used for keyShortcuts
      this.renderer.listenGlobal('document', 'keydown', (event)=>{
          this.analyzeKey(event);
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
  public displayFill(tool){
      if(tool != 'text' && tool != 'line'){
          return true;
      }
      return false;
  }
    public displayBorder(tool){
        if(tool != 'text'){
            return true;
        }
        return false;
    }
    public displayBrushStyle(tool){
        if(tool == 'pen' || tool == 'line'){
            return true;
        }
        return false;
    }
    public displayTextMenu(tool){
        if(tool == 'text' ){
            return true;
        }
        return false;
    }

  public getFaIconClass(bully){
      if(bully){
          return "fa fa-check-square";
      }
      else{
          return "fa fa-square-o";
      }
  }
  public toogleHasColor(val){
      if(val == 'fill'){
          this.gui.hasFill = ! this.gui.hasFill;
          this.activeCanvas.activeDrawing.gui.hasFill= !this.activeCanvas.activeDrawing.gui.hasFill;
      }
      else{
          this.gui.hasBorder = ! this.gui.hasBorder;
        this.activeCanvas.activeDrawing.gui.hasBorder = !this.activeCanvas.activeDrawing.gui.hasBorder;
      }
      this.activeCanvas.redrawCanvas();
  }
    public toggleFontStyle(val){
        if(val == 'bold'){
            this.gui.fonty.bold = ! this.gui.fonty.bold;
            this.activeCanvas.activeDrawing.gui.fonty.bold = !this.activeCanvas.activeDrawing.gui.fonty.bold;
        }
        else{
            this.gui.fonty.italic = ! this.gui.fonty.italic;
            this.activeCanvas.activeDrawing.gui.fonty.italic = !this.activeCanvas.activeDrawing.gui.fonty.italic;
        }
        this.activeCanvas.redrawCanvas();
    }

  public setColor(value,val) {
      if(val == 'stroke'){
        this.gui.strokeStyle = value;
        this.activeCanvas.activeDrawing.gui.strokeStyle = value;
        this.activeCanvas.activeDrawing.gui.hasBorder = true;
      }
      else{
          this.gui.fillStyle = value;
          this.activeCanvas.activeDrawing.gui.fillStyle = value;
          this.activeCanvas.activeDrawing.gui.hasFill = true;
      }
      this.activeCanvas.redrawCanvas();
  }
  public changeOpacity($event){
      this.activeCanvas.activeDrawing.gui.opacity = $event.target.value;
      this.activeCanvas.redrawCanvas();
  }

  public changeCanvas(canvas){
      this.activeCanvas = canvas;
      canvas.gui = this.gui;
  }
  public changeLineWidth($event){
      this.gui.lineWidth = $event.target.value;
      this.activeCanvas.activeDrawing.gui.lineWidth = $event.target.value;
      this.activeCanvas.redrawCanvas();
  }
    public changeFontSize($event){
        this.gui.fonty.fontSize = $event.target.value;
        this.activeCanvas.activeDrawing.gui.fonty.fontSize = $event.target.value;
        this.activeCanvas.redrawCanvas();
    }

  public changeLineCap(value){
      this.activeCanvas.activeDrawing.gui.lineCap = value;
      this.activeCanvas.activeDrawing.gui.lineJoin = value;
      this.activeCanvas.redrawCanvas();
  }
  public changeTool(value){
      if(value != "text"){
          this.textInput.nativeElement.style.display = 'none';
      }
      this.gui.tool = value;
      this.refreshGui();
  }
  public changeFontFamily(value){
      this.activeCanvas.gui.fonty.font = value;
      this.activeCanvas.activeDrawing.gui.fonty.font = value;
      this.activeCanvas.redrawCanvas();
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
      if(this.gui.tool == 'text' && this.VirtualInCanvas(this.activeCanvas.rawCanvasObj,event.pageX,event.pageY)){
          if(this.textInput.nativeElement.style.display != 'block'){
              let left = event.pageX+ "px";
              let top = event.pageY+ "px";
              this.textInput.nativeElement.style.position = 'absolute';
              this.textInput.nativeElement.style.top = top;
              this.textInput.nativeElement.style.left = left;
              this.textInput.nativeElement.style.display = 'block';
              this.textInput.nativeElement.style.color = this.activeCanvas.gui.strokeStyle;
              this.textInput.nativeElement.style.font = this.activeCanvas.gui.fonty.font;
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

  public deleteDrawing() {
    if(this.gui.tool == 'select'){
      if(this.activeCanvas.allDrawings[this.activeCanvas.allDrawings.length-1].startX != null){
        this.activeCanvas.removeLast();
      }
    }
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
  public analyzeKey(event:any){
      let key = event.key;
      if(this.gui.tool == 'text' && this.textInput.nativeElement.style.display == 'block'){
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
              if(!event.ctrlKey){
                  this.changeTool('circle');
              }
              else{
                  if(this.gui.tool == 'select'){
                      if(this.activeCanvas.allDrawings[this.activeCanvas.allDrawings.length-1].startX != null){
                          this.clipboard = this.activeCanvas.allDrawings[this.activeCanvas.allDrawings.length-1];
                      }
                  }
              }
              break;
          case "v":
              if(event.ctrlKey && this.clipboard != null){
                  this.activeCanvas.allDrawings.push(JSON.parse(JSON.stringify(this.clipboard)));
                  this.activeCanvas.redrawCanvas();
              }
              break;
          case "delete":
              this.deleteDrawing();
              break
          case "l":
              this.changeTool('line');
              break;
          case "t":
              this.changeTool('text');
              break;
          case "e":
              this.changeTool('eraser');
              break;
          case "z":
              if(event.ctrlKey){
                  this.undoRedo('undo');
              }
              break;
          case "y":
              if(event.ctrlKey){
                  this.undoRedo('redo');
              }
              break;
          case "a":
              this.newCanvas();
      }
  }


}
