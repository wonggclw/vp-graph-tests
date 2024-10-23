export class Card{
    private _firstName: string;
    private _lastName: string;

    // only used for display purposes so doesn't need to be a number
    private _birthYear: string;
    private _deathYear: string;

    private _imgSrc: string;

    public xcoord: number;
    public ycoord: number;

    constructor(firstName: string, lastName: string, birthYear: string, deathYear: string, 
                xcoord?: number, ycoord?: number){
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
        this._deathYear = deathYear;

        // makes sure these optional parameters are not undefined, but instead initialized to a default value
        this.xcoord = xcoord !== undefined ? xcoord : 0;
        this.ycoord = ycoord !== undefined ? ycoord : 0;
    }

    // using get methods here because these fields are read only
    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get birthYear(): string {
        return this._birthYear;
    }

    public get deathYear(): string {
        return this._deathYear;
    }

    public get imgSrc(): string {
        return this._imgSrc;
    }

}