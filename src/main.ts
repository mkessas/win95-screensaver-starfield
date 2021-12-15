import './sass/style.scss';
import { Simulator } from './Simulator';

const state = {
    running: true,
    count: 300,
    refresh: 60,
}

const canvas = document.getElementById('starfield') as HTMLCanvasElement;

const sim = new Simulator({
    Canvas: canvas,
    MaxStars: state.count,
    Refresh: state.refresh,
})

sim.Start();

const body = document.querySelector("body");
body.addEventListener('keydown', function (e) {

    switch (e.key) {
        case ' ':
            if (state.running) sim.Pause(); else sim.Unpause();
            state.running = !state.running;
            break;

        case 'ArrowUp':
            sim.AddStars();
            break;

        case 'ArrowDown':
            sim.RemoveStars();
            break;
        
        case 'ArrowRight':
            sim.SpeedUp();
            break;

        case 'ArrowLeft':
            sim.SlowDown();
            break;
    }

    console.log(e);
})