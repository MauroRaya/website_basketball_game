import type { Vector2D } from "../Types/Vector";

export class Draw {
  static clear(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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