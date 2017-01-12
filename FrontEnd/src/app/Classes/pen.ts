import {GUI} from '../Classes/gui'

export class Pen {
  public tool: string;
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
}

