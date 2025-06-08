import type { ICircle } from "../Interfaces/ICircle";
import type { IPosition } from "../Interfaces/IPosition";

export class Ball implements ICircle, IPosition {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  gravity: number;
  radius: number;
  isHeld: boolean;
  inMidShot: boolean;

  constructor() {
    this.x = 200;
    this.y = 200;
    this.z = 5;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.gravity = -0.2;
    this.radius = 6;
    this.isHeld = false;
    this.inMidShot = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
    this.vz += this.gravity;

    this.vx *= 0.98;
    this.vy *= 0.98;

    if (this.z < 0) {
      this.inMidShot = false;
      this.z = 0;

      this.vz = -this.vz * 0.4;

      if (Math.abs(this.vz) < 0.35) {
        this.vz = 0;
        this.vx = 0;
        this.vy = 0;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    const screenY = this.y - this.z;
    ctx.beginPath();
    ctx.arc(this.x, screenY, 10, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}