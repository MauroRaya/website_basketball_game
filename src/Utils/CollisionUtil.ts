import type { ICircle } from "../Interfaces/ICircle";
import type { IPosition } from "../Interfaces/IPosition";

export class CollisionUtil {
  private constructor() {}

  static isCollidingCircle(
    a: IPosition & ICircle,
    b: IPosition & ICircle
  ): boolean
  {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distSq = dx * dx + dy * dy;
    const radii = a.radius + b.radius;
    return distSq < radii * radii;
  }
}