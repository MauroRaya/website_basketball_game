import type { Vector3D } from "../Types/Vector";
import type { Player } from "./Player";

export class Ball {
  private position: Vector3D;
  private velocity: Vector3D = { x: 0, y: 0, z: 0 };

  private gravity: number = -0.4;
  private friction: number = 0.94;
  private lastShooter: Player | null = null;

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

  getVelocity(): Vector3D {
    return {...this.velocity};
  }

  getRadius(): number {
    return this.radius;
  }

  follow(player: Player) {
    if (!player.getHasBall()) return; 

    const offset = 18;
    const smoothnessFactor = 0.3;

    const { x, y } = this.position;
    const { x: px, y: py } = player.getPosition();
    const { x: pdx, y: pdy } = player.getDirection();

    const targetX = px + pdx * offset;
    const targetY = py + pdy * offset;

    this.position.x += (targetX - x) * smoothnessFactor;
    this.position.y += (targetY - y) * smoothnessFactor;

    this.position.z = 0;
    this.velocity.z = 0;
  }

  canGetGrabbedBy(player: Player): boolean {
    if (this.lastShooter === player) {
      return false;
    }
    return true;
  }
  
  draw(ctx: CanvasRenderingContext2D, player: Player) {
    const { x, y, z } = this.position;
    const { z: pz } = player.getPosition();

    let height = y;

    if (player.getHasBall() && pz > 0) {
      height = y - pz;
    }

    if (z > 0) {
      const exaggeration = 2;
      height = y - z * exaggeration;

      const scale = Math.max(0.4, 1 - z / 100);

      const shadowRadiusX = this.radius * scale * 0.8;
      const shadowRadiusY = this.radius * scale * 0.5;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(x, y, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, height, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  shoot(power: number, height: number, player: Player) {
    this.velocity.x += power * player.getDirection().x;
    this.velocity.y += power * player.getDirection().y;
    this.velocity.z = height;
    this.position.z += this.velocity.z;
    this.lastShooter = player;
  }

  update() {
    if (this.position.z > 0.05) {
      this.velocity.z += this.gravity;
      this.position.z += this.velocity.z;
    } else {
      this.position.z = -this.position.z * 0.6;
      this.velocity.z = -this.velocity.z * 0.6;
      this.lastShooter = null;
    }

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    if (Math.abs(this.velocity.x) < 0.05) {
      this.velocity.x = 0;
    }

    if (Math.abs(this.velocity.y) < 0.05) {
      this.velocity.y = 0;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}