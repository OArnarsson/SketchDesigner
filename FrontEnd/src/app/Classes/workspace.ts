import {JsonCanvas} from './json-canvas'
export class Workspace {
	public title: string;
	public dateCreated: string;
	public dateModified: string;
	public canvasArr: JsonCanvas[];
	constructor(obj?){
		this.title  = "Untitiled";
		this.dateCreated = "asdasd"
		this.dateCreated = "asdasd";
		this.canvasArr = new Array;
        for (var prop in obj){
            if(prop != '_id' && prop != '__v') {
                this[prop] = obj[prop];
            }
        }
	}
}
