export class BaseDrawing {
    public prev: {};
    public curr: {};
    public strokeColor: string;
    public lineWidth: number;

    constructor(){
        this.prev = {x:0, y:0};
        this.curr = {x:0, y:0};
        this.strokeColor = "black";
        this.lineWidth = 2;
    }
}
