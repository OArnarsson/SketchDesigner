export class Fonty {
    public font: string;
    public fontSize: number;
    public allFonts: string[];
    public italic: boolean;
    public bold: boolean;
    constructor(){
        this.fontSize = 30;
        this.allFonts = ['Arial','Arial Black','Comic Sans MS','Impact','Lucida Sans Unicode','Tahoma','Titillium Web','Trebuchet MS','Verdana',];
        this.font = this.allFonts[6];
        this.italic = false;
        this.bold = false;
    }
}
