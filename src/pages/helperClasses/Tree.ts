import { Card } from "./Card";

export class Tree{
    private _cards: Card[];
    public rootPID: string;

    constructor(rootPID: string){
        this._cards = [];
            // note: for now focusing only on ancestors, will do descendants after
        this.rootPID = rootPID
    }

    // using get method here because this is read only
    public get cards(): Card[] {
        return this._cards;
    }
}