import type { Vector2D } from "../Types/Vector";

export class Draw {
  static clear(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    color: string = "white"
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  static court(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.halfCircle(ctx, { x: canvas.width / 2, y: 0, }, 225, 0, Math.PI, "blue");
    this.halfCircle(ctx, { x: canvas.width / 2, y: canvas.height }, 225, Math.PI, 0, "blue");
  }

  static halfCircle(
    ctx: CanvasRenderingContext2D,
    position: Vector2D,
    radius: number,
    angleFrom: number,
    angleTo: number,
    color: string
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, angleFrom, angleTo);
    ctx.strokeStyle = color;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.restore();
  }
}