export class GUI {
  public strokeStyle: string;
  public lineWidth: number;
  public lineCap: string;
  public lineJoin: string;
  public tool: string;
  public font: string;
  public fontSize: number;

  constructor(){
    this.strokeStyle = "#000000";
    this.lineCap = "round";
    this.lineJoin = "round";
    this.lineWidth = 5;
    this.tool = 'pen';
    this.font = 'Titillium Web';
    this.fontSize = 30;
  }
  getFontString(fontsize, font){
      return this.fontSize+"px"+" "+this.font;
  }
}
