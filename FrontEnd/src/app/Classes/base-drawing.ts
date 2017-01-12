export class BaseDrawing {
    public strokeColor: string;
    public lineWidth: number;
    public clickX: number[];
    public clickY: number[];
    public clickDrag:any[];


    constructor(){
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.strokeColor = "black";
        this.lineWidth = 2;
    }
}
