/* eslint-disable no-restricted-globals */
/**
 * @author mrdoob / http://mrdoob.com/
 * 
 * Updated to TypeScript by @aaronpo97  
 */

import StatsPanel from "./StatsPanel";

class Stats {
  mode: number;
  container: HTMLDivElement;
  beginTime: number;
  prevTime: number;
  frames: number;
  fpsPanel: StatsPanel;
  msPanel: StatsPanel;
  memPanel?: StatsPanel;
  dom: HTMLDivElement;
  beginFrames: number | undefined;

  constructor() {
    this.mode = 0;
    this.container = document.createElement("div");
    this.container.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        this.mode = (this.mode + 1) % this.container.children.length;
        this.showPanel(this.mode);
      },
      false
    );

    this.beginTime = (performance || Date).now();
    this.prevTime = this.beginTime;
    this.frames = 0;
    this.fpsPanel = this.addPanel(new StatsPanel("FPS", "#0ff", "#002"));
    this.msPanel = this.addPanel(new StatsPanel("MS", "#0f0", "#020"));
    this.memPanel = undefined;

    // @ts-expect-error
    if (self.performance && self.performance.memory) {
      this.memPanel = this.addPanel(new StatsPanel("MB", "#f08", "#201"));
    }

    this.showPanel(0);
    this.dom = this.container;
  }

  begin() {
    this.beginTime = (performance || Date).now();
  }

  end() {
    this.frames += 1;

    const time = (performance || Date).now();

    this.msPanel.update(time - this.beginTime, 200);

    if (time >= this.prevTime + 1000) {
      this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);
      this.prevTime = time;
      this.beginFrames = 0;

      if (this.memPanel) {
        // @ts-expect-error
        const { memory } = performance;
        this.memPanel.update(
          memory.usedJSHeapSize / 1048576,
          memory.jsHeapSizeLimit / 1048576
        );
      }
    }

    return time;
  }

  update() {
    this.beginTime = this.end();
  }

  showPanel(id: number) {
    for (let i = 0; i < this.container.children.length; i += 1) {
      const child = this.container.children[i] as HTMLElement;
      child.style.display = i === id ? "block" : "none";
    }

    this.mode = id;
  }

  addPanel(panel: StatsPanel) {
    this.container.appendChild(panel.dom);
    return panel;
  }
}



export default Stats;
