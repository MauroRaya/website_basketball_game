import type { Keyboard } from "../Controls/Keyboard";
import type { Mouse } from "../Controls/Mouse";
import type { Vector2D, Vector3D } from "../Types/Vector";
import type { Ball } from "./Ball";

export class Player {
  private position: Vector3D;
  private velocity: Vector3D = { x: 0, y: 0, z: 0 };
  private direction: Vector2D = { x: 0, y: 0 };
  private gravity: number = -0.3;

  private isCharging: boolean = false;
  private shotStartTime: number = 0;
  private shotStrength: number = 0;

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

  getRadius(): number {
    return this.radius;
  }

  getShotStrength(): number {
    return this.shotStrength;
  }

  isTouching(ball: Ball): boolean {
    const { x: bx, y: by } = ball.getPosition();
    const { x, y } = this.position;

    const dx = bx - x;
    const dy = by - y;
    
    const mag = Math.hypot(dx, dy);

    return mag < this.radius + ball.getRadius();
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
    this.handleShooting(mouse);
    this.handleJump(keyboard);
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

  private handleMovement(keyboard: Keyboard) {
    if (keyboard.isPressed("w")) this.position.y -= 3;
    if (keyboard.isPressed("a")) this.position.x -= 3;
    if (keyboard.isPressed("s")) this.position.y += 3;
    if (keyboard.isPressed("d")) this.position.x += 3;
  }

  private handleJump(keyboard: Keyboard) {
    if (keyboard.isPressed(" ") && this.position.z === 0) {
      this.velocity.z = 6;

      this.velocity.z += this.gravity;
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

  private handleShooting(mouse: Mouse) {
    const min = 400; //ms
    const max = 1200; //ms

    if (mouse.getIsDown() && !this.isCharging) {
      this.isCharging = true;
      this.shotStartTime = performance.now();
    }

    if (!mouse.getIsDown() && this.isCharging) {
        this.isCharging = false;
        const duration = performance.now() - this.shotStartTime;
        const clamped = Math.min(Math.max(duration, min), max);
        this.shotStrength = (clamped - min) / (max - min);
    }
  }
}