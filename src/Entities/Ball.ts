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

  update(player: Player) {
    this.handleFollow(player);
  }

  private handleFollow(player: Player) {
    if (!player.getHasBall()) return;

    let { x: px, y: py } = player.getPosition();
    let { x: pdx, y: pdy } = player.getDirection();

    this.position.x = px + pdx * 20;
    this.position.y = py + pdy * 20;
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