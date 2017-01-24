import {Drawing} from './drawing';


export class Canvas {
    public drawings: Drawing[];
    public height: number;
    public width: number;
    public className: string;
    public rawCanvasObj: HTMLElement;
    public renderContext: CanvasRenderingContext2D;

    constructor(obj?) {
        this.drawings = [];
        this.className = 'mobile';
        this.height = 248.4;
        this.width = 441.6;
        for (let prop in obj){
            if(prop == 'drawings') {
                for(let drawing of obj[prop]) {
                    console.log(drawing);
                    console.log("im here");
                    this.drawings.push(new Drawing(drawing));
                }
            }
            else {
                this[prop] = obj[prop];
            }
        }
    }
}
