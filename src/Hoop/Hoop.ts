export class Hoop {
  position = { x: 300, y: 40, z: 20};
  outerRadius = 18;
  innerRadius = 10;

  constructor() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.innerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'orange';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.outerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }
}
