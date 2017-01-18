import {Drawing} from './drawing'
export class JsonCanvas {
    public class: string;
    public canvasWidth: number;
    public canvasHeight: number;
    public allDrawings: Drawing[];
    constructor(){
        this.class = "mobile";
        this.canvasWidth = 248.4;
        this.canvasHeight = 441.6;
        this.allDrawings = [];
    }
}
