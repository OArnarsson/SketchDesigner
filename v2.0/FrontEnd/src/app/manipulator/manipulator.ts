import {Workspace} from '../classes/workspace';
import {Canvas} from '../classes/canvas';
import {Drawing} from '../classes/drawing';
import {Gui} from '../classes/gui';

export class Manipulator {
    public workspace: Workspace;
    public activeCanvas: Canvas;
    public selectedDrawings: Drawing[];
    public gui: Gui;
    public moveX: number;
    public moveY: number;

    public constructor(workspace:Workspace) {
        this.workspace = new Workspace(workspace);
        this.activeCanvas = this.workspace.canvases[0];
        this.selectedDrawings = [];
        this.gui = new Gui();
        this.moveX = 0;
        this.moveY = 0;
    }
}
