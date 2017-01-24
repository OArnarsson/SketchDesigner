import { Renderer } from '@angular/core';
import { GUI } from '../Classes/gui'
import { Drawing } from './drawing'
import { Selection } from '../Classes/selection'
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
    public searchGrid: boolean;

    //Move Props
    public moveX: number;
    public moveY: number;
    public isMoving: boolean;
    //Utilities
    public gui: GUI;

    constructor() {
        this.isMoving = false;
        this.gui = new GUI();
        this.class = "mobile";
        this.canvasWidth = 248.4;
        this.canvasHeight = 441.6;
        this.allDrawings = [];
        this.undoneDrawings = [];
        this.activeDrawing = new Drawing();
        this.active = false;
        this.searchGrid = true;
    }

    public mouseDown(e: any) {
        if (this.activeDrawing.tool != this.gui.tool) {
            this.setToolClass(this.gui);
        }
        this.active = true;

        this.activeDrawing.gui = this.gui;
        this.activeDrawing.tool = this.gui.tool.toString();
        var startX = e.pageX - this.rawCanvasObj.offsetLeft;
        var startY = e.pageY - this.rawCanvasObj.offsetTop;
        this.moveX = startX;
        this.moveY = startY;

        this.activeDrawing.startPos(startX, startY);
        //console.log("MouseDown:"+this.activeDrawing.tool);

        if (this.gui.tool == 'select') {
            this.findDrawing(startX, startY);
        }
        else {
            if (this.activeDrawing.tool == 'pen') {
                this.activeDrawing.pushPos(startX, startY);
            }
            this.activeDrawing.endPos(startX, startY);
        }
        //console.log("start(x,y):"+this.activeDrawing.startX+","+this.activeDrawing.startX+"end(x,y):"+this.activeDrawing.endX+","+this.activeDrawing.endY);
        this.redrawCanvas();
    }

    public mouseMove(e: any) {
        var startX = e.pageX - this.rawCanvasObj.offsetLeft;
        var startY = e.pageY - this.rawCanvasObj.offsetTop;

        if (this.active) {
            if (this.gui.tool == 'select') {
                if (this.activeDrawing.found) {
                    this.activeDrawing.moveXby = (startX - this.moveX);
                    this.activeDrawing.moveYby = (startY - this.moveY);
                    this.moveX = startX;
                    this.moveY = startY;
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
        if (this.active) {
            this.redrawCanvas();
        }
    }

    public mouseUp() {
        this.active = false;
        this.activeDrawing.moveXby = 0;
        this.activeDrawing.moveYby = 0;
        this.activeDrawing.found = false;
        if (this.gui.tool != "select") {
            this.activeDrawing.gui = JSON.parse(this.getGUI());
            this.activeDrawing.selection = new Selection(this.activeDrawing.tool, this.activeDrawing.startX, this.activeDrawing.startY, this.activeDrawing.endX, this.activeDrawing.endY);
            this.allDrawings.push(this.activeDrawing);
            this.activeDrawing = new Drawing();
            this.activeDrawing.gui = this.gui;
        }
    }

    public getGUI() {
        return JSON.stringify(this.gui);
    }

    public setCursor() {
        var tool = this.gui.tool;
        this.rawCanvasObj.style.cursor = "default";
        if (tool == 'square' || tool == 'circle' || tool == 'line') {
            this.rawCanvasObj.style.cursor = 'crosshair';
        }
        if (tool == 'text') {
            this.rawCanvasObj.style.cursor = 'text';
        }
    }

    public setToolClass(gui: GUI) {
        this.gui = gui;
        this.activeDrawing = new Drawing();
        this.setCursor();
        if (gui.tool != "select") {
            this.activeDrawing.gui = this.gui;
            this.redrawCanvas();
        }

    }

    //Clears Canvas
    public clearCanvas() {
        this.renderContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    //Renders the whole drawing
    public redrawCanvas() {
        this.clearCanvas();
        for (let drawing of this.allDrawings) {
            this.renderContext.beginPath();
            this.drawObject(drawing, false);
            this.renderContext.stroke();
            this.renderContext.closePath();
        }

        if (this.gui.tool == 'select') {
            if (this.activeDrawing.found) {
                this.MoveObject();
                this.drawSelect();
            }
        }
        else {
            this.drawObject(this.activeDrawing, true);
        }
    }

    public drawObject(drawing: Drawing, isLive) {
        this.renderContext.lineWidth = drawing.gui.lineWidth;
        this.renderContext.lineCap = drawing.gui.lineCap;
        this.renderContext.strokeStyle = drawing.gui.strokeStyle;
        this.renderContext.fillStyle = drawing.gui.fillStyle;
        this.renderContext.globalAlpha = drawing.gui.opacity / 100;

        if (isLive) {
            this.renderContext.beginPath();
        }

        if (drawing.tool == 'pen') {
            this.renderContext.moveTo(drawing.posX[0], drawing.posY[0]);
            for (var i = 0; i < drawing.posX.length; i++) {
                this.renderContext.lineTo(drawing.posX[i], drawing.posY[i]);
            }
            if (drawing.gui.hasFill) {
                this.renderContext.fill();
            }

        }

        if (drawing.tool == 'square') {
            this.renderContext.strokeRect(drawing.startX, drawing.startY, drawing.endX, drawing.endY);
            if (drawing.gui.hasFill) {
                this.renderContext.fillRect(drawing.startX, drawing.startY, drawing.endX, drawing.endY);
            }
        }

        if (drawing.tool == 'circle') {
            this.renderContext.moveTo(drawing.startX, drawing.startY + (drawing.endY - drawing.startY) / 2);
            this.renderContext.bezierCurveTo(drawing.startX, drawing.startY, drawing.endX, drawing.startY, drawing.endX, drawing.startY + (drawing.endY - drawing.startY) / 2);
            this.renderContext.bezierCurveTo(drawing.endX, drawing.endY, drawing.startX, drawing.endY, drawing.startX, drawing.startY + (drawing.endY - drawing.startY) / 2);
            if (drawing.gui.hasFill) {
                this.renderContext.fill();
            }
        }

        if (drawing.tool == 'line') {
            this.renderContext.moveTo(drawing.startX, drawing.startY);
            this.renderContext.lineTo(drawing.endX, drawing.endY);
        }

        if (drawing.tool == 'text') {
            if (drawing.value == null) {
                return;
            }
            let x = "";
            if (drawing.gui.fonty.bold) {
                x = "bold ";
            }
            if (drawing.gui.fonty.italic) {
                x = x + "italic ";
            }
            x = x + drawing.gui.fonty.fontSize + "px " + " " + drawing.gui.fonty.font;
            this.renderContext.font = x;
            this.renderContext.fillStyle = drawing.gui.strokeStyle;
            this.renderContext.fillText(drawing.value, drawing.startX, drawing.startY);
        }

        if (isLive) {
            this.renderContext.stroke();
            this.renderContext.closePath();
        }
    }

    public drawSelect() {
        var padding = 4;
        var tool = this.activeDrawing.gui.tool;
        this.drawObject(this.activeDrawing, true);
        this.drawSelectBorder();
        this.renderContext.strokeRect(this.activeDrawing.selection.lowX - padding, this.activeDrawing.selection.lowY - padding, (this.activeDrawing.selection.highX - this.activeDrawing.selection.lowX) + (padding * 2), (this.activeDrawing.selection.highY - this.activeDrawing.selection.lowY) + (padding * 2));
        //this.tagGrid();

        var draggables = [];
        draggables.push(this.activeDrawing.selection.topLeft());
        draggables.push(this.activeDrawing.selection.topMiddle());
        draggables.push(this.activeDrawing.selection.topRight());
        draggables.push(this.activeDrawing.selection.midLeft());
        draggables.push(this.activeDrawing.selection.midRight());
        draggables.push(this.activeDrawing.selection.bottomLeft());
        draggables.push(this.activeDrawing.selection.bottomMiddle());
        draggables.push(this.activeDrawing.selection.bottomRight());
        padding = 7.5;

        this.renderContext.strokeStyle = 'red'; // BOTTOM Y
        this.renderContext.strokeRect(draggables[0][0] - padding, draggables[0][1] + padding, padding, -padding);
        this.renderContext.strokeRect(draggables[2][0] + padding, draggables[2][1] + padding, -padding, -padding);
        this.renderContext.strokeStyle = 'green'; //TOP Y
        this.renderContext.strokeRect(draggables[5][0] - padding, draggables[5][1] - padding, padding, padding);
        this.renderContext.strokeRect(draggables[7][0] + padding, draggables[7][1] - padding, -padding, padding);
        this.renderContext.strokeStyle = 'blue'; //MIDDLE X
        this.renderContext.strokeRect(draggables[0][0] + (draggables[1][0] - padding) / 2, draggables[1][1] + padding, padding, -padding);
        this.renderContext.strokeRect(draggables[5][0] + (draggables[6][0] - padding) / 2, draggables[6][1] - padding, padding, padding);
        this.renderContext.strokeStyle = 'black'; //MIDDLE Y
        this.renderContext.strokeRect(draggables[3][0] - padding, draggables[0][1] - (draggables[3][1] + padding) / 2, padding, padding);
        this.renderContext.strokeRect(draggables[4][0] + padding, draggables[1][1] - (draggables[4][1] - padding) / 2, -padding, -padding);
    }

    public MoveObject() {
        if (this.activeDrawing.tool != "square") {
            this.activeDrawing.endPos(this.activeDrawing.endX, this.activeDrawing.endY);
            this.activeDrawing.startPos(this.activeDrawing.startX, this.activeDrawing.startY);
        }

        this.activeDrawing.movePos(this.activeDrawing.moveXby, this.activeDrawing.moveYby);
        this.activeDrawing.selection.movePos(this.activeDrawing.moveXby, this.activeDrawing.moveYby);

        if (this.activeDrawing.gui.tool == 'pen') {
            for (var i = 0; i < this.activeDrawing.posX.length; i++) {
                this.activeDrawing.posX[i] = this.activeDrawing.posX[i] + this.activeDrawing.moveXby;
                this.activeDrawing.posY[i] = this.activeDrawing.posY[i] + this.activeDrawing.moveYby;
            }
        }
    }

    //This renders the Border around the object, we can style it here.
    public drawSelectBorder() {
        this.renderContext.lineCap = "square";
        this.renderContext.strokeStyle = "#1492E6";
        this.renderContext.lineWidth = 1;
    }

    public findDrawing(xCord, yCord) {
        for (let x = 0; x < this.allDrawings.length; x++) {
            var selection = this.allDrawings[x].selection;
            if (selection.lowX <= xCord && xCord <= selection.highX && selection.lowY <= yCord && yCord <= selection.highY) {
                this.activeDrawing = this.allDrawings[x];
                this.allDrawings.push(this.allDrawings[x]);
                this.allDrawings.splice(x, 1);
                this.activeDrawing.found = true;
                this.rawCanvasObj.style.cursor = 'move';
                return;
            }
        }
        this.rawCanvasObj.style.cursor = 'default';
    }

    public newText(value, xPos, yPos) {
        this.activeDrawing = new Drawing();
        let paddingX = 5; //This works for the default font settings in gui
        let paddingY = 8; //It makes the text from input field appear in the same pos on canvas
        this.activeDrawing.tool = "text";
        this.activeDrawing.gui = JSON.parse(JSON.stringify(this.gui));
        this.activeDrawing.startPos(paddingX + xPos - this.rawCanvasObj.offsetLeft, paddingY + yPos - this.rawCanvasObj.offsetTop + this.activeDrawing.gui.fonty.fontSize);
        this.activeDrawing.endPos(this.canvasWidth - paddingX, this.activeDrawing.gui.fonty.fontSize - 2);
        this.activeDrawing.selection = new Selection(this.activeDrawing.tool, this.activeDrawing.startX + (paddingX * 2.5), this.activeDrawing.startY - paddingY, this.activeDrawing.endX - (paddingX * 2.5), this.activeDrawing.endY + (paddingY * 2));
        if (value == null) {
            value = ""
        }
        this.activeDrawing.value = value;
        this.allDrawings.push(this.activeDrawing);
        this.drawObject(this.activeDrawing, true);
        this.activeDrawing = new Drawing();
        this.active = false;
    }

    public undoDrawing() {
        if (this.allDrawings.length > 0) {
            this.undoneDrawings.push(this.allDrawings.pop());
        }
        this.redrawCanvas();
    }

    public redoDrawing() {
        if (this.undoneDrawings.length > 0) {
            this.allDrawings.push(this.undoneDrawings.pop());
        }
        this.redrawCanvas();
    }
}
