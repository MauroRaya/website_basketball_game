export class Hoop {
  position = { x: 300, y: 40, z: 20};
  outerRadius = 12;
  innerRadius = 10;

  constructor() {}

  draw(ctx: CanvasRenderingContext2D) {
    const screenY = this.position.y - this.position.z;

    ctx.beginPath();
    ctx.arc(this.position.x, screenY, this.outerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'orange';
    ctx.stroke();
  }
}
