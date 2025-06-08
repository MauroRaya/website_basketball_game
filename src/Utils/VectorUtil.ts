import type { IPosition } from "../Interfaces/IPosition";

export class VectorUtil {
  private constructor() {}

  static direction(from: IPosition, to: IPosition) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);

    if (dist === 0) return { x: 0, y: 0 };

    return {
      x: dx / dist,
      y: dy / dist,
      magnitude: dist
    }
  }
}