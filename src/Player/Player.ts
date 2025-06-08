import type { Ball } from "../Ball/Ball";
import type { KeyboardControls } from "../Controls/Keyboard/KeyboardControls";
import type { MouseControls } from "../Controls/Keyboard/MouseControls";
import type { ICircle } from "../Interfaces/ICircle";
import type { IPosition } from "../Interfaces/IPosition";
import type { IVector } from "../Interfaces/IVector";
import { CollisionUtil } from "../Utils/CollisionUtil";
import { VectorUtil } from "../Utils/VectorUtil";

export class Player implements ICircle, IPosition {
  x: number;
  y: number;
  radius: number;
  size: number;
  speed: number;
  isHoldingBall: boolean;
  direction = { x: 0, y: 0 };

  constructor() {
    this.x = 50;
    this.y = 50;
    this.radius = 12;
    this.size = 20;
    this.speed = 3;
    this.isHoldingBall = false;
  }

  update(input: KeyboardControls, ball: Ball) {
    if (
        CollisionUtil.isCollidingCircle(this, ball) &&
        !this.isHoldingBall &&
        !ball.isHeld &&
        !ball.inMidShot
    ) {
      this.isHoldingBall = true;
      ball.isHeld = false;
    }

    if (this.isHoldingBall) {
      ball.x = this.x;
      ball.y = this.y;
    }

    let dx = 0;
    let dy = 0;

    if (input.isPressed("w")) dy -= 1;
    if (input.isPressed("a")) dx -= 1;
    if (input.isPressed("s")) dy += 1;
    if (input.isPressed("d")) dx += 1;

    if (dx !== 0 || dy !== 0) {
        const length = Math.hypot(dx, dy);
        this.direction.x = dx / length;
        this.direction.y = dy / length;
    }

    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  shoot(ball: Ball, mouse: MouseControls) {
    if (!this.isHoldingBall) return;

    this.isHoldingBall = false;
    ball.isHeld = false;
    ball.inMidShot = true;

    const vector: IVector = VectorUtil.direction(this, mouse);

    ball.vx = this.direction.x + vector.x * 6;
    ball.vy = this.direction.y + vector.y * 6;
    ball.vz = 5;
  }
}