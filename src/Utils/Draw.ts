import type { Vector } from "../Types/Vector";

export class Draw {
  static clear(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  static circle(
    ctx: CanvasRenderingContext2D,
    position: Vector,
    radius: number,
    color: string
  ) {
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  static arrow(
    ctx: CanvasRenderingContext2D,
    from: Vector,
    to: Vector,
    color: string
  ) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  static text(
    ctx: CanvasRenderingContext2D,
    loc: Vector,
    text: string,
  ) {
    ctx.font = "36px calibri";
    ctx.strokeText(text, loc.x, loc.y);
  }
}