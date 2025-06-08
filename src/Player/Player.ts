import type { KeyboardControls } from "../Controls/Keyboard/KeyboardControls";
import type { ICircle } from "../Interfaces/ICircle";
import type { IDirection } from "../Interfaces/IDirection";
import type { IPosition } from "../Interfaces/IPosition";

export class Player implements IPosition, ICircle, IDirection {
  x: number;
  y: number;
  radius: number;
  size: number;
  speed: number;
  direction = { x: 0, y: 0 };

  constructor() {
    this.x = 50;
    this.y = 50;
    this.radius = 12;
    this.size = 20;
    this.speed = 3;
  }

  update(input: KeyboardControls) {
    let dx = 0;
    let dy = 0;

    if (input.isPressed("w")) dy -= 1;
    if (input.isPressed("a")) dx -= 1;
    if (input.isPressed("s")) dy += 1;
    if (input.isPressed("d")) dx += 1;

    if (dx !== 0 || dy !== 0) {
        const length = Math.hypot(dx, dy);
        this.direction.x = dx / length;
        this.direction.y = dy / length;
    }

    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }
}