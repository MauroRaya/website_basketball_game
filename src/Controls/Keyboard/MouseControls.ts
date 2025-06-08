import type { Ball } from "../../Ball/Ball";
import type { ICircle } from "../../Interfaces/ICircle";
import type { IPosition } from "../../Interfaces/IPosition";
import type { Player } from "../../Player/Player";

export class MouseControls implements IPosition, ICircle {
  x = 0;
  y = 0;
  radius = 10;

  constructor(canvas: HTMLCanvasElement, player: Player, ball: Ball) {
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      this.x = e.clientX - rect.left;
      this.y = e.clientY - rect.top;
    });

    canvas.addEventListener("click", () => {
      player.shoot(ball, this);
    });
  }
}