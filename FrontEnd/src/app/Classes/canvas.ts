import {Renderer} from '@angular/core';
import {GUI} from '../Classes/gui'
import {Pen} from './pen'
import {Square} from "./square";
import {Line} from './line';
import {Circle} from './circle';
import {Select} from "./select";

export class Canvas {

  //Canvas Variables
  public rawCanvasObj: any;
  public renderContext: CanvasRenderingContext2D;
  public class: string;
  public canvasWidth: number;
  public canvasHeight: number;
  public allDrawings: any[];
  public undoneDrawings: any[];
  public activeDrawing: any;
  public active: boolean;
  public tempDrawing: any;

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
    this.activeDrawing = new Pen();
    this.active = false;
    this.tempDrawing = JSON.parse(JSON.stringify(this.activeDrawing));
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
    if(this.activeDrawing.tool == 'pen') {
      this.activeDrawing.pushPos(startX, startY);
      this.activeDrawing.startX = startX;
      this.activeDrawing.startY = startY;
      this.activeDrawing.endX = startX;
      this.activeDrawing.endY = startY;
    }

    if(this.activeDrawing.tool == 'square') {
      this.activeDrawing.startPos(startX, startY);
    }

    if(this.activeDrawing.tool == 'line') {
      this.activeDrawing.startPos(startX, startY);
    }

    if(this.activeDrawing.tool == 'circle') {
      this.activeDrawing.startPos(startX, startY);
    }

    if(this.activeDrawing.tool == 'select') {
       this.findDrawing(startX, startY);
    }

