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
    }

    public mouseDown(e: any) {
        var startX = e.pageX - this.activeCanvas.rawCanvasObj.offsetLeft;
        var startY = e.pageY - this.activeCanvas.rawCanvasObj.offsetTop;
        this.moveX = startX;
        this.moveY = startY;

        if (this.gui.tool != 'select') {
            this.selectedDrawings = [];
            this.activeDrawing.gui = JSON.parse(JSON.stringify(this.gui));
            this.activeDrawing.currPos.setPos('start', startX, startY);
            this.isDrawing = true;
            if (this.gui.tool == 'pen') {
                this.activeDrawing.currPos.setPos('push', startX, startY);
            }
        }

        else if (this.gui.tool == 'select') {
            // if (this.selectedDrawings.length > 0) {
            //     //CHECK IF IN ZONE!
            // }
            // else {
            this.selectedDrawings = [];
            this.selectionZone = new Drawing();
            this.selectionZone.gui = JSON.parse(JSON.stringify(this.gui));
            this.selectionZone.currPos.setPos('start', startX, startY);
            this.isSelecting = true;
            // }
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
        else if (this.selectedDrawings.length > 0) {
            //MOVE THE STUFF!
        }
    }

    public mouseUp() {
        this.moveX = 0;
        this.moveY = 0;
        if (this.isDrawing) {
            this.activeDrawing.currPos.setBoxSize(this.gui.tool);
            this.activeDrawing.selectionPos = new Position(this.getLower(this.activeDrawing.currPos));
            console.log(this.activeDrawing.selectionPos);
            this.activeCanvas.drawings.push(this.activeDrawing);
            this.activeDrawing = new Drawing();
            this.isDrawing = false;
        }
        else if (this.isSelecting) {
            this.selectionZone.currPos.setBoxSize('square');
            this.selectionZone.selectionPos = new Position(this.getLower(this.selectionZone.currPos));
            for (let drawing of this.activeCanvas.drawings) {
                if (this.inRange(drawing.selectionPos)) {
                    this.selectedDrawings.push(drawing);
                }
            }
            this.isSelecting = false;
        }

        console.log(this.selectedDrawings);
        this.activeCanvas.redrawCanvas();
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
        return false;
    }
}
