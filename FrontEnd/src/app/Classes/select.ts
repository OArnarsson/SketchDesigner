import {GUI} from '../Classes/gui'
export class Select {
    public drawing:any;
    public gui: GUI;


    constructor(obj:any){
        this.drawing = obj;
        this.gui = new GUI();
    }
}