    this.redrawSimple();
  }

  public mouseMove(e: any) {
    var startX = e.pageX - this.rawCanvasObj.offsetLeft;
    var startY = e.pageY - this.rawCanvasObj.offsetTop;

    if(this.activeDrawing.tool == 'pen' && this.active) {
      this.activeDrawing.pushPos(startX, startY);
      this.activeDrawing.setBoxSize(startX, startY);
      this.redrawSimple();
    }

    if(this.activeDrawing.tool == 'square' && this.active) {
      this.activeDrawing.endPos(startX, startY);
      this.redrawSimple();
    }

    if(this.activeDrawing.tool == 'line' && this.active) {
      this.activeDrawing.endPos(startX, startY);
      this.redrawSimple();
    }

    if(this.activeDrawing.tool == 'circle' && this.active) {
      this.activeDrawing.endPos(startX, startY);
      this.redrawSimple();
    }


  }

  public mouseUp(gui: GUI) {
    this.active = false;

    this.activeDrawing.gui = JSON.parse(this.getGUI());
    this.allDrawings.push(this.activeDrawing);

    if(this.activeDrawing.tool == 'pen') {
      this.activeDrawing = new Pen();
    }

    if(this.activeDrawing.tool == 'square') {
      this.activeDrawing = new Square();
    }

    if(this.activeDrawing.tool == 'line') {
      this.activeDrawing = new Line();
    }

    if(this.activeDrawing.tool == 'circle') {
      this.activeDrawing = new Circle();
    }

    this.redrawSimple();
  }

  public getGUI(){
    return JSON.stringify(this.gui);
  }

  public setToolClass(gui:GUI){
      this.gui = gui;
      if(gui.tool == "square"){
          this.activeDrawing = new Square();
      }
      if(gui.tool == "pen"){
          this.activeDrawing = new Pen();
      }
      if(gui.tool == "line"){
        this.activeDrawing = new Line();
      }
      if(gui.tool == "circle"){
        this.activeDrawing = new Circle();
     }
      if(gui.tool == "select"){
          this.activeDrawing = new Select(this.activeDrawing);
          this.redrawSimple();
      }
      this.activeDrawing.gui = this.gui;
  }

  //Clears Canvas
  public clearCanvas() {
    this.renderContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  //Renders the whole drawing
  public redrawSimple() {
    this.clearCanvas();

    for(let drawing of this.allDrawings) {
      if(drawing.tool == 'pen') {
        this.drawPen(drawing);
      }
      if(drawing.tool == 'square') {
        this.drawSquare(drawing);
      }
      if(drawing.tool == 'line') {
        this.drawLine(drawing);
      }
      if(drawing.tool == 'circle') {
        this.drawCircle(drawing);
      }
    }

    if(this.gui.tool == 'pen') {
      this.drawPen(this.activeDrawing);
    }
    if(this.gui.tool == 'square') {
      this.drawSquare(this.activeDrawing);
    }
    if(this.gui.tool == 'line') {
      this.drawLine(this.activeDrawing);
    }
    if(this.gui.tool == 'circle') {
      this.drawCircle(this.activeDrawing);
    }
    if(this.gui.tool == 'select'){
        this.drawSelect();
    }
  }

  public drawPen(drawing: Pen) {
    this.renderContext.lineWidth = drawing.gui.lineWidth;
    this.renderContext.lineCap = drawing.gui.lineCap;
    this.renderContext.strokeStyle = drawing.gui.strokeStyle;
    this.renderContext.beginPath();
    this.renderContext.moveTo(drawing.posX[0], drawing.posY[0]);
    for (var i = 0; i < drawing.posX.length; i++) {
      this.renderContext.lineTo(drawing.posX[i], drawing.posY[i]);
      this.renderContext.stroke();
    }
    this.renderContext.closePath();
  }

  public drawSquare(drawing: Square) {
    this.renderContext.lineWidth = drawing.gui.lineWidth;
    this.renderContext.lineCap = drawing.gui.lineCap;
    this.renderContext.strokeStyle = drawing.gui.strokeStyle;

    this.renderContext.strokeRect(drawing.startX, drawing.startY, drawing.width, drawing.height);
  }

  public drawLine(drawing: Line) {
    this.renderContext.lineWidth = drawing.gui.lineWidth;
    this.renderContext.lineCap = drawing.gui.lineCap;
    this.renderContext.strokeStyle = drawing.gui.strokeStyle;

    this.renderContext.beginPath();
    this.renderContext.moveTo(drawing.startX, drawing.startY);
    this.renderContext.lineTo(drawing.endX, drawing.endY);
    this.renderContext.stroke();
    this.renderContext.closePath();
  }

  public drawCircle(drawing: any) {
    this.renderContext.lineWidth = drawing.gui.lineWidth;
    this.renderContext.lineCap = drawing.gui.lineCap;
    this.renderContext.strokeStyle = drawing.gui.strokeStyle;

    this.renderContext.beginPath();
    this.renderContext.moveTo(drawing.startX, drawing.startY + (drawing.endY - drawing.startY) / 2);
    this.renderContext.bezierCurveTo(drawing.startX, drawing.startY, drawing.endX, drawing.startY, drawing.endX, drawing.startY + (drawing.endY - drawing.startY) / 2);
    this.renderContext.bezierCurveTo(drawing.endX, drawing.endY, drawing.startX, drawing.endY, drawing.startX, drawing.startY + (drawing.endY - drawing.startY) / 2);
    this.renderContext.closePath();
    this.renderContext.stroke();
  }


  public drawSelect(){
      var padding = 4;
      if(this.tempDrawing.gui.tool == "pen"){
          this.drawPen(this.tempDrawing);
          this.drawSelectBorder();
          this.renderContext.strokeRect(this.tempDrawing.startX-padding, this.tempDrawing.startY-padding, (this.tempDrawing.endX-this.tempDrawing.startX)+(padding*2), (this.tempDrawing.endY-this.tempDrawing.startY)+(padding*2));
          this.renderContext.restore();

      }
      if(this.tempDrawing.gui.tool == "square"){
          this.drawSquare(this.tempDrawing);
          this.drawSelectBorder();
          this.renderContext.strokeRect(this.tempDrawing.startX-padding, this.tempDrawing.startY-padding, this.tempDrawing.width+(padding*2), this.tempDrawing.height+(padding*2));
          this.renderContext.restore();
      }
  }
  public drawSelectBorder(){
      this.renderContext.save();
      this.renderContext.lineCap = "square";
      this.renderContext.strokeStyle = "#1492E6";
      this.renderContext.lineWidth = 1;
  }

  public findDrawing(xCord, yCord){
      console.log("searched");
      for(let x=0; x< this.allDrawings.length; x++){
          if(this.allDrawings[x].tool == 'pen'){
              if( this.allDrawings[x].startX <= xCord && xCord <= this.allDrawings[x].endX && this.allDrawings[x].startY <= yCord && yCord <= this.allDrawings[x].endY ) {
                  console.log("FOUND pen");
                  this.tempDrawing = JSON.parse(JSON.stringify(this.allDrawings[x]));
                  this.allDrawings.slice(x,1);
              }
          }
          if(this.allDrawings[x].tool == 'square'){
              if( this.allDrawings[x].startX <= xCord && xCord <= (this.allDrawings[x].width+this.allDrawings[x].startX) && this.allDrawings[x].startY <= yCord && yCord <= (this.allDrawings[x].height+this.allDrawings[x].startY) ) {
                  console.log("FOUND square");
                  this.tempDrawing = JSON.parse(JSON.stringify(this.allDrawings[x]));
                  this.allDrawings.slice(x,1);
              }
          }
      }
  }

  public undoDrawing() {
    if(this.allDrawings.length > 0) {
      this.undoneDrawings.push(this.allDrawings.pop());
    }
    this.redrawSimple();
  }

  public redoDrawing() {
    if(this.undoneDrawings.length > 0) {
      this.allDrawings.push(this.undoneDrawings.pop());
    }
    this.redrawSimple();
  }

}
