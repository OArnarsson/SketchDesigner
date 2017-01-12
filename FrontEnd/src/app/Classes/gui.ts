export class GUI {
  public strokeStyle: string;
  public lineWidth: number;
  public lineCap: string;
  public lineJoin: string;
  public tool: string;

  constructor(){
    this.strokeStyle = "black";
    this.lineCap = "round";
    this.lineJoin = "round";
    this.lineWidth = 2;
    this.tool = 'pen';
  }
}
