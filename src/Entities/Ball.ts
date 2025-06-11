import type { Vector3D } from "../Types/Vector";
import type { Player } from "./Player";

export class Ball {
  private position: Vector3D;
  private velocity: Vector3D = { x: 0, y: 0, z: 0 };
  private inMidShot: boolean = false;
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

  getInMidShot(): boolean {
    return this.inMidShot;
  }

  follow(player: Player) {
    let { x: px, y: py } = player.getPosition();
    let { x: pdx, y: pdy } = player.getDirection();

    this.position.x = px + pdx * 20;
    this.position.y = py + pdy * 20;
  }

  // fix deceleration
  shoot(strength: number, player: Player) {
    this.inMidShot = true;

    const { x: dx, y: dy } = player.getDirection();

    this.velocity.x += 2 * strength * dx;
    this.velocity.y += 2 * strength * dy;

    const friction = 0.8;

    this.velocity.x *= friction;
    this.velocity.y *= friction;
  }

  draw(ctx: CanvasRenderingContext2D, player: Player) {
    const { x, y } = this.position;
    const { z: pz } = player.getPosition();

    const height = player.isTouching(this) ? y - pz : y;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, height, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.handlePosition();
  }

  private handlePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }
}