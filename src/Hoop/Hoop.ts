export class Hoop {
  position = { x: 0, y: 0, z: 40 };
  outerRadius = 16;
  innerRadius = 3;

  backboard = {
    width: 60,
    height: 10,
    offset: 0
  };

  constructor(x: number, y: number, offset: number) {
    this.position.x = x;
    this.position.y = y;
    this.backboard.offset = offset;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.beginPath();
    // ctx.arc(this.position.x, this.position.y, this.innerRadius, 0, Math.PI * 2);
    // ctx.strokeStyle = 'orange';
    // ctx.lineWidth = 1;
    // ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.outerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.stroke();

    const bbX = this.position.x - this.backboard.width / 2;
    const bbY = this.position.y - this.backboard.offset - this.backboard.height;

    ctx.beginPath();
    ctx.rect(bbX, bbY, this.backboard.width, this.backboard.height);
    ctx.fillStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fill();
  }
}
