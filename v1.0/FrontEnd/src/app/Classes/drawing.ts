import { GUI } from '../Classes/gui'
import { Selection } from '../Classes/selection'


export class Drawing {
    public tool: string;
    public startX: number;
    public startY: number;
    public endX: number;
    public endY: number;
    public posX: number[];
    public posY: number[];
    public moveXby: number;
    public moveYby: number;
    public value: string;
    public found: boolean;
    public selection: Selection;
    public gui: GUI;


    constructor(obj?) {
        this.gui = new GUI();
        this.tool = this.gui.tool.toString();
        this.posX = [];
        this.posY = [];
        this.moveXby = 0;
        this.moveYby = 0;
        this.value = "";
        this.found = false;


        // This maps the JSON parse into a drawing class, not an object class
        for (var prop in obj) this[prop] = obj[prop];
        if (obj != null) this.selection = new Selection(this.tool, this.startX, this.startY, this.endX, this.endY);
        // If we are not parsing, we do not have a valid endX and endY in all cases
        else this.selection = new Selection(this.tool, 0, 0, 0, 0);
    }

    startPos(x, y) {
        this.startX = x;
        this.startY = y;
    }

    endPos(x, y) {
        this.endX = x;
        this.endY = y;
        if (this.tool == 'square') {
            this.endX = x - this.startX;
            this.endY = y - this.startY;
        }
        if (this.tool == 'text') {
            this.endX = this.startX + x;
            this.endY = this.startY - y;
        }
    }

    movePos(x, y) {
        this.startX += x;
        this.startY += y;

        if (this.tool != 'square') {
            this.endX += x;
            this.endY += y;
        }
    }

    pushPos(x, y) {
        this.posX.push(x);
        this.posY.push(y);
    }

    setBoxSize(x, y) {
        if (x < this.startX) {
            this.startX = x;
        }
        if (x > this.endX) {
            this.endX = x;
        }
        if (y < this.startY) {
            this.startY = y;
        }
        if (y > this.endY) {
            this.endY = y;
        }
    }

}

