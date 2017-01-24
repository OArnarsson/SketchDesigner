import {Workspace} from './workspace';
import {Canvas} from './canvas';
import {Drawing} from './drawing';
import {Gui} from './gui';

export class Manipulator {
    public workspace: Workspace;
    public activeCanvas: Canvas;
    public selectedDrawings: Drawing[];
    public gui: Gui;
    public moveX: number;
    public moveY: number;

    public constructor(workspace:Workspace) {
        this.workspace = workspace;
        this.activeCanvas = this.workspace.canvases[0];
        this.selectedDrawings = [];
        this.gui = new Gui();
        this.moveX = 0;
        this.moveY = 0;
    }
}
