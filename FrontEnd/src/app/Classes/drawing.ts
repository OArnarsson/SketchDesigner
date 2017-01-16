import {GUI} from '../Classes/gui'

export class Drawing {
  public tool: string;
  public startX: number;
  public startY: number;
  public endX: number;
  public endY: number;
  public posX: number[];
  public posY: number[];
  public value: string;
  public gui: GUI;


    constructor(tool: string){
      this.gui = new GUI();
      this.tool = tool;
      this.posX = [];
      this.posY = [];
      this.value = "";
    }

  startPos(x, y) {
    this.startX = x;
    this.startY = y;
  }

  endPos(x, y) {
    if(this.tool == 'square') {
      this.endX = x - this.startX;
      this.endY = y - this.startY;
    }

    else {
      this.endX = x;
      this.endY = y;
    }
  }

    pushPos(x, y) {
      this.posX.push(x);
      this.posY.push(y);
    }

    setBoxSize(x, y){
        if(x < this.startX){
            this.startX = x;
        }
        if(x> this.endX){
            this.endX = x;
        }
        if(y < this.startY){
            this.startY = y;
        }
        if(y> this.endY){
            this.endY = y;
        }
    }
}

