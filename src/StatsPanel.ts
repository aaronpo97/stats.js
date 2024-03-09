class StatsPanel {
  min = Infinity;
  max = 0;
  PR = Math.round(window.devicePixelRatio || 1);
  WIDTH = 80 * this.PR;
  HEIGHT = 48 * this.PR;
  TEXT_X = 3 * this.PR;
  TEXT_Y = 2 * this.PR;
  GRAPH_X = 3 * this.PR;
  GRAPH_Y = 15 * this.PR;
  GRAPH_WIDTH = 74 * this.PR;
  GRAPH_HEIGHT = 30 * this.PR;
  dom: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  name: string;

  bg: string | CanvasGradient | CanvasPattern;
  fg: string | CanvasGradient | CanvasPattern;

  constructor(
    name: string,
    fg: string | CanvasGradient | CanvasPattern,
    bg: string | CanvasGradient | CanvasPattern
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    canvas.style.cssText = "width:80px;height:48px";

    this.ctx = canvas.getContext("2d")!;
    this.dom = canvas;

    this.bg = bg;
    this.fg = fg;
    this.name = name;

    this.draw();
  }

  draw() {
    this.ctx.font = `bold ${9 * this.PR}px Helvetica,Arial,sans-serif`;
    this.ctx.textBaseline = "top";

    this.ctx.fillStyle = this.bg;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.ctx.fillStyle = this.fg;
    this.ctx.fillText(this.name, this.TEXT_X, this.TEXT_Y);
    this.ctx.fillRect(
      this.GRAPH_X,
      this.GRAPH_Y,
      this.GRAPH_WIDTH,
      this.GRAPH_HEIGHT
    );

    this.ctx.fillStyle = this.bg;
    this.ctx.globalAlpha = 0.9;
    this.ctx.fillRect(
      this.GRAPH_X,
      this.GRAPH_Y,
      this.GRAPH_WIDTH,
      this.GRAPH_HEIGHT
    );
  }
  update(value: number, maxValue: number) {
    this.min = Math.min(this.min, value);
    this.max = Math.max(this.max, value);

    this.ctx.fillStyle = this.bg;
    this.ctx.globalAlpha = 1;
    this.ctx.fillRect(0, 0, this.WIDTH, this.GRAPH_Y);
    this.ctx.fillStyle = this.fg;
    this.ctx.fillText(
      `${Math.round(value)} ${this.name} (${Math.round(this.min)}-${Math.round(this.max)})`,
      this.TEXT_X,
      this.TEXT_Y
    );

    this.ctx.drawImage(
      this.dom,
      this.GRAPH_X + this.PR,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PR,
      this.GRAPH_HEIGHT,
      this.GRAPH_X,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PR,
      this.GRAPH_HEIGHT
    );

    this.ctx.fillRect(
      this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
      this.GRAPH_Y,
      this.PR,
      this.GRAPH_HEIGHT
    );

    this.ctx.fillStyle = this.bg;
    this.ctx.globalAlpha = 0.9;
    this.ctx.fillRect(
      this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
      this.GRAPH_Y,
      this.PR,
      Math.round((1 - value / maxValue) * this.GRAPH_HEIGHT)
    );
  }
}

export default StatsPanel;