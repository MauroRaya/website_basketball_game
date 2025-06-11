import type { Vector2D } from "../Types/Vector";

export class Mouse {
  private position: Vector2D = { x: 0, y: 0 };
  private isDown: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousemove", this.mouseMove);
    canvas.addEventListener("mousedown", this.mouseDown);
    canvas.addEventListener("mouseup", this.mouseUp);
  }

  private mouseMove = (e: MouseEvent) => {
    this.position.x = e.x;
    this.position.y = e.y;
  }

  private mouseDown = () => {
    this.isDown = true;
  }

  private mouseUp = () => {
    this.isDown = false;
  }

  getPosition(): Vector2D {
    return {...this.position};
  }

  getIsDown(): boolean {
    return this.isDown;
  }

  destroy(canvas: HTMLCanvasElement) {
    canvas.removeEventListener("mousemove", this.mouseMove);
    canvas.removeEventListener("mousedown", this.mouseDown);
    canvas.removeEventListener("mouseup", this.mouseUp);
  }
}