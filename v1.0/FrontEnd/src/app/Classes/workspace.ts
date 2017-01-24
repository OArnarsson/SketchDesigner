import { JsonCanvas } from './json-canvas'
export class Workspace {
    public title: string;
    public dateCreated: string;
    public dateModified: string;
    public canvasArr: JsonCanvas[];
    constructor(obj?) {
        this.title = "Untitiled";
        this.dateCreated = this.longDate();
        this.dateModified = this.longDate();
        this.canvasArr = new Array;
        for (var prop in obj) {
            if (prop != '_id' && prop != '__v') {
                this[prop] = obj[prop];
            }
        }
    }

    public longDate() {
        let d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + ":" + ("0" + d.getMilliseconds()).slice(-3);
        return datestring;
    }
}
