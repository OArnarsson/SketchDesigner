import { Workspace } from '../classes/workspace';
import { Canvas } from '../classes/canvas';
import { Drawing } from '../classes/drawing';
import { Gui } from '../classes/gui';
import { Position } from '../classes/position';


export class Manipulator {
    public workspace: Workspace;
    public activeCanvas: Canvas;
    public selectedDrawings: Drawing[];
    public activeDrawing: Drawing;
    public selectionZone: Drawing;
    public selectionGui: Gui;
    public gui: Gui;
    public moveX: number;
    public moveY: number;
    public isDrawing: boolean;
    public isSelecting: boolean;
    public isMoving: boolean;
    public clipboard: Drawing[];
    public history: Workspace[];
    public currHistory: number;

    public constructor(workspace: Workspace) {
        this.workspace = new Workspace(workspace);
        this.activeCanvas = this.workspace.canvases[0];
        this.selectedDrawings = [];
        this.gui = new Gui();
        this.activeDrawing = new Drawing();
        this.selectionZone = new Drawing();
        this.moveX = 0;
        this.moveY = 0;
        this.isDrawing = false;
        this.isSelecting = false;
        this.isMoving = false;
        this.clipboard = [];
        this.history = [];
        this.history.push(new Workspace(this.workspace));
        this.currHistory = 0;
    }

    public addCanvas() {
        this.workspace.canvases.push(new Canvas());
        this.manageHistory('ADD CANVAS');
    }

    public removeCanvas(canvas: Canvas) {
        if (this.workspace.canvases.length > 1) {
            this.workspace.canvases.splice(this.workspace.canvases.indexOf(canvas), 1);
            this.activeCanvas = this.workspace.canvases[0];
            this.manageHistory('KILL CANVAS');
        }
    }

    public removeDrawing() {
        if (this.selectedDrawings.length > 0) {
            for (let drawing of this.selectedDrawings)
                this.activeCanvas.drawings.splice(this.activeCanvas.drawings.indexOf(drawing), 1);
            this.selectionZone = new Drawing();
            this.activeCanvas.redrawCanvas();
            this.manageHistory('KILL DRAWING');
        }
    }

    public duplicateCanvas(canvas) {
        this.workspace.canvases.splice(this.workspace.canvases.indexOf(canvas) + 1, 0, new Canvas(canvas));
        this.renderCanvases();
    }

    public renderCanvases() {
        setTimeout(() => {
            for (let canvas of this.workspace.canvases) {
                canvas.redrawCanvas();
            }
        }, 150);
    }


    public setTool(tool) {
        this.gui.tool = tool;
        this.setCursor();
    }

    public setCursor() {
        let style = '';
        if (this.gui.tool == 'square' || this.gui.tool == 'circle' || this.gui.tool == 'line')
            style = 'crosshair';
        else if (this.gui.tool == 'text')
            style = 'text';
        else if (this.gui.tool == 'select')
            style = 'pointer';
        else if (this.gui.tool == 'pen')
            style == 'default'
        for (let i = 0; i < this.workspace.canvases.length; i += 1)
            this.workspace.canvases[i].rawCanvasObj.style.cursor = style;
    }

    public mouseDown(e: any) {
        let startX = e.pageX - this.activeCanvas.rawCanvasObj.offsetLeft;
        let startY = e.pageY - this.activeCanvas.rawCanvasObj.offsetTop;
        let downPos = new Position();
        downPos.setPos('start', startX, startY);
        downPos.setPos('end', startX, startY);
        this.moveX = startX;
        this.moveY = startY;

        if (this.gui.tool != 'select' && this.gui.tool != 'text') {
            this.selectedDrawings = [];
            this.activeDrawing.gui = JSON.parse(JSON.stringify(this.gui));
            this.activeDrawing.currPos = new Position(downPos);
            this.isDrawing = true;
            if (this.gui.tool == 'pen') {
                this.activeDrawing.currPos.setPos('push', startX, startY);
            }
        }

        else if (this.gui.tool == 'select') {
            if (this.selectedDrawings.length > 0 && this.inRange(downPos)) {
                this.isMoving = true;
            }
            else {
                this.selectedDrawings = [];
                this.selectionZone = new Drawing();
                this.selectionZone.gui = JSON.parse(JSON.stringify(this.gui));
                this.selectionZone.currPos = new Position(downPos);
                this.isSelecting = true;
            }
        }
    }

