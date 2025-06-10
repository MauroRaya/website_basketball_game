import type { Vector2D } from "../Types/Vector";

export class Mouse {
  private position: Vector2D = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousemove", this.mouseMove);
  }

  private mouseMove = (e: MouseEvent) => {
    this.position.x = e.x;
    this.position.y = e.y;
  }

  getPosition(): Vector2D {
    return {...this.position};
  }

  destroy(canvas: HTMLCanvasElement) {
    canvas.removeEventListener("mousemove", this.mouseMove);
  }
}