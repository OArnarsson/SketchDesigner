export class Position {
    public posX: number[];
    public posY: number[];

    public constructor(obj?) {
        this.posX = [];
        this.posY = [];
        for (let prop in obj) this[prop] = obj[prop];
    }

    public pushPos(x, y) {
        this.posX.push(x);
        this.posY.push(y);
    }

    public movePos(tool, x, y) {
        for (let posX of this.posX)
            posX += x;
        if(tool != 'square') {
            for (let posY of this.posY)
                posY += y;
        }
    }
}