    public mouseMove(e: any) {
        var startX = e.pageX - this.activeCanvas.rawCanvasObj.offsetLeft;
        var startY = e.pageY - this.activeCanvas.rawCanvasObj.offsetTop;

        if (this.isDrawing) {
            this.activeDrawing.currPos.setPos('end', startX, startY);
            this.activeCanvas.redrawCanvas();
            this.activeCanvas.drawObject(this.activeDrawing, true);
            if (this.gui.tool == 'pen')
                this.activeDrawing.currPos.setPos('push', startX, startY);
        }
        else if (this.isSelecting) {
            this.selectionZone.currPos.setPos('end', startX, startY);
            this.activeCanvas.redrawCanvas();
            this.activeCanvas.drawObject(this.selectionZone, true);
        }
        else if (this.isMoving) {
            let xPos = [];
            let yPos = [];
            for (let drawing of this.selectedDrawings) {
                drawing.currPos.movePos(drawing.gui.tool, startX - this.moveX, startY - this.moveY);
                drawing.selectionPos.movePos(drawing.gui.tool, startX - this.moveX, startY - this.moveY);
                xPos.push(drawing.selectionPos.startX);
                xPos.push(drawing.selectionPos.endX);
                yPos.push(drawing.selectionPos.startY);
                yPos.push(drawing.selectionPos.endY);
            }
            this.selectionZone.selectionPos.setPos('start', Math.min.apply(null, xPos), Math.min.apply(null, yPos));
            this.selectionZone.selectionPos.setPos('end', Math.max.apply(null, xPos), Math.max.apply(null, yPos));
            this.selectionZone.currPos.setPos('start', Math.min.apply(null, xPos), Math.min.apply(null, yPos));
            this.selectionZone.currPos.setPos('end', Math.max.apply(null, xPos), Math.max.apply(null, yPos));
            this.activeCanvas.redrawCanvas();
            this.activeCanvas.drawObject(this.selectionZone, true);
            this.moveX = startX;
            this.moveY = startY;
        }
    }

    public mouseUp() {
        this.moveX = 0;
        this.moveY = 0;
        if (this.isDrawing) {
            this.activeDrawing.currPos.setBoxSize(this.gui.tool);
            this.activeDrawing.selectionPos = new Position(this.getLower(this.activeDrawing.currPos));
            this.activeCanvas.drawings.push(this.activeDrawing);
            this.activeDrawing = new Drawing();
            this.isDrawing = false;
            this.activeCanvas.redrawCanvas();
            this.manageHistory('DRAW');

        }
        else if (this.isSelecting) {
            let xPos = [];
            let yPos = [];
            this.selectionZone.currPos.setBoxSize('square');
            this.selectionZone.selectionPos = new Position(this.getLower(this.selectionZone.currPos));
            for (let drawing of this.activeCanvas.drawings) {
                if (this.inRange(drawing.selectionPos)) {
                    this.selectedDrawings.push(drawing);
                    xPos.push(drawing.selectionPos.startX);
                    xPos.push(drawing.selectionPos.endX);
                    yPos.push(drawing.selectionPos.startY);
                    yPos.push(drawing.selectionPos.endY);
                }
            }

            this.isSelecting = false;
            this.selectionZone.currPos.setPos('start', Math.min.apply(null, xPos), Math.min.apply(null, yPos));
            this.selectionZone.currPos.setPos('end', Math.max.apply(null, xPos), Math.max.apply(null, yPos));
            this.selectionZone.selectionPos.setPos('start', Math.min.apply(null, xPos), Math.min.apply(null, yPos));
            this.selectionZone.selectionPos.setPos('end', Math.max.apply(null, xPos), Math.max.apply(null, yPos));
            this.activeCanvas.redrawCanvas();
            this.activeCanvas.drawObject(this.selectionZone, true);
        }
        else if (this.isMoving) {
            this.isMoving = false;
            this.activeCanvas.redrawCanvas();
            this.activeCanvas.drawObject(this.selectionZone, true);
            this.manageHistory('MOVE');
        }
    }

