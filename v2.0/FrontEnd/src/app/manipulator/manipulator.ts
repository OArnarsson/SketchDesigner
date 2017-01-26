import { Workspace } from '../classes/workspace';
import { Canvas } from '../classes/canvas';
import { Drawing } from '../classes/drawing';
import { Gui } from '../classes/gui';

export class Manipulator {
    public workspace: Workspace;
    public activeCanvas: Canvas;
    public selectedDrawings: Drawing[];
    public activeDrawing: Drawing;
    public gui: Gui;
    public moveX: number;
    public moveY: number;
    public isDrawing: boolean;

    public constructor(workspace: Workspace) {
        this.workspace = new Workspace(workspace);
        this.activeCanvas = this.workspace.canvases[0];
        this.selectedDrawings = [];
        this.gui = new Gui();
        this.activeDrawing = new Drawing();
        this.moveX = 0;
        this.moveY = 0;
        this.isDrawing = false;
    }

    public mouseDown(e: any) {
        this.activeDrawing.gui = JSON.parse(JSON.stringify(this.gui));
        this.isDrawing = true;
        var startX = e.pageX - this.activeCanvas.rawCanvasObj.offsetLeft;
        var startY = e.pageY - this.activeCanvas.rawCanvasObj.offsetTop;
        this.moveX = startX;
        this.moveY = startY;

        this.activeDrawing.currPos.setPos('start', startX, startY);
        if (this.gui.tool == 'pen') {
            this.activeDrawing.currPos.setPos('push', startX, startY);
        }
    }

    public mouseMove(e: any) {
        if (this.isDrawing) {
            var startX = e.pageX - this.activeCanvas.rawCanvasObj.offsetLeft;
            var startY = e.pageY - this.activeCanvas.rawCanvasObj.offsetTop;

            if (this.gui.tool == 'pen')
                this.activeDrawing.currPos.setPos('push', startX, startY);
            this.activeDrawing.currPos.setPos('end', startX, startY);           
            this.activeCanvas.redrawCanvas();
            this.activeCanvas.drawObject(this.activeDrawing, true);
        }
    }

    public mouseUp() {
        this.isDrawing = false;
        this.moveX = 0;
        this.moveY = 0;
        this.activeDrawing.currPos.setBoxSize(this.gui.tool);
        this.activeCanvas.drawings.push(this.activeDrawing);
        this.activeDrawing = new Drawing();
    }

    public activateCanvas(canvas: Canvas) {
        this.activeCanvas = canvas;
    }
}
