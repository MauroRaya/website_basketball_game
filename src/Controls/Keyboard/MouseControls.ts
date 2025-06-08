import type { Ball } from "../../Ball/Ball";
import type { Player } from "../../Player/Player";

export class MouseControls {
  position = { x: 0, y: 0 };
  radius = 10;

  constructor(canvas: HTMLCanvasElement, player: Player, ball: Ball) {
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      this.position.x = e.clientX - rect.left;
      this.position.y = e.clientY - rect.top;
    });

    canvas.addEventListener("click", () => {
      player.shoot(ball, this);
    });
  }
}