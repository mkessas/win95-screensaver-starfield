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

const Resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sim.Resize(window.innerWidth, window.innerHeight);
};

const KeyDown = (e: any) => {

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

}

Resize();
sim.Start();
window.addEventListener('resize', Resize);
window.addEventListener('keydown', KeyDown);
