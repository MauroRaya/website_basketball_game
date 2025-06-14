import type { Vector2D } from "../Types/Vector";

export class Mouse {
  private position: Vector2D = { x: 0, y: 0 };
  private holdStartTime: number | null = null;
  private holdEndTime: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousemove", this.mouseMove);
    canvas.addEventListener("mousedown", this.mouseDown);
    canvas.addEventListener("mouseup", this.mouseUp);
  }

  private mouseMove = (e: MouseEvent) => {
    this.position.x = e.offsetX;
    this.position.y = e.offsetY;
  };

  private mouseDown = () => {
    this.holdStartTime = performance.now();
    this.holdEndTime = null;
  };

  private mouseUp = () => {
    this.holdEndTime = performance.now();
  };

  getPosition(): Vector2D {
    return { ...this.position };
  }

  getHoldStartTime(): number | null {
    return this.holdStartTime;
  }

  getHoldEndTime(): number | null {
    return this.holdEndTime;
  }

  getHoldDuration(): number {
    if (this.holdStartTime === null || this.holdEndTime === null) return 0;
    return this.holdEndTime - this.holdStartTime;
  }

  clearHold() {
    this.holdStartTime = null;
    this.holdEndTime = null;
  }

  destroy(canvas: HTMLCanvasElement) {
    canvas.removeEventListener("mousemove", this.mouseMove);
    canvas.removeEventListener("mousedown", this.mouseDown);
    canvas.removeEventListener("mouseup", this.mouseUp);
  }
}