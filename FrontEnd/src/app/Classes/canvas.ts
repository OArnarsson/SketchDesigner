import {Renderer} from '@angular/core';
import {GUI} from '../Classes/gui'

export class Canvas {
    private renderer:Renderer;
    public renderContext:CanvasRenderingContext2D;
    public cursor:string;
    public uiContent:GUI;
    public drawingArr:any[];
    public activeDrawing:any;
    public class:string;
    public rawCanvas:string;
    public canvasid:string;

    constructor(rend: Renderer){
        this.renderer = rend;
        this.cursor = "line";
        this.uiContent = new GUI();
        this.drawingArr = [];
        this.activeDrawing = {};
        this.class="canvas col-5";
        this.canvasid = "5";
    }


    public setClass(className){
        this.class = className;
    }


}
