export class Selection {

  public lowX: number;
  public lowY: number;
  public highX: number;
  public highY: number;

  constructor(tool, startX: number, startY: number, endX: number, endY: number) {
    if(tool == 'square'){
      if(startX < 0) {
        startX = endX + startX;
      }
      if(startY < 0) {
        startY = endY+startY;
      }

      endX = endX+startX;
      endY = endY+startY;
    }

    if(Math.abs(startX) > Math.abs(endX)) {
      this.lowX = Math.abs(endX);
      this.highX = Math.abs(startX);
    }
    else {
      this.lowX = Math.abs(startX);
      this.highX = Math.abs(endX);
    }
    if(Math.abs(startY) > Math.abs(endY)) {
      this.lowY = Math.abs(endY);
      this.highY = Math.abs(startY);
    }
    else {
      this.lowY = Math.abs(startY);
      this.highY = Math.abs(endY);
    }
  }

  movePos(x, y) {
    this.lowX += x;
    this.highX += x;
    this.lowY += y;
    this.highY += y;
  }

  topLeft() {
    return (this.lowX, this.highY);
  }

  topMiddle() {
    return (this.highX-this.lowX, this.highY);
  }

  topRight() {
    return (this.highX, this.highY);
  }

  bottomLeft() {
    return (this.lowX, this.lowY);
  }

  bottomMiddle() {
    return (this.highX-this.lowX, this.lowY);
  }

  bottomRight() {
    return (this.highX, this.lowY);
  }

  midLeft() {
    return (this.lowX, this.highX-this.lowY);
  }

  midRight() {
    return (this.highX, this.highX-this.lowY);
  }

  public getWidth(){
    return this.highX-this.lowX;
  }
  public getHeight(){
    return this.highY-this.lowY;
  }
}
