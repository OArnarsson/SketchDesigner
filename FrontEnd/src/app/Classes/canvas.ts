import {Renderer} from '@angular/core';
import {GUI} from '../Classes/gui'
import {BaseDrawing} from '../Classes/base-drawing'

export class Canvas {
    private renderer:Renderer;
    public rawCanvasObj:any;
    public renderContext:CanvasRenderingContext2D;
    public cursor:string;
    public uiContent:GUI;
    public drawingArr:any[];
    public activeDrawing:any;
    public class:string;
    public flag:boolean;
    public dotflag:boolean;

    constructor(rend: Renderer){
        this.renderer = rend;
        this.cursor = "line";
        this.uiContent = new GUI();
        this.drawingArr = [];
        this.activeDrawing = {};
        this.class="canvas col-5";
        this.activeDrawing = new BaseDrawing();
        this.flag = false;
        this.dotflag = false;
    }

    public setClass(className){
        this.class = className;
    }

    public findxy(res, e:any) {
        if (res == 'down') {
            this.activeDrawing.prev.x = this.activeDrawing.curr.x;
            this.activeDrawing.prev.y = this.activeDrawing.curr.y;
            this.activeDrawing.curr.x = e.clientX - this.rawCanvasObj.offsetLeft;
            this.activeDrawing.curr.y = e.clientY - this.rawCanvasObj.offsetTop;

            this.flag = true;
            this.dotflag = true;
            if (this.dotflag) {
                this.renderContext.beginPath();
                this.renderContext.fillStyle = this.activeDrawing.strokeColor;
                this.renderContext.fillRect(this.activeDrawing.curr.x, this.activeDrawing.curr.y, 2, 2);
                this.renderContext.closePath();
                this.dotflag = false;
            }
        }
        if (res == 'up' || res == "out") {
            this.flag = false;
        }
        if (res == 'move') {
            if (this.flag) {
                this.activeDrawing.prev.x = this.activeDrawing.curr.x;
                this.activeDrawing.prev.y = this.activeDrawing.curr.y;
                this.activeDrawing.curr.x = (e.clientX - this.rawCanvasObj.offsetLeft);
                this.activeDrawing.curr.y = (e.clientY - this.rawCanvasObj.offsetTop);
                this.draw();
            }

        }
    }
    public draw() {
        this.renderContext.beginPath();
        this.renderContext.moveTo(this.activeDrawing.prev.x, this.activeDrawing.prev.y);
        this.renderContext.lineTo(this.activeDrawing.curr.x, this.activeDrawing.curr.y);
        this.renderContext.strokeStyle = this.activeDrawing.strokeColor;
        this.renderContext.lineWidth = 2;
        this.renderContext.stroke();
        this.renderContext.closePath();
    }


}
