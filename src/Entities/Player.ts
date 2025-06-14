import { Keyboard } from "../Controls/Keyboard";
import type { Mouse } from "../Controls/Mouse";
import type { Vector2D, Vector3D } from "../Types/Vector";
import type { Ball } from "./Ball";

export class Player {
  private position: Vector3D;
  private velocity: Vector3D = { x: 0, y: 0, z: 0 };
  private direction: Vector2D = { x: 0, y: 0 };

  private hasBall: boolean = false;
  private isChargingShot: boolean = false;

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

  getIsChargingShot(): boolean {
    return this.isChargingShot;
  }

  getRadius(): number {
    return this.radius;
  }

  update(keyboard: Keyboard, mouse: Mouse, ball: Ball) {
    this.handleDirection(mouse);
    this.handleMovement(keyboard);

    if (this.hasBall) {
      ball.follow(this);
    } else {
      if (this.canGrab(ball)) {
        this.hasBall = true;
        ball.follow(this);
        mouse.clearHold();
      }
    }

    const holdStartTime = mouse.getHoldStartTime();
    const holdEndTime = mouse.getHoldEndTime();
    const holdDuration = mouse.getHoldDuration();

    this.isChargingShot = 
      keyboard.isPressed("q") ||
      holdStartTime !== null
    
    if (
      this.hasBall &&
      holdEndTime !== null &&
      holdDuration !== null
    ) {
      const power = this.calculateShotPower(holdDuration);
      const height = this.calculateShotHeight(power);

      ball.shoot(power, height, this);

      this.isChargingShot = false;
      this.hasBall = false;

      mouse.clearHold();
    }

    this.handleJump(keyboard);
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
    let dx = 0;
    let dy = 0;

    if (keyboard.isPressed("w")) dy -= 1;
    if (keyboard.isPressed("a")) dx -= 1;
    if (keyboard.isPressed("s")) dy += 1;
    if (keyboard.isPressed("d")) dx += 1;

    const mag = Math.hypot(dx, dy);
    if (mag === 0) return;

    const speed = this.velocity.z > 0
      ? 3 - 1
      : 3

    this.velocity.x = speed * (dx / mag);
    this.velocity.y = speed * (dy / mag);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  private handleJump(keyboard: Keyboard) {
    if (keyboard.isPressed(" ") && this.position.z === 0) {
      this.velocity.z = 5;
      this.position.z += this.velocity.z;
    }
    
    if (this.position.z > 0) {
      this.velocity.z += -0.3;
      this.position.z += this.velocity.z;
    } else {
      this.position.z = 0;
      this.velocity.z = 0; 
    }
  }

  isTouching(ball: Ball): boolean {
    const { x: bx, y: by } = ball.getPosition();
    const { x, y } = this.position;

    const dx = bx - x;
    const dy = by - y;
    
    const mag = Math.hypot(dx, dy);

    return mag < this.radius + ball.getRadius();
  }

  private canGrab(ball: Ball): boolean {
    return (
      this.isTouching(ball) &&
      ball.canGetGrabbedBy(this)
    )
  }

  private calculateShotPower(duration: any): number {
    const clamped = Math.min(1000, Math.max(0, duration));
    return clamped / 1200 * (30 - 5) + 8;
  }

  private calculateShotHeight(power: number): number {
    return (power - 8) / (30 - 5) * (8 - 3) + 3;
  }
}