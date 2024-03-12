/**
 * @author mrdoob / http://mrdoob.com/
 *
 * Updated to TypeScript by @aaronpo97
 */
declare class Stats {
    private mode;
    private container;
    private beginTime;
    private prevTime;
    private frames;
    private fpsPanel;
    private msPanel;
    private memPanel?;
    dom: HTMLDivElement;
    beginFrames: number | undefined;
    constructor();
    begin(): void;
    end(): number;
    private showPanel;
    private addPanel;
}

export { Stats as default };
