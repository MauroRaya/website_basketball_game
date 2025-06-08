import type { Ball } from "../Ball/Ball";
import type { KeyboardControls } from "../Controls/Keyboard/KeyboardControls";
import type { MouseControls } from "../Controls/Keyboard/MouseControls";

export class Player {
  // ───── Position & Movement ─────
  position = { x: 50, y: 50, z: 0 };
  velocity = { z: 0};
  direction = { x: 0, y: 0 };

  // ───── Physics ─────
  speed = 3;
  gravity = -0.4;
  throwStrength = 6;

  // ───── Appearance ─────
  radius = 14;
  size = 20;

  // ───── State ─────
  isHoldingBall = false;
  isJumping = false;

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
      ball.position.z = this.position.z;
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

    if (input.isPressed(" ") && !this.isJumping) {
      this.isJumping = true;
      this.velocity.z = 6;
    }
    
    if (this.isJumping) {
      this.position.z += this.velocity.z;
      this.velocity.z += this.gravity;

      if (this.position.z <= 0) {
        this.position.z = 0;
        this.velocity.z = 0;
        this.isJumping = false;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    const screenY = this.position.y - this.position.z;

    const shadowAlpha = Math.max(0.2, 1 - this.position.z / 15);
    const shadowRadius = Math.max(0, this.radius * (1 - this.position.z / 180));

    ctx.beginPath();
    ctx.ellipse(this.position.x, this.position.y, shadowRadius, shadowRadius * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha.toFixed(2)})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.position.x, screenY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  shoot(ball: Ball, mouse: MouseControls) {
    if (!this.isHoldingBall || !this.isJumping) return;

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