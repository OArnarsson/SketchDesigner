import {GUI} from '../Classes/gui'
export class Select {
    public drawing:any;
    public gui: GUI;
    public moveXby: number;
    public moveYby: number;
    public startX: number;
    public startY: number;
    public found: boolean;


    constructor(obj:any){
        this.drawing = obj;
        this.gui = new GUI();
        this.moveXby = 0;
        this.moveYby = 0;
        this.startX  = 0;
        this.startY = 0;
    }
    startPos(x, y) {
        this.startX = x;
        this.startY = y;
    }
    movePos(x, y){
        this.moveXby = x;
        this.moveYby = y;
    }
}
