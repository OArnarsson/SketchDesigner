import {GUI} from '../Classes/gui'

export class Pen {
  public tool: string;
  public startX: number;
  public startY: number;
  public endX: number;
  public endY: number;
  public posX: number[];
  public posY: number[];
  public gui: GUI;


    constructor(){
      this.tool = 'pen'
      this.posX = [];
      this.posY = [];

      this.gui = new GUI();
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

