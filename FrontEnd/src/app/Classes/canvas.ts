import {Renderer} from '@angular/core';
import {GUI} from '../Classes/gui'
import {Drawing} from './drawing'
import {Selection} from '../Classes/selection'
export class Canvas {

  //Canvas Variables
  public rawCanvasObj: HTMLElement;
  public renderContext: CanvasRenderingContext2D;
  public class: string;
  public canvasWidth: number;
  public canvasHeight: number;
  public allDrawings: Drawing[];
  public undoneDrawings: Drawing[];
  public activeDrawing: Drawing;
  public active: boolean;
  public tempDrawing: Drawing;
  public snapGrid: boolean;
  public searchGrid: boolean;
  //Utilities
  public gui: GUI;
  private renderer: Renderer;

  constructor(rend: Renderer) {
    this.gui = new GUI();
    this.renderer = rend;
    this.class = "mobile";
    this.canvasWidth = 248.4;
    this.canvasHeight = 441.6;
    this.allDrawings = [];
    this.undoneDrawings = [];
    this.activeDrawing = new Drawing();
    this.active = false;
    this.snapGrid = false;
    this.searchGrid = true;
    this.tempDrawing = this.activeDrawing;
  }

  public mouseDown(e: any) {
    if(this.activeDrawing.tool != this.gui.tool) {
      this.setToolClass(this.gui);
    }
    this.active = true;
    this.activeDrawing.gui = this.gui;
    this.activeDrawing.tool = this.gui.tool.toString();
    var startX = e.pageX - this.rawCanvasObj.offsetLeft;
    var startY = e.pageY - this.rawCanvasObj.offsetTop;

    this.activeDrawing.startPos(startX, startY);

    if(this.gui.tool == 'select') {
      this.findDrawing(startX, startY);
    }
    else {
      if(this.activeDrawing.tool == 'pen') {
        this.activeDrawing.pushPos(startX, startY);
      }
      this.activeDrawing.endPos(startX,startY);
    }
    this.redrawCanvas();
  }

  public mouseMove(e: any) {
    var startX = e.pageX - this.rawCanvasObj.offsetLeft;
    var startY = e.pageY - this.rawCanvasObj.offsetTop;

    if(this.active) {
      if (this.gui.tool == 'select') {
        if (this.activeDrawing.found) {
          this.activeDrawing.movePos((startX - this.activeDrawing.startX), (startY - this.activeDrawing.startY))
          this.activeDrawing.startPos(startX, startY);
        }
      }

      else {
        if (this.activeDrawing.tool == 'pen') {
          this.activeDrawing.pushPos(startX, startY);
          this.activeDrawing.setBoxSize(startX, startY);
        }
        else {
          this.activeDrawing.endPos(startX, startY);
        }
      }
    }

    this.redrawCanvas();
  }

  public mouseUp() {
    this.active = false;
    this.activeDrawing.gui = JSON.parse(this.getGUI());
    this.activeDrawing.selection = new Selection(this.activeDrawing.tool, this.activeDrawing.startX, this.activeDrawing.startY, this.activeDrawing.endX, this.activeDrawing.endY);
    console.log(this.activeDrawing);
    this.allDrawings.push(this.activeDrawing);

    if (this.activeDrawing.tool == 'select') {
      this.allDrawings.push(this.tempDrawing);
      this.tempDrawing = new Drawing();
      this.activeDrawing.found = false;
    }
    else {
      this.activeDrawing = new Drawing();
    }
  }

  public getGUI(){
    return JSON.stringify(this.gui);
  }

  public setCursor(){
      var tool = this.gui.tool;
      this.rawCanvasObj.style.cursor = "default";
      if(tool == 'square' || tool == 'circle' || tool == 'line'){
          this.rawCanvasObj.style.cursor = 'crosshair';
      }
      if(tool == 'text'){
          this.rawCanvasObj.style.cursor = 'text';
      }
  }

