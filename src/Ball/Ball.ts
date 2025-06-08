import type { ICircle } from "../Interfaces/ICircle";
import type { IPosition } from "../Interfaces/IPosition";
import type { Player } from "../Player/Player";

export class Ball implements IPosition, ICircle {
  x: number;
  y: number;
  radius: number;
  isHeld: boolean;

  constructor() {
    this.x = 200;
    this.y = 200;
    this.isHeld = false;
    this.radius = 6;
  }

  hold(player: Player) {
    this.x = player.x;
    this.y = player.y;
  }
}