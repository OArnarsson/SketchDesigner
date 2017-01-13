import {GUI} from '../Classes/gui'

export class Line {
  public tool: string;
  public startX: number;
  public startY: number;
  public endX: number;
  public endY: number;
  public gui: GUI;


  constructor(){
    this.tool = 'line';
    this.gui = new GUI();
  }

  startPos(x, y) {
    this.startX = x;
    this.startY = y;
  }

  endPos(x, y) {
    this.endX = x
    this.endY = y;
  }
}