  public setToolClass(gui:GUI){
     this.gui = gui;
     this.activeDrawing = new Drawing();
      if(gui.tool == "select"){
          this.activeDrawing = new Drawing();
      }
      this.activeDrawing.gui = this.gui;
      this.setCursor();
      this.redrawCanvas();
  }

  //Clears Canvas
  public clearCanvas() {
    this.renderContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  //Renders the whole drawing
  public redrawCanvas() {
    this.clearCanvas();
    for(let drawing of this.allDrawings) {
      this.renderContext.beginPath();

      this.drawObject(drawing, false);

      this.renderContext.stroke();
      this.renderContext.closePath();
    }

    if(this.gui.tool == 'select'){
        this.MoveObject();
        this.drawSelect();
    }
    else {
      this.drawObject(this.activeDrawing, true);
    }
  }

  public drawObject(drawing: Drawing, isLive) {
    this.renderContext.lineWidth = drawing.gui.lineWidth;
    this.renderContext.lineCap = drawing.gui.lineCap;
    this.renderContext.strokeStyle = drawing.gui.strokeStyle;

    if(isLive) {
      this.renderContext.beginPath();
    }

    if(drawing.tool == 'pen') {
      this.renderContext.moveTo(drawing.posX[0], drawing.posY[0]);
      for (var i = 0; i < drawing.posX.length; i++) {
        this.renderContext.lineTo(drawing.posX[i], drawing.posY[i]);
      }
    }

    if(drawing.tool == 'square') {
      this.renderContext.strokeRect(drawing.startX, drawing.startY, drawing.endX, drawing.endY);
    }

    if(drawing.tool == 'circle') {
      this.renderContext.moveTo(drawing.startX, drawing.startY + (drawing.endY - drawing.startY) / 2);
      this.renderContext.bezierCurveTo(drawing.startX, drawing.startY, drawing.endX, drawing.startY, drawing.endX, drawing.startY + (drawing.endY - drawing.startY) / 2);
      this.renderContext.bezierCurveTo(drawing.endX, drawing.endY, drawing.startX, drawing.endY, drawing.startX, drawing.startY + (drawing.endY - drawing.startY) / 2);
    }

    if(drawing.tool == 'line') {
      this.renderContext.moveTo(drawing.startX, drawing.startY);
      this.renderContext.lineTo(drawing.endX, drawing.endY);
    }

    if(drawing.tool == 'text') {
      if(drawing.value == null){
        return;
      }
      this.renderContext.font = drawing.gui.fontSize+"px "+drawing.gui.font;
      this.renderContext.fillStyle = drawing.gui.strokeStyle;
      this.renderContext.fillText(drawing.value,drawing.startX,drawing.startY);
    }

    if(isLive) {
      this.renderContext.stroke();
      this.renderContext.closePath();
    }
  }

  public drawSelect(){
      var padding = 4;
      var tool = this.tempDrawing.gui.tool;
      if(tool == "square"){
          this.drawObject(this.tempDrawing, true);
          this.drawSelectBorder();
          this.renderContext.strokeRect(this.tempDrawing.startX-padding, this.tempDrawing.startY-padding, this.tempDrawing.endX+(padding*2), this.tempDrawing.endY+(padding*2));

      }
      if(tool == "text"){
          this.drawObject(this.tempDrawing, true);

          this.drawSelectBorder();
          let StartY = this.tempDrawing.startY - this.tempDrawing.gui.fontSize;
          this.renderContext.strokeRect(this.tempDrawing.startX-padding, StartY-padding, this.tempDrawing.endX+(padding*2), this.tempDrawing.endY+(padding*2));

      }
      else{
        this.drawObject(this.tempDrawing, true);
          this.drawSelectBorder();
          this.renderContext.strokeRect(this.tempDrawing.startX-padding, this.tempDrawing.startY-padding, (this.tempDrawing.endX-this.tempDrawing.startX)+(padding*2), (this.tempDrawing.endY-this.tempDrawing.startY)+(padding*2));
          //this.tagGrid();
      }
  }

  public MoveObject(){
    this.tempDrawing.startPos(this.tempDrawing.startX + this.activeDrawing.moveXby, this.tempDrawing.startY + this.activeDrawing.moveYby);
    this.tempDrawing.endPos(this.tempDrawing.endX + this.activeDrawing.moveXby, this.tempDrawing.endY + this.activeDrawing.moveYby);
    this.tempDrawing.selection.movePos(this.activeDrawing.moveXby, this.activeDrawing.moveYby);

    if(this.tempDrawing.gui.tool == 'pen') {
      for (var i = 0; i < this.tempDrawing.posX.length; i++) {
        this.tempDrawing.posX[i] = this.tempDrawing.posX[i] + this.activeDrawing.moveXby;
        this.tempDrawing.posY[i] = this.tempDrawing.posY[i] + this.activeDrawing.moveYby;
      }
    }
  }

  //This renders the Border around the object, we can style it here.
  public drawSelectBorder(){
      this.renderContext.lineCap = "square";
      this.renderContext.strokeStyle = "#1492E6";
      this.renderContext.lineWidth = 1;
  }

  public tagGrid(){
      //console.log("startX"+this.tempDrawing.startX +", center"+124+", EndX:"+this.tempDrawing.startX );
      if(this.searchGrid && this.tempDrawing.startX == 124 || this.tempDrawing.endX == 124){
          //console.log("found");
          this.drawSelectBorder();
          this.renderContext.beginPath();
          this.renderContext.moveTo(124, 0);
          this.renderContext.lineTo(124, this.canvasHeight);
          this.renderContext.stroke();
          this.snapGrid = true;
          this.searchGrid = false;
      }
  }

  public findDrawing(xCord, yCord){
    for(let x=0; x< this.allDrawings.length; x++){
      console.log(this.allDrawings[x]);
      var selection = this.allDrawings[x].selection;
      if( selection.lowX <= xCord && xCord <= selection.highX && selection.lowY <= yCord && yCord <= selection.highY ) {
        this.tempDrawing = this.allDrawings[x];
        this.undoneDrawings.push(this.allDrawings[x]);
        this.allDrawings.splice(x, 1);
        this.activeDrawing.found = true;
        this.rawCanvasObj.style.cursor = 'move';
        return;
      }
    }
    this.rawCanvasObj.style.cursor = 'default';
  }

  public newText(value,xPos, yPos){
        this.activeDrawing = new Drawing();
        let paddingX = 5; //This works for the default font settings in gui
        let paddingY = 8; //It makes the text from input field appear in the same pos on canvas
        this.activeDrawing.tool = "text";
        this.activeDrawing.gui = this.gui;
        this.activeDrawing.startPos(paddingX+xPos-this.rawCanvasObj.offsetLeft, paddingY+yPos-this.rawCanvasObj.offsetTop+this.activeDrawing.gui.fontSize);
        this.activeDrawing.endPos(value.length + (value.length*(this.activeDrawing.gui.fontSize/2)), paddingY + this.activeDrawing.gui.fontSize);
        this.activeDrawing.endX = value.length + (value.length*(this.activeDrawing.gui.fontSize/2));
        this.activeDrawing.endY = paddingY + this.activeDrawing.gui.fontSize;
        if(value == null){
            value = ""
        }
        this.activeDrawing.value = value;
        this.allDrawings.push(JSON.parse(JSON.stringify(this.activeDrawing)));
        this.drawObject(this.activeDrawing, true);
        this.active = false;
    }

  public undoDrawing() {
    if(this.allDrawings.length > 0) {
      this.undoneDrawings.push(this.allDrawings.pop());
    }
    this.redrawCanvas();
  }

  public redoDrawing() {
    if(this.undoneDrawings.length > 0) {
      this.allDrawings.push(this.undoneDrawings.pop());
    }
    this.redrawCanvas();
  }

  public removeLast(){
      //First we add it to the undoneDrawings
      this.undoDrawing();
      this.redrawCanvas();
  }
}
