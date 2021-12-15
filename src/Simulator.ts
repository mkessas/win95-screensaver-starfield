import { Star } from './Star';

export type SimulatorOptions = {
    MaxStars?: number;
    Refresh?: number;
    Canvas: HTMLCanvasElement,
}

export type SimulatorState = {
    Stars: number;
    Refresh: number;
}

export class Simulator {

    private _stars: Star[] = [];
    
    private _maxStars: number = 300;
    private _refresh: number = 60;
    
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _height: number;
    private _width: number;
    
    private _run: boolean = true;
    private _dirty: boolean;

    constructor (opt: SimulatorOptions) {
        this.Update(opt);
    }

    public Start() {
        this.run();
        this.plot();
    }

    private run() {
        setTimeout(this.run.bind(this), this._refresh);

        if (!this._run) return;


        this._stars.forEach((star, i) => {
            star.tick();
            if (star.x + this._width / 2 > this._width || star.x + this._width / 2 < 0 || star.y + this._height / 2 > this._height || star.y + this._height / 2 < 0) {
                this._stars[i] = new Star();
            }
        });

        // Gradually adjust the number of stars to meet the required threshold
        if (this._stars.length < this._maxStars) {
            this._stars.push(new Star());
        }

        if (this._stars.length > this._maxStars) {
            this._stars.pop();
        }

        // Trigger a redraw
        this._dirty = true;
    }

    private plot() {
        window.requestAnimationFrame(this.plot.bind(this));
        
        if (!this._run || !this._dirty) return;
        
        this._ctx.clearRect(0, 0, this._width, this._height);
        
        this._ctx.fillStyle = "white";
        
        this._stars
            .forEach(star => {
                this._ctx.beginPath();
                this._ctx.globalAlpha = star.c;
                this._ctx.rect(star.x + this._width / 2, star.y + this._height / 2, star.r, star.r);
                this._ctx.fill();
            });
    }

    public Update(opt: SimulatorOptions) {
        if (opt.MaxStars) this._maxStars = opt.MaxStars;
        if (opt.Refresh) this._refresh = opt.Refresh;
        this._canvas = opt.Canvas;
        this._ctx = this._canvas.getContext('2d');
        this._height = this._canvas.height;
        this._width = this._canvas.width;
    }

    public Pause() {
        this._run = false;
    }

    public Unpause() {
        this._run = true;
    }

    public SpeedUp(): number  {
        if (this._refresh > 10) this._refresh -= 5;
        return this._refresh;
    }

    public GetState(): SimulatorState {
        return {
            Refresh: Math.round(1000 / this._refresh),
            Stars: this._stars.length,
        }
    }

    public SlowDown(): number {
        if (this._refresh < 120) this._refresh += 5;
        return this._refresh;
    }

    public AddStars(): number {
        this._maxStars += 10;
        return this._maxStars;
    }

    public RemoveStars(): number  {
        if (this._maxStars >= 10) this._maxStars -= 10;
        return this._maxStars;
    }

    public Resize(w: number, h: number) {
        this._width = w;
        this._height = h;
    }
}