    public mapSelectedDrawing(drawing:Drawing){
        for(let prop in drawing.gui){
            if(prop!= 'tool'){
                if(prop == 'textprops'){
                    for(let innerProp in drawing.gui[prop]){
                        if(innerProp != 'value') {
                            drawing.gui[prop][innerProp] = JSON.parse(JSON.stringify(this.gui[prop][innerProp]));
                        }
                    }
                }
                else
                    drawing.gui[prop] = JSON.parse(JSON.stringify(this.gui[prop]));
            }
        }
    }

    public redrawSelect(){
        if(this.gui.tool == 'select'){
            for(let drawing of this.selectedDrawings){
                this.mapSelectedDrawing(drawing);
                this.activeCanvas.drawObject(drawing, true);
            }

        }
    }

    public activateCanvas(canvas: Canvas) {
        if (this.selectedDrawings.length < 1) {
            this.selectionZone = new Drawing();
            this.selectedDrawings = [];
            this.activeCanvas.redrawCanvas();
            this.activeCanvas = canvas;
            this.setCursor();
        }
    }

    public getLower(pos: Position) {
        let x, bigX, y, bigY;
        if (pos.startX < pos.endX) {
            x = pos.startX;
            bigX = pos.endX;
        }
        else {
            x = pos.endX;
            bigX = pos.startX;
        }
        if (pos.startY < pos.endY) {
            y = pos.startY;
            bigY = pos.endY;
        }
        else {
            y = pos.endY;
            bigY = pos.startY;
        }

        let selPos = new Position();
        selPos.setPos('start', x, y);
        selPos.setPos('end', bigX, bigY);
        return selPos;
    }

    public inRange(dPos: Position) {
        let sPos = this.selectionZone.selectionPos;

        if ((dPos.startX >= sPos.startX && dPos.startX <= sPos.endX) || (dPos.endX >= sPos.startX && dPos.endX <= sPos.endX)) {
            if ((dPos.startY >= sPos.startY && dPos.startY <= sPos.endY) || (dPos.endY >= sPos.startY && dPos.endY <= sPos.endY)) {
                return true;
            }
        }
        if ((sPos.startX >= dPos.startX && sPos.startX <= dPos.endX) || (sPos.endX >= dPos.startX && sPos.endX <= dPos.endX)) {
            if ((sPos.startY >= dPos.startY && sPos.startY <= dPos.endY) || (sPos.endY >= dPos.startY && sPos.endY <= dPos.endY)) {
                return true;
            }
        }
        return false;
    }

    public copySelected() {
        this.clipboard = [];
        if (this.selectedDrawings.length > 0)
            for (let i = 0; i < this.selectedDrawings.length; i += 1)
                this.clipboard.push(new Drawing(this.selectedDrawings[i]));
    }

    public pasteSelected() {
        //TODO: MAKE PASTED ITEMS MOVING SO THAT THEY CAN BE MOVED AS A GROUP!
        let offset = 5;
        if (this.clipboard.length > 0)
            for (let i = 0; i < this.clipboard.length; i += 1) {
                this.clipboard[i].currPos.movePos(this.clipboard[i].gui.tool, offset, -offset);
                this.clipboard[i].selectionPos.movePos(this.clipboard[i].gui.tool, offset, -offset);
                this.activeCanvas.drawings.push(new Drawing(this.clipboard[i]));
            }
        this.activeCanvas.redrawCanvas();
        this.manageHistory('PASTED');
    }

    public manageHistory(action) {
        for (let canvas of this.workspace.canvases) {
            canvas.renderContext = '';
            canvas.rawCanvasObj = '';
        }
        if (JSON.stringify(this.history[this.history.length - 1].canvases) == JSON.stringify(this.workspace.canvases)) {
            console.log('ALL SAME!')
        }
        else {
            console.log('CHANGE DETECTED!');
            this.history.push(new Workspace(this.workspace));
            this.currHistory = this.history.length - 1;
        }
    }

    public backHistory() {
        if (this.currHistory > 0)
            this.currHistory -= 1;
        if (this.history[this.currHistory] != null) {
            this.workspace.canvases = [];
            for (let i = 0; i < this.history[this.currHistory].canvases.length; i += 1) {
                this.workspace.canvases[i] = new Canvas(this.history[this.currHistory].canvases[i]);
            }
        }
        let that = this;
        setTimeout(() => {
            for (let i = 0; i < that.workspace.canvases.length; i += 1) {
                that.workspace.canvases[i].redrawCanvas();
            }
        }, 250);

    }

    public forwardHistory() {
        if (this.currHistory < this.history.length)
            this.currHistory += 1;
        if (this.history[this.currHistory] != null) {
            this.workspace.canvases = [];
            for (let i = 0; i < this.history[this.currHistory].canvases.length; i += 1) {
                this.workspace.canvases[i] = new Canvas(this.history[this.currHistory].canvases[i]);
            }
        }
        let that = this;
        setTimeout(() => {
            for (let i = 0; i < that.workspace.canvases.length; i += 1) {
                that.workspace.canvases[i].redrawCanvas();
            }
        }, 250);

    }

    //Utilities for View
    public getIconClass(fill) {
        if (fill) {
            return "fa fa-check-square-o";
        }
        return "fa fa-square-o";
    }

    public toggleHasCol(style) {
        if (style == 'fill') {
            this.gui.hasFill = !this.gui.hasFill;
        }
        else {
            this.gui.hasBorder = !this.gui.hasBorder;
        }
    }

    public setFont(font) {
        this.gui.textprops.font = font;
    }

    public toggleFontStyle(style) {
        if (style == 'bold') {
            this.gui.textprops.bold = !this.gui.textprops.bold;
        }
        else {
            this.gui.textprops.italic = !this.gui.textprops.italic;
        }
    }
    public onDisplay(container) {
        if (container == 'fillCon' && this.gui.tool != 'line' && this.gui.tool != 'text') {
            return true;
        }

        if (container == 'strokeCon' && this.gui.tool != 'text') {
            return true;
        }

        if (container == 'fontCon' && (this.gui.tool == 'text' || this.gui.tool == 'select')) {
            return true;
        }
    }

    public newText(value, xPos, yPos) {
        let textDrawing = new Drawing();
        textDrawing.gui = JSON.parse(JSON.stringify(this.gui));
        console.log(value.length);
        if (value.length > 0) {
            textDrawing.gui.textprops.value = value;
            //In order to use measureText from renderContext, we have to render into the canvas the font size.
            this.activeCanvas.renderContext.font = this.gui.textprops.fontSize + "px " + " " + this.gui.textprops.font;
            let downPos = new Position();
            downPos.setPos('start', xPos - this.activeCanvas.rawCanvasObj.offsetLeft, yPos - this.activeCanvas.rawCanvasObj.offsetTop);
            downPos.setPos('end', (xPos - this.activeCanvas.rawCanvasObj.offsetLeft) + this.activeCanvas.renderContext.measureText(value).width, (yPos - this.activeCanvas.rawCanvasObj.offsetTop) + 50);
            textDrawing.currPos = new Position(downPos);
            textDrawing.selectionPos = new Position(downPos);
            this.activeCanvas.drawings.push(textDrawing);
            this.activeCanvas.redrawCanvas();
        }
    }

}
