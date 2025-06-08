import type { Ball } from "../Ball/Ball";
import type { KeyboardControls } from "../Controls/Keyboard/KeyboardControls";
import type { MouseControls } from "../Controls/Keyboard/MouseControls";

export class Player {
  // ───── Position & Movement ─────
  position = { x: 50, y: 50 };
  direction = { x: 0, y: 0 };

  // ───── Physical Appearance ─────
  radius = 14;
  size = 20;

  // ───── Stats ─────
  speed = 3;
  throwStrength = 6;

  // ───── Ball Handling ─────
  isHoldingBall = false;

  constructor() {}

  private collidesWith(ball: Ball): boolean {
    const dx = ball.position.x - this.position.x;
    const dy = ball.position.y - this.position.y;

    const distSq = dx * dx + dy * dy;
    const radii = this.radius + ball.radius;

    return distSq < radii * radii;
  }

  update(input: KeyboardControls, ball: Ball) {
    if (this.collidesWith(ball) && !this.isHoldingBall && !ball.inMidShot) {
      this.isHoldingBall = true;
    }

    if (this.isHoldingBall) {
      ball.position.x = this.position.x;
      ball.position.y = this.position.y;
    }

    let dx = 0;
    let dy = 0;

    if (input.isPressed("w")) dy -= 1;
    if (input.isPressed("a")) dx -= 1;
    if (input.isPressed("s")) dy += 1;
    if (input.isPressed("d")) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const distSq = dx * dx + dy * dy;

      this.direction.x = dx / distSq;
      this.direction.y = dy / distSq;
    }

    this.position.x += dx * this.speed;
    this.position.y += dy * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  shoot(ball: Ball, mouse: MouseControls) {
    if (!this.isHoldingBall) return;
    this.isHoldingBall = false;
    ball.inMidShot = true;

    const dx = mouse.position.x - this.position.x;
    const dy = mouse.position.y -this.position.y;

    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;

    const aim = { x: dx / dist, y: dy / dist };

    ball.velocity.x = this.direction.x + aim.x * this.throwStrength;
    ball.velocity.y = this.direction.y + aim.y * this.throwStrength;
    ball.velocity.z = 5;
  }
}