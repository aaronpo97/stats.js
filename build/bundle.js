(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Stats = factory());
})(this, (function () { 'use strict';

    var StatsPanel = /** @class */ (function () {
        function StatsPanel(name, fg, bg) {
            this.min = Infinity;
            this.max = 0;
            this.PIXEL_RATIO = Math.round(window.devicePixelRatio || 1);
            this.WIDTH = 80 * this.PIXEL_RATIO;
            this.HEIGHT = 48 * this.PIXEL_RATIO;
            this.TEXT_X = 3 * this.PIXEL_RATIO;
            this.TEXT_Y = 2 * this.PIXEL_RATIO;
            this.GRAPH_X = 3 * this.PIXEL_RATIO;
            this.GRAPH_Y = 15 * this.PIXEL_RATIO;
            this.GRAPH_WIDTH = 74 * this.PIXEL_RATIO;
            this.GRAPH_HEIGHT = 30 * this.PIXEL_RATIO;
            var canvas = document.createElement('canvas');
            canvas.width = this.WIDTH;
            canvas.height = this.HEIGHT;
            canvas.style.cssText = "\n      width: ".concat(this.WIDTH / this.PIXEL_RATIO, "px;\n      height: ").concat(this.HEIGHT / this.PIXEL_RATIO, "px;\n    ");
            this.ctx = canvas.getContext('2d');
            this.dom = canvas;
            this.bg = bg;
            this.fg = fg;
            this.name = name;
            this.draw();
        }
        StatsPanel.prototype.draw = function () {
            this.ctx.font = "bold ".concat(9 * this.PIXEL_RATIO, "px Helvetica,Arial,sans-serif");
            this.ctx.textBaseline = 'top';
            this.ctx.fillStyle = this.bg;
            this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
            this.ctx.fillStyle = this.fg;
            this.ctx.fillText(this.name, this.TEXT_X, this.TEXT_Y);
            this.ctx.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
            this.ctx.fillStyle = this.bg;
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
        };
        StatsPanel.prototype.update = function (value, maxValue) {
            this.min = Math.min(this.min, value);
            this.max = Math.max(this.max, value);
            this.ctx.fillStyle = this.bg;
            this.ctx.globalAlpha = 1;
            this.ctx.fillRect(0, 0, this.WIDTH, this.GRAPH_Y);
            this.ctx.fillStyle = this.fg;
            this.ctx.fillText("".concat(Math.round(value), " ").concat(this.name, " (").concat(Math.round(this.min), "-").concat(Math.round(this.max), ")"), this.TEXT_X, this.TEXT_Y);
            this.ctx.drawImage(this.dom, this.GRAPH_X + this.PIXEL_RATIO, this.GRAPH_Y, this.GRAPH_WIDTH - this.PIXEL_RATIO, this.GRAPH_HEIGHT, this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH - this.PIXEL_RATIO, this.GRAPH_HEIGHT);
            this.ctx.fillRect(this.GRAPH_X + this.GRAPH_WIDTH - this.PIXEL_RATIO, this.GRAPH_Y, this.PIXEL_RATIO, this.GRAPH_HEIGHT);
            this.ctx.fillStyle = this.bg;
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillRect(this.GRAPH_X + this.GRAPH_WIDTH - this.PIXEL_RATIO, this.GRAPH_Y, this.PIXEL_RATIO, Math.round((1 - value / maxValue) * this.GRAPH_HEIGHT));
        };
        return StatsPanel;
    }());

    /* eslint-disable no-restricted-globals */
    /**
     * @author mrdoob / http://mrdoob.com/
     *
     * Updated to TypeScript by @aaronpo97
     */
    var Stats = /** @class */ (function () {
        function Stats() {
            var _this = this;
            this.mode = 0;
            this.container = document.createElement('div');
            this.container.addEventListener('click', function (event) {
                event.preventDefault();
                _this.mode = (_this.mode + 1) % _this.container.children.length;
                _this.showPanel(_this.mode);
            }, false);
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
        Stats.prototype.begin = function () {
            this.beginTime = (performance || Date).now();
        };
        Stats.prototype.end = function () {
            this.frames += 1;
            var time = (performance || Date).now();
            this.msPanel.update(time - this.beginTime, 200);
            if (time >= this.prevTime + 1000) {
                this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);
                this.prevTime = time;
                this.beginFrames = 0;
                if (this.memPanel && performance.memory) {
                    var memory = performance.memory;
                    this.memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
                }
            }
            return time;
        };
        Stats.prototype.showPanel = function (id) {
            for (var i = 0; i < this.container.children.length; i += 1) {
                var child = this.container.children[i];
                child.style.display = i === id ? 'block' : 'none';
            }
            this.mode = id;
        };
        Stats.prototype.addPanel = function (panel) {
            this.container.appendChild(panel.dom);
            return panel;
        };
        return Stats;
    }());

    return Stats;

}));
