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
    public gui: Gui;
    public moveX: number;
    public moveY: number;
    public isDrawing: boolean;
    public isSelecting: boolean;
    public isMoving: boolean;
    public clipboard: Drawing[];

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
    }

    public mouseDown(e: any) {
        let startX = e.pageX - this.activeCanvas.rawCanvasObj.offsetLeft;
        let startY = e.pageY - this.activeCanvas.rawCanvasObj.offsetTop;
        let downPos = new Position();
        downPos.setPos('start', startX, startY);
        downPos.setPos('end', startX, startY);
        this.moveX = startX;
        this.moveY = startY;

        if (this.gui.tool != 'select') {
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
        }
    }

    public activateCanvas(canvas: Canvas) {
        this.activeCanvas = canvas;
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
        let offset = 5;
        if (this.clipboard.length > 0)
            for (let i = 0; i < this.clipboard.length; i += 1) {
                this.clipboard[i].currPos.movePos(this.clipboard[i].gui.tool, offset, -offset);
                this.clipboard[i].selectionPos.movePos(this.clipboard[i].gui.tool, offset, -offset);
                this.activeCanvas.drawings.push(new Drawing(this.clipboard[i]));
            }
        this.activeCanvas.redrawCanvas();
    }
}
