export class Pen {
  public tool: string;
  public posX: number[];
  public posY: number[];


    constructor(){
        this.tool = 'pen'
        this.posX = [];
        this.posY = [];
    }

    pushPos(x, y) {
      this.posX.push(x);
      this.posY.push(y);
    }
}

