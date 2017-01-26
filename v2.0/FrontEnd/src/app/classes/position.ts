export class Position {
    public startX: number;
    public endX: number;
    public posX: number[];
    public startY: number;
    public endY: number;
    public posY: number[];
    public width:number;
    public height: number;

    public constructor(obj?) {
        this.startX = 0;
        this.endX = 0;
        this.posX = [];
        this.startY = 0;
        this.endY = 0;
        this.posY = [];
        this.width = 0;
        this.height = 0;
        for (let prop in obj) this[prop] = obj[prop];
    }

    public setPos(action, x, y) {
        if(action == 'start') {
            this.startX = x;
            this.startY = y;
        }
        if(action == 'end') {
            this.endX = x;
            this.endY = y;
            this.width = this.endX - this.startX;
            this.height = this.endY - this.startY;
        }
        if(action == 'push') {
            this.posX.push(x);
            this.posY.push(y);
        }
    }

    public movePos(tool, x, y) {
        this.startX += x;
        this.startY += y;
        if(tool == 'pen') {
            for (let pos of this.posX)
                pos += x;
            for (let pos of this.posY)
                pos += y;
        }
        this.endX += x;
        this.endY += y;
        
    }

    public setBoxSize(tool) {
        if(tool == 'pen') {
            this.startX = Math.min.apply(null, this.posX);
            this.endX = Math.max.apply(null, this.posX);
            this.startY = Math.min.apply(null, this.posY);
            this.endY = Math.max.apply(null, this.posY);
        }

        this.width = this.endX - this.startX;
        this.height = this.endY - this.startY;
    }
}