class StatsPanel {
  private min = Infinity;

  private max = 0;

  private PIXEL_RATIO = Math.round(window.devicePixelRatio || 1);

  private WIDTH = 80 * this.PIXEL_RATIO;

  private HEIGHT = 48 * this.PIXEL_RATIO;

  private TEXT_X = 3 * this.PIXEL_RATIO;

  private TEXT_Y = 2 * this.PIXEL_RATIO;

  private GRAPH_X = 3 * this.PIXEL_RATIO;

  private GRAPH_Y = 15 * this.PIXEL_RATIO;

  private GRAPH_WIDTH = 74 * this.PIXEL_RATIO;

  private GRAPH_HEIGHT = 30 * this.PIXEL_RATIO;

  private ctx: CanvasRenderingContext2D;

  private name: string;

  private bg: string | CanvasGradient | CanvasPattern;

  private fg: string | CanvasGradient | CanvasPattern;

  dom: HTMLCanvasElement;

  constructor(
    name: string,
    fg: string | CanvasGradient | CanvasPattern,
    bg: string | CanvasGradient | CanvasPattern,
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    canvas.style.cssText = `
      width: ${this.WIDTH / this.PIXEL_RATIO}px;
      height: ${this.HEIGHT / this.PIXEL_RATIO}px;
    `;

    this.ctx = canvas.getContext('2d')!;
    this.dom = canvas;
    this.bg = bg;
    this.fg = fg;
    this.name = name;
    this.draw();
  }

  draw() {
    this.ctx.font = `bold ${9 * this.PIXEL_RATIO}px Helvetica,Arial,sans-serif`;
    this.ctx.textBaseline = 'top';

    this.ctx.fillStyle = this.bg;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.ctx.fillStyle = this.fg;
    this.ctx.fillText(this.name, this.TEXT_X, this.TEXT_Y);
    this.ctx.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);

    this.ctx.fillStyle = this.bg;
    this.ctx.globalAlpha = 0.9;
    this.ctx.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
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
      this.TEXT_Y,
    );

    this.ctx.drawImage(
      this.dom,
      this.GRAPH_X + this.PIXEL_RATIO,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PIXEL_RATIO,
      this.GRAPH_HEIGHT,
      this.GRAPH_X,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PIXEL_RATIO,
      this.GRAPH_HEIGHT,
    );

    this.ctx.fillRect(
      this.GRAPH_X + this.GRAPH_WIDTH - this.PIXEL_RATIO,
      this.GRAPH_Y,
      this.PIXEL_RATIO,
      this.GRAPH_HEIGHT,
    );

    this.ctx.fillStyle = this.bg;
    this.ctx.globalAlpha = 0.9;
    this.ctx.fillRect(
      this.GRAPH_X + this.GRAPH_WIDTH - this.PIXEL_RATIO,
      this.GRAPH_Y,
      this.PIXEL_RATIO,
      Math.round((1 - value / maxValue) * this.GRAPH_HEIGHT),
    );
  }
}

export default StatsPanel;
