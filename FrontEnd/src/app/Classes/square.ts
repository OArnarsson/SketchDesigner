import {GUI} from '../Classes/gui'

export class Square {
  public tool: string;
  public startX: number;
  public startY: number;
  public width: number;
  public height: number;
  public gui: GUI;


  constructor(){
    this.tool = 'square'
    this.gui = new GUI();
  }

  startPos(x, y) {
    this.startX = x;
    this.startY = y;
  }

  endPos(x, y) {
    this.width = x - this.startX;
    this.height = y - this.startY;
  }
}

