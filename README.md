# stats.js

## About

This is a fork of Mr. Doob's `stats.js`, found [here](https://github.com/mrdoob/stats.js), for use in my own personal Three.js projects.

### Changes from original

- Updated to TypeScript to use ES6 class syntax, replacing the function constructor pattern.

## JavaScript Performance Monitor

This class provides a simple info box that will help you monitor your code performance.

- **FPS** Frames rendered in the last second. The higher the number the better.
- **MS** Milliseconds needed to render a frame. The lower the number the better.
- **MB** MBytes of allocated memory. (Run Chrome with `--enable-precise-memory-info`)
- **CUSTOM** User-defined panel support.

### Screenshots

![fps.png](files/fps.png)
![ms.png](files/ms.png)
![mb.png](files/mb.png)
![custom.png](files/custom.png)

### Installation

```bash
npm install fork_stats.js
```

### Usage

```javascript
const stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();

  // monitored code goes here

  stats.end();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```
