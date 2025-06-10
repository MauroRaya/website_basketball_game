import type { Keyboard } from "../Controls/Keyboard";
import type { Mouse } from "../Controls/Mouse";
import type { Vector } from "../Types/Vector";
import type { Ball } from "./Ball";

export class Player {
  private position: Vector;
  private velocity: Vector;
  private direction: Vector;
  private radius: number;
  private hasBall: boolean = false;
  
  constructor(position: Vector, radius: number) {
    this.position = position;
    this.velocity = { x: 0, y: 0, z: 0 };
    this.direction = { x: 0, y: 0, z: 0 };
    this.radius = radius;
  }

  getPosition(): Vector {
    return {...this.position};
  }

  getDirection(): Vector {
    return {...this.direction};
  }

  getRadius(): number {
    return this.radius;
  }

  getHasBall(): boolean {
    return this.hasBall;
  }

  update(keyboard: Keyboard, mouse: Mouse, ball: Ball) {
    this.handleIsTouchingBall(ball);
    this.handleDirection(mouse);
    this.handleMovement(keyboard);
  }

  private handleIsTouchingBall(ball: Ball) {
    const { x: bx, y: by } = ball.getPosition();
    const { x, y } = this.position;

    const dx = bx - x;
    const dy = by - y;
    
    const mag = Math.hypot(dx, dy);
    this.hasBall = mag < this.radius + ball.getRadius();
  }

  private handleDirection(mouse: Mouse) {
    const { x: mx, y: my } = mouse.getPosition();
    var { x, y } = this.position;
    
    const dx = mx - x;
    const dy = my - y;

    const mag = Math.hypot(dx, dy);
    if (mag === 0) return;

    this.direction.x = x + (dx / mag * 20);
    this.direction.y = y + (dy / mag * 20);
  }

  private handleMovement(keyboard: Keyboard) {
    if (keyboard.isPressed("w")) this.position.y -= 3;
    if (keyboard.isPressed("a")) this.position.x -= 3;
    if (keyboard.isPressed("s")) this.position.y += 3;
    if (keyboard.isPressed("d")) this.position.x += 3;
  }
}