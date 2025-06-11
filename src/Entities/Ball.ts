import type { Vector3D } from "../Types/Vector";
import type { Player } from "./Player";

export class Ball {
  private position: Vector3D;
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

  getRadius(): number {
    return this.radius;
  }

  follow(player: Player) {
    let { x: px, y: py } = player.getPosition();
    let { x: pdx, y: pdy } = player.getDirection();

    this.position.x = px + pdx * 20;
    this.position.y = py + pdy * 20;
  }

  shoot(strength: number, player: Player) {
    const { x: dx, y: dy } = player.getDirection();

    this.position.x += 20 * strength * dx;
    this.position.y += 20 * strength * dy;
  }

  draw(ctx: CanvasRenderingContext2D, player: Player) {
    const { x, y } = this.position;
    const { z: pz } = player.getPosition();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y - pz, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}