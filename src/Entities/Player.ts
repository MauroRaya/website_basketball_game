import type { Keyboard } from "../Controls/Keyboard";
import type { Mouse } from "../Controls/Mouse";
import type { Vector2D, Vector3D } from "../Types/Vector";
import type { Ball } from "./Ball";

export class Player {
  private position: Vector3D;
  private velocity: Vector3D = { x: 0, y: 0, z: 0 };
  private direction: Vector2D = { x: 0, y: 0 };

  private speed: number = 3;
  private gravity: number = -0.3;

  private shotPower: number = 0;
  private shotHeight: number = 0;

  private hasBall: boolean = false;
  private isShooting: boolean = false;

  private radius: number;
  private color: string;

  constructor(position: Vector3D, radius: number, color: string) {
    this.position = position;
    this.radius = radius;
    this.color = color;
  }

  getPosition(): Vector3D {
    return {...this.position};
  }

  getDirection(): Vector2D {
    return {...this.direction};
  }

  getHasBall(): boolean {
    return this.hasBall;
  }

  getShotPower(): number {
    return this.shotPower;
  }

  getShotHeight(): number {
    return this.shotHeight;
  }

  getRadius(): number {
    return this.radius;
  }

  isTouching(ball: Ball): boolean {
    const { x: bx, y: by } = ball.getPosition();
    const { x, y } = this.position;

    const dx = bx - x;
    const dy = by - y;
    
    const mag = Math.hypot(dx, dy);

    return mag < this.radius + ball.getRadius();
  }

  canGrab(ball: Ball): boolean {
    if (!this.isShooting && this.isTouching(ball)) {
      this.hasBall = true;
      return true;
    }
    return false;
  }

  canShoot(mouse: Mouse): boolean {
    if (
      !this.hasBall || 
      mouse.getHoldStartTime() === null || 
      mouse.getHoldEndTime() === null
    ) return false;

    const duration = mouse.getHoldDuration();
    this.shotPower = this.calculateShotPower(duration);
    this.shotHeight = this.calculateShotHeight(this.shotPower);

    this.isShooting = true;
    this.hasBall = false;

    return true;
  }

  private calculateShotPower(duration: number): number {
    const clamped = Math.min(1000, Math.max(0, duration));
    return clamped / 1000 * (32 - 8) + 8;
  }

  private calculateShotHeight(power: number): number {
    return (power - 8) / (32 - 8) * (16 - 6) + 6;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, z } = this.position;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y - z, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();

    if (z === 0) return;

    const scale = Math.max(0.4, 1 - y / 100);
    const shadowRadiusX = this.radius * 0.8;
    const shadowRadiusY = this.radius * scale;

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();
    ctx.restore();
  }

  update(keyboard: Keyboard, mouse: Mouse) {
    this.handleMovement(keyboard);
    this.handleDirection(mouse);
    this.handleJump(keyboard);
  }

  private handleMovement(keyboard: Keyboard) {
    let dx = 0;
    let dy = 0;

    if (keyboard.isPressed("w")) dy -= 3;
    if (keyboard.isPressed("a")) dx -= 3;
    if (keyboard.isPressed("s")) dy += 3;
    if (keyboard.isPressed("d")) dx += 3;

    const mag = Math.hypot(dx, dy);
    if (mag === 0) return;

    const speed = this.velocity.z > 0
      ? this.speed - 1
      : this.speed

    this.velocity.x = speed * (dx / mag);
    this.velocity.y = speed * (dy / mag);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  private handleDirection(mouse: Mouse) {
    const { x: mx, y: my } = mouse.getPosition();
    var { x, y } = this.position;
    
    const dx = mx - x;
    const dy = my - y;

    const mag = Math.hypot(dx, dy);
    if (mag === 0) return;

    this.direction.x = dx / mag
    this.direction.y = dy / mag;
  }

  private handleJump(keyboard: Keyboard) {
    if (keyboard.isPressed(" ") && this.position.z === 0) {
      this.velocity.z = 5;
      this.position.z += this.velocity.z;
    }
    
    if (this.position.z > 0) {
      this.velocity.z += this.gravity;
      this.position.z += this.velocity.z;
    } else {
      this.position.z = 0;
      this.velocity.z = 0; 
    }
  }
}