import type { Vector3D } from "../Types/Vector";
import type { Player } from "./Player";

export class Ball {
  private position: Vector3D;
  private velocity: Vector3D = { x: 0, y: 0, z: 0 };

  private gravity: number = -0.4;
  private friction: number = 0.95;

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

    let { x: px, y: py } = player.getPosition();
    let { x: pdx, y: pdy } = player.getDirection();

    this.position.x = px + pdx * 20;
    this.position.y = py + pdy * 20;
  }
  
  draw(ctx: CanvasRenderingContext2D, player: Player) {
    const { x, y, z } = this.position;
    const { z: pz } = player.getPosition();

    let height = y;

    if (player.isTouching(this)) {
      height -= pz;
    }

    if (this.position.z > 0) {
      height -= z - 30;

      const scale = Math.max(0.4, 1 - z / 100);
      const shadowRadiusX = this.radius * 0.8;
      const shadowRadiusY = this.radius * scale;

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
  }

  update() {
    if (this.position.z > 0) {
      this.velocity.z += this.gravity;
      this.position.z += this.velocity.z;
    } else {
      this.position.z = 0;
      this.velocity.z = 0;
    }

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    if (Math.abs(this.velocity.x) < 0.25) {
      this.velocity.x = 0;
    }

    if (Math.abs(this.velocity.y) < 0.25) {
      this.velocity.y = 0;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}