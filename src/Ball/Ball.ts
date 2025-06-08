import type { Hoop } from "../Hoop/Hoop";

export class Ball {
  // ─── Position & Motion ───
  position = { x: 100, y: 200, z: 0 };
  velocity = { x: 0, y: 0, z: 0 };

  // ─── Physics ───
  gravity = -0.2;
  friction = 0.98;
  bounceDamping = 0.4;

  // ─── Appearance ───
  radius = 8;

  // ─── State ───
  inMidShot = false;

  constructor() {}

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;

    this.velocity.z += this.gravity;

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    if (this.position.z < 0) {
      this.position.z = 0;

      this.velocity.z = -this.velocity.z * this.bounceDamping;

      if (Math.abs(this.velocity.z) < 0.3) {
        this.inMidShot = false;
        this.velocity.z = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    const shadowAlpha = Math.max(0.2, 1 - this.position.z / 20);
    const shadowRadius = Math.max(0, this.radius * (1 - this.position.z / 180));

    if (this.position.z !== 0) {
      ctx.beginPath();
      ctx.ellipse(this.position.x, this.position.y, shadowRadius, shadowRadius * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha.toFixed(2)})`;
      ctx.fill();
    }

    const screenY = this.position.y - this.position.z;

    ctx.beginPath();
    ctx.arc(this.position.x, screenY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  checkBasket(hoop: Hoop) {
    const dx = this.position.x - hoop.position.x;
    const dy = this.position.y - hoop.position.y;
    const distSq = dx * dx + dy * dy;

    const innerRadiusSq = hoop.innerRadius * hoop.innerRadius;
    const outerRadiusSq = hoop.outerRadius * hoop.outerRadius;

    const isNearZ = Math.abs(this.position.z - hoop.position.z) < 2;
    const isFalling = this.velocity.z < 0;

    if (distSq < innerRadiusSq && isNearZ && isFalling) {
      console.log("✅ BASKET");
    } else if (distSq <= outerRadiusSq && isNearZ && isFalling) {
      console.log("💥 RIM BOUNCE");
    }
  }
}