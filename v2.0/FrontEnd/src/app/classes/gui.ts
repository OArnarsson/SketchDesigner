import {Textprops} from './textprops';


export class Gui {
    public strokeStyle: string;
    public fillStyle: string;
    public lineWidth: number;
    public lineCap: string;
    public lineJoin: string;
    public tool: string;
    public textprops: Textprops;
    public globalAlpha: number;
    public hasFill: boolean;
    public hasBorder: boolean;

    public constructor() {
        this.strokeStyle = "#000000";
        this.lineCap = "round";
        this.lineJoin = "round";
        this.lineWidth = 5;
        this.tool = 'pen';
        this.globalAlpha = 100;
        this.hasFill = false;
        this.hasBorder = true;
        this.fillStyle = "#FFFFFF";
        this.textprops = new Textprops();
    }
}
