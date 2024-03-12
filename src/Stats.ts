/* eslint-disable no-restricted-globals */
/**
 * @author mrdoob / http://mrdoob.com/
 *
 *   Updated to TypeScript by @aaronpo97
 */

import StatsPanel from './StatsPanel';

class Stats {
  private beginTime: number;

  private container: HTMLDivElement;

  private fpsMaxValue: number | undefined;

  private fpsPanel: StatsPanel;

  private frames: number;

  private memMaxValue: number | undefined;

  private memPanel?: StatsPanel;

  private mode: number;

  private msMaxValue: number | undefined;

  private msPanel: StatsPanel;

  private prevTime: number;

  public beginFrames: number | undefined;

  public dom: HTMLDivElement;

  public fps: number | undefined;

  public mem: number | undefined;

  public ms: number | undefined;

  /**
   * Creates an instance of Stats.
   *
   * @example
   *   const stats = new Stats();
   *   document.body.appendChild(stats.dom);
   *
   *   const animate = () => {
   *     stats.begin();
   *     // Your code here
   *     stats.end();
   *   };
   */
  constructor() {
    this.mode = 0;
    this.container = document.createElement('div');
    this.container.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.mode = (this.mode + 1) % this.container.children.length;
        this.showPanel(this.mode);
      },
      false,
    );

    this.beginTime = (performance || Date).now();
    this.prevTime = this.beginTime;
    this.frames = 0;
    this.fpsPanel = this.addPanel(new StatsPanel('FPS', '#0ff', '#002'));
    this.msPanel = this.addPanel(new StatsPanel('MS', '#0f0', '#020'));

    if (self.performance && self.performance.memory) {
      this.memPanel = this.addPanel(new StatsPanel('MB', '#f08', '#201'));
    }

    this.showPanel(0);
    this.dom = this.container;
  }

  public begin() {
    this.beginTime = performance.now();
  }

  public end() {
    this.frames += 1;

    const time = performance.now();

    this.ms = time - this.beginTime;
    this.msMaxValue = 200;
    this.msPanel.update(this.ms, this.msMaxValue);

    if (time >= this.prevTime + 1000) {
      this.fps = (this.frames * 1000) / (time - this.prevTime);
      this.fpsMaxValue = 150;
      this.fpsPanel.update(this.fps, this.fpsMaxValue);
      this.prevTime = time;
      this.beginFrames = 0;

      if (this.memPanel && performance.memory) {
        const { memory } = performance;
        this.mem = memory.usedJSHeapSize / 1048576;
        this.memMaxValue = memory.jsHeapSizeLimit / 1048576;
        this.memPanel.update(this.mem, this.memMaxValue);
      }
    }

    return time;
  }

  private showPanel(id: number) {
    for (let i = 0; i < this.container.children.length; i += 1) {
      const child = this.container.children[i] as HTMLElement;
      child.style.display = i === id ? 'block' : 'none';
    }

    this.mode = id;
  }

  private addPanel(panel: StatsPanel) {
    this.container.appendChild(panel.dom);
    return panel;
  }
}

export default Stats;
