import {Position} from './position';
import {Gui} from './gui';


export class Drawing {
    public gui: Gui;
    public currPos: Position;
    public selectionPos: Position;

    constructor (obj?) {
        this.gui = new Gui();
        this.currPos = new Position();
        this.selectionPos = new Position();
        for (let prop in obj) {
            if(prop == 'gui')
                this[prop] = obj[prop];
            if(prop == 'currPos' || prop == 'selectionPos')
                this[prop] = new Position(obj[prop]);
        }
    }
}
