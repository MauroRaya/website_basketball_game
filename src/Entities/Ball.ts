import type { Vector } from "../Types/Vector";
import type { Player } from "./Player";

export class Ball {
  private position: Vector;
  private radius: number;

  constructor(position: Vector, radius: number) {
    this.position = position;
    this.radius = radius;
  }

  getPosition(): Vector {
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

    let { x: pdx, y: pdy } = player.getDirection();

    this.position.x = pdx;
    this.position.y = pdy;

    console.log(this.position);
  }
}