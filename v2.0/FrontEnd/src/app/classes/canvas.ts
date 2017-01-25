import { Drawing } from './drawing';


export class Canvas {
    public drawings: Drawing[];
    public height: number;
    public width: number;
    public className: string;
    public rawCanvasObj: any;
    public renderContext: any;

    constructor(obj?) {
        this.drawings = [];
        this.className = 'mobile';
        this.width = 248.4;
        this.height = 441.6;
        for (let prop in obj) {
            if (prop == 'drawings')
                for (let drawing of obj[prop])
                    this.drawings.push(new Drawing(drawing));
            else
                this[prop] = obj[prop];
        }
    }

    public clearCanvas() {
        this.renderContext.clearRect(0, 0, this.width, this.height);
    }

    public redrawCanvas() {
        this.clearCanvas();
        for (let drawing of this.drawings) {
            this.renderContext.beginPath();
            this.drawObject(drawing, false);
            this.renderContext.stroke();
            this.renderContext.closePath();
        }
    }

    public drawObject(drawing: Drawing, isLive) {
        //for(let prop in drawing.gui) this.renderContext[prop] = drawing.gui[prop];
        this.renderContext.lineWidth = drawing.gui.lineWidth;
        this.renderContext.lineCap = drawing.gui.lineCap;
        this.renderContext.strokeStyle = drawing.gui.strokeStyle;
        this.renderContext.fillStyle = drawing.gui.fillStyle;
        this.renderContext.globalAlpha = drawing.gui.opacity / 100;
        let pos = drawing.currPos;


        if (isLive) {
            this.renderContext.beginPath();
        }

        if (drawing.gui.tool == 'pen') {
            this.renderContext.moveTo(pos.posX[0], pos.posY[0]);
            for (var i = 0; i < pos.posX.length; i++) {
                this.renderContext.lineTo(pos.posX[i], pos.posY[i]);
            }
            if (drawing.gui.hasFill) {
                this.renderContext.fill();
            }
        }

        if (drawing.gui.tool == 'square') {
            this.renderContext.strokeRect(pos.startX, pos.startY, pos.width, pos.height);
            if (drawing.gui.hasFill) {
                this.renderContext.fillRect(pos.startX, pos.startY, pos.width, pos.height);
            }
        }

        if (drawing.gui.tool == 'circle') {
            this.renderContext.moveTo(pos.startX, pos.startY + (pos.endY - pos.startY) / 2);
            this.renderContext.bezierCurveTo(pos.startX, pos.startY, pos.endX, pos.startY, pos.endX, pos.startY + (pos.endY - pos.startY) / 2);
            this.renderContext.bezierCurveTo(pos.endX, pos.endY, pos.startX, pos.endY, pos.startX, pos.startY + (pos.endY - pos.startY) / 2);
            if (drawing.gui.hasFill) {
                this.renderContext.fill();
            }
        }

        if (drawing.gui.tool == 'line') {
            this.renderContext.moveTo(pos.startX, pos.startY);
            this.renderContext.lineTo(pos.endX, pos.endY);
        }

        if (drawing.gui.tool == 'text') {
            if (drawing.gui.textprops.value == '') {
                return;
            }
            let x = "";
            if (drawing.gui.textprops.bold) {
                x = "bold ";
            }
            if (drawing.gui.textprops.italic) {
                x = x + "italic ";
            }
            x = x + drawing.gui.textprops.fontSize + "px " + " " + drawing.gui.textprops.font;
            this.renderContext.font = x;
            this.renderContext.fillStyle = drawing.gui.strokeStyle;
            this.renderContext.fillText(drawing.gui.textprops.value, pos.startX, pos.startY);
        }

        if (isLive) {
            this.renderContext.stroke();
            this.renderContext.closePath();
        }
    }
}


