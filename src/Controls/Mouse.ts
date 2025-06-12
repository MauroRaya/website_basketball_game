import type { Ball } from "../Entities/Ball";
import type { Player } from "../Entities/Player";
import type { Vector2D } from "../Types/Vector";

export class Mouse {
  private position: Vector2D = { x: 0, y: 0 };
  private startHoldTime: number = 0;

  private ball: Ball;
  private player: Player

  constructor(canvas: HTMLCanvasElement, ball: Ball, player: Player) {
    this.ball = ball;
    this.player = player;

    canvas.addEventListener("mousemove", this.mouseMove);
    canvas.addEventListener("mousedown", this.mouseDown);
    canvas.addEventListener("mouseup", this.mouseUp);
  }

  private mouseMove = (e: MouseEvent) => {
    this.position.x = e.x;
    this.position.y = e.y;
  };

  private mouseDown = () => {
    this.startHoldTime = performance.now();
  };

  private mouseUp = () => {
    if (!this.player.getHasBall()) return;

    const minChargeTime = 0;
    const maxChargeTime = 1000;

    const minShotPower = 10;
    const maxShotPower = 20;

    const pressDuration = performance.now() - this.startHoldTime;

    const clampedTime = Math.min(maxChargeTime, Math.max(minChargeTime, pressDuration));

    const chargeFraction = (clampedTime - minChargeTime) / (maxChargeTime - minChargeTime);
    const shotPower = chargeFraction * (maxShotPower - minShotPower) + minShotPower;

    this.ball.shoot(shotPower, this.player);
  };

  getPosition(): Vector2D {
    return { ...this.position };
  }

  destroy(canvas: HTMLCanvasElement) {
    canvas.removeEventListener("mousemove", this.mouseMove);
    canvas.removeEventListener("mousedown", this.mouseDown);
    canvas.removeEventListener("mouseup", this.mouseUp);
  }
}
