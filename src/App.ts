import './sass/style.scss';
import { Simulator } from './Simulator';

type State = {
    running: boolean;
    count: number;
    refresh: number;
}

export default class App {
    private _state: State = {
        running: true,
        count: 300,
        refresh: 60,
    }
    private _canvas: HTMLCanvasElement;
    private _sim: Simulator;

    constructor () {
        this._canvas = document.getElementById('starfield') as HTMLCanvasElement;

        this._sim = new Simulator({
            Canvas: this._canvas,
            MaxStars: this._state.count,
            Refresh: this._state.refresh,
        });

        window.addEventListener('resize', this.Resize.bind(this));
        window.addEventListener('keydown', this.KeyDown.bind(this));
    }

    public Start() {
        this.Resize();
        this._sim.Start();
        this.UpdateStats();
    }

    private Resize() {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._sim.Resize(window.innerWidth, window.innerHeight);
    };

    private KeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case ' ':
                if (this._state.running) this._sim.Pause(); else this._sim.Unpause();
                this._state.running = !this._state.running;
                break;

            case 'ArrowUp':
                this._state.count = this._sim.AddStars();
                break;

            case 'ArrowDown':
                this._state.count = this._sim.RemoveStars();
                break;

            case 'ArrowRight':
                this._state.refresh = this._sim.SpeedUp();
                break;

            case 'ArrowLeft':
                this._state.refresh = this._sim.SlowDown();
                break;

            case 'd':
            case 'D':
                this.ToggleControl(document.querySelector(".control-debug"));
                break;
        }

    }

    private ToggleControl(e: HTMLElement) {
        if (e.classList.contains("visible")) {
            e.classList.remove("visible");
        } else {
            e.classList.add("visible");
        }
    }

    private UpdateStats() {
        const s = this._sim.GetState();
        document.getElementById("speed").innerHTML = s.Refresh.toString();
        document.getElementById("count").innerHTML = `${s.Stars.toString()} of ${this._state.count}`;
        document.getElementById("dim").innerHTML = `${window.innerWidth} x ${window.innerHeight}`;
        setTimeout(this.UpdateStats.bind(this), 100);
    }
}