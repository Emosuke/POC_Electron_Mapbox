apboxgl.accessToken = '';

console.log('Version: ' + mapboxgl.version);

const container = document.createElement('div');
container.style.width = '1200px';
container.style.height = '700px';

document.body.appendChild(container);

const map = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-77.01866, 38.888],
    zoom: 13
});

map.on('load', () => {
    map.repaint = true;

    setTimeout(() => {
        const _render = mapboxgl.Map.prototype._render;
        const durations = [];

        map._render = () => {
            const now = performance.now();
            _render.call(map);
            durations.push(performance.now() - now);
        };
        setTimeout(() => {
            map.repaint = false;
            durations.sort((a, b) => a - b);
            console.log('Median frame: ' + Math.round(100 * durations[Math.floor(durations.length / 2)]) / 100);

            window.close();
        }, 5000);
    }, 1000);
});