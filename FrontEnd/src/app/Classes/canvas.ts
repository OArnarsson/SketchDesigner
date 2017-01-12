import {Renderer} from '@angular/core';
import {GUI} from '../Classes/gui'
import {BaseDrawing} from '../Classes/base-drawing'

export class Canvas {

    //Canvas Variables
    private renderer:Renderer;
    public rawCanvasObj:any;
    public renderContext:CanvasRenderingContext2D;
    public canvasWidth:number;
    public canvasHeight:number;
    public class:string;

    //Utilities
    public cursor:string;
    public uiContent:GUI;
    public drawingArr:any[];


   //To Draw a simple line
    public clickX = new Array();
    public clickY = new Array();
    public clickDrag = new Array();
    public paint;

    constructor(rend: Renderer){
        this.renderer = rend;
        this.cursor = "line";
        this.uiContent = new GUI();
        this.drawingArr = [];
        this.class="canvas col-5";
        this.class = "mobile";
        this.canvasWidth = 414;
        this.canvasHeight = 736;
    }

    public setClass(className){
        this.class = className;
    }
    public prepareCanvas(){

    }

    //Mouse Event Functions
    public mouseDown(e:any){
        // Mouse down location
        var mouseX = e.pageX - this.rawCanvasObj.offsetLeft;
        var mouseY = e.pageY - this.rawCanvasObj.offsetTop;

        this.paint = true;
        this.addClick(mouseX, mouseY, false);
        this.redrawSimple();
    }
    public mouseMove(e:any){
        if(this.paint){
            this.addClick(e.pageX - this.rawCanvasObj.offsetLeft, e.pageY - this.rawCanvasObj.offsetTop, true);
            this.redrawSimple();
        }
    }
    public mouseUp(){
        this.paint = false;
        this.redrawSimple();
    }
    public mouseLeave(){
        this.paint = false;
    }



    //Ckears Canvas
    public clearCanvas()
    {
        this.renderContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    //Adds click path to arr
    public addClick(x, y, dragging)
    {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    //Renders the whole drawing
    public redrawSimple()
    {
        this.clearCanvas();
        var radius = 5;
        this.renderContext.strokeStyle = "#ff5a55";
        this.renderContext.lineWidth = radius;

        for(var i=0; i < this.clickX.length; i++)
        {
            this.renderContext.beginPath();

            if(this.clickDrag[i] && i){
                this.renderContext.moveTo(this.clickX[i-1], this.clickY[i-1]);
            }

            else{
                this.renderContext.moveTo(this.clickX[i]-1, this.clickY[i]);
            }

            this.renderContext.lineTo(this.clickX[i], this.clickY[i]);
            this.renderContext.closePath();
            this.renderContext.stroke();
        }
    }



}
