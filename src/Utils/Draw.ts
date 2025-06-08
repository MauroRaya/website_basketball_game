import type { ICircle } from "../Interfaces/ICircle";
import type { IPosition } from "../Interfaces/IPosition";

export class DrawUtil {
  private constructor() {}

  static drawCircle(
    ctx: CanvasRenderingContext2D, 
    entity: IPosition & ICircle, 
    color: string
  ) {
    ctx.beginPath();
    ctx.arc(entity.x, entity.y, entity.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  static drawDirectionLine(
    ctx: CanvasRenderingContext2D, 
    from: IPosition, 
    to: IPosition, 
    length = 200
  ) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;

    const dirX = dx / dist;
    const dirY = dy / dist;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(from.x + dirX * length, from.y + dirY * length);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}