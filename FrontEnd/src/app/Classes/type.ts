import {GUI} from '../Classes/gui'
export class Type {
    public tool: string;
    public value: string;
    public startX: number;
    public startY: number;
    public width: number;
    public height: number;
    public gui: GUI;
    constructor(){
        this.tool = "type";
        this.startX = 0;
        this.startY = 0;
        this.width = 0;
        this.height = 0;
        this.value = "";
        this.gui = new GUI();
    }
}
