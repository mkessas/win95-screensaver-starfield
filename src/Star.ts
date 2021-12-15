export type Location = {
    x: number;
    y: number;
}

export enum Speed {
    Slowest = 1,
    Slow,
    Medium,
    Fast,
    Fastest,
}

export class Star {

    private _x: number = 0; // X location
    private _y: number = 0; // Y location
    private _direction: number; // in radians
    private _c: number = 0; // color
    private _speed: number; // speed
    public _acc: number = 1; // acceleration
    public _r: number = 1; // size of the star
    private _cycle: number = 1; // how many epochs this star has existed

    constructor() {
        this._direction = Math.random() * Math.PI * 2 - Math.PI;
        this._speed = Math.round(Math.random() * (Speed.Fastest  - 1)) + Speed.Slowest;
    }

    tick() {
        this._x = this._acc * Math.cos(this._direction);
        this._y = this._acc * Math.sin(this._direction);
        this._cycle *= 1.1;
        this._acc += this._cycle * this._speed / 2;
        this._r += .03;

        if (this._c + 0.002  * this._cycle < 1) this._c += .002 * this._cycle;
    }

    get x() { return this._x; }

    get y() { return this._y; }

    get r() { return this._r; }

    get c() { return this._c; }

}