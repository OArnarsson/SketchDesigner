export class GUI {
  public strokeStyle: string;
  public lineWidth: number;
  public lineCap: string;
  public lineJoin: string;
  public tool: string;

  constructor(){
    this.strokeStyle = "#000000";
    this.lineCap = "round";
    this.lineJoin = "round";
    this.lineWidth = 5;
    this.tool = 'pen';
  }
}
