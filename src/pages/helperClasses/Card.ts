export class Card { 
    private _width: number;
    private _pid: string;
    private _gender: string;
    private _firstName: string;
    private _lastName: string;
    private _birthYear: string;
    private _deathYear: string;
    private _imgSrc: string;
    private _xcoord: number;
    private _ycoord: number;

    constructor(
        width: number, pid: string, gender: string, firstName: string, 
        lastName: string, birthYear: string, deathYear: string, 
        imgSrc: string, xcoord: number, ycoord: number
    ) {
        this._width = width;
        this._pid = pid;
        this._gender = gender;
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
        this._deathYear = deathYear;
        this._imgSrc = imgSrc;
        this._xcoord = xcoord;
        this._ycoord = ycoord;
    }

    // Getters and Setters
    get width(): number {
        return this._width;
    }
    set width(value: number) {
        this._width = value;
    }

    get pid(): string {
        return this._pid;
    }
    set pid(value: string) {
        this._pid = value;
    }

    get gender(): string {
        return this._gender;
    }
    set gender(value: string) {
        this._gender = value;
    }

    get firstName(): string {
        return this._firstName;
    }
    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }
    set lastName(value: string) {
        this._lastName = value;
    }

    get birthYear(): string {
        return this._birthYear;
    }
    set birthYear(value: string) {
        this._birthYear = value;
    }

    get deathYear(): string {
        return this._deathYear;
    }
    set deathYear(value: string) {
        this._deathYear = value;
    }

    get imgSrc(): string {
        return this._imgSrc;
    }
    set imgSrc(value: string) {
        this._imgSrc = value;
    }

    get xcoord(): number {
        return this._xcoord;
    }
    set xcoord(value: number) {
        this._xcoord = value;
    }

    get ycoord(): number {
        return this._ycoord;
    }
    set ycoord(value: number) {
        this._ycoord = value;
    }
}