import {JsonCanvas} from './json-canvas'
export class Workspace {
	public title: string;
	public dateCreated: string;
	public dateModified: string;
	public canvasArr: JsonCanvas[];
	constructor(obj?){
		this.title  = "Untitiled";
		this.dateCreated = "20.01.2017 13:07:55";
		this.dateCreated = "20.01.2017 13:07:55";
		this.canvasArr = new Array;
        for (var prop in obj){
            if(prop != '_id' && prop != '__v') {
                this[prop] = obj[prop];
            }
        }
	}
}
