import type { ICircle } from "../Interfaces/ICircle";
import type { IPosition } from "../Interfaces/IPosition";

export class Hoop implements IPosition, ICircle {
  x: number;
  y: number;
  radius: number;

  constructor() {
    this.x = 200;
    this.y = 20;
    this.radius = 10;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}