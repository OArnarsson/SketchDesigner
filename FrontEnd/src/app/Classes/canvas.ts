import {Renderer} from '@angular/core';
import {GUI} from '../Classes/gui'
import {Pen} from './pen'
import {advanceActivatedRoute} from "@angular/router/src/router_state";

export class Canvas {

  //Canvas Variables
  public rawCanvasObj: any;
  public renderContext: CanvasRenderingContext2D;
  public class: string;
  public canvasWidth: number;
  public canvasHeight: number;
  public allDrawings: any[];
  public activeDrawing: any;
  public active: boolean;

  //Utilities
  public gui: GUI;
  private renderer: Renderer;

  constructor(rend: Renderer) {
    this.gui = new GUI();
    this.renderer = rend;
    this.class = "mobile";
    this.canvasWidth = 414;
    this.canvasHeight = 736;
    this.allDrawings = [];
    this.activeDrawing = new Pen();
    this.active = false;
  }


  public mouseDown(e: any) {
    this.active = true;
    var startX = e.pageX - this.rawCanvasObj.offsetLeft;
    var startY = e.pageY - this.rawCanvasObj.offsetTop;

    if(this.activeDrawing.tool == 'pen') {
        this.activeDrawing.pushPos(startX, startY);
    }

    this.redrawSimple();
  }

  public mouseMove(e: any) {
    if(this.activeDrawing.tool == 'pen' && this.active) {
      this.activeDrawing.pushPos(e.pageX - this.rawCanvasObj.offsetLeft, e.pageY - this.rawCanvasObj.offsetTop);

    }

      this.redrawSimple();
  }

  public mouseUp() {
    this.allDrawings.push(this.activeDrawing);
    this.active = false;

    if(this.activeDrawing.tool == 'pen') {
      this.activeDrawing = new Pen();
    }

    this.redrawSimple();

    console.log(this.allDrawings);
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
        this.renderContext.beginPath();
        this.renderContext.moveTo(drawing.posX[0], drawing.posY[0]);
        for (var i = 0; i < drawing.posX.length; i++) {
          this.renderContext.lineTo(drawing.posX[i], drawing.posY[i]);
          this.renderContext.stroke();
        }
      }
    }

    this.renderContext.lineWidth = this.gui.lineWidth;
    this.renderContext.lineCap = this.gui.lineCap;
    this.renderContext.lineJoin = this.gui.lineJoin;

    if(this.gui.tool == 'pen') {
      this.renderContext.beginPath();
      this.renderContext.moveTo(this.activeDrawing.posX[0], this.activeDrawing.posY[0]);
      for (var i = 0; i < this.activeDrawing.posX.length; i++) {
        this.renderContext.lineTo(this.activeDrawing.posX[i], this.activeDrawing.posY[i]);
        this.renderContext.stroke();
      }
    }

    /*
    if(this.gui.tool == 'square') {
      this.renderContext.rect(10, 10, this.clickX[this.clickX.length], this.clickY[this.clickX.length])
    }
    */
  }
}
