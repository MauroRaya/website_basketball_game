import type { ICircle } from "../../Interfaces/ICircle";
import type { IPosition } from "../../Interfaces/IPosition";

export class MouseControls implements IPosition, ICircle {
  x = 0;
  y = 0;
  radius = 10;

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      this.x = e.clientX - rect.left;
      this.y = e.clientY - rect.top;
    });
  }
}