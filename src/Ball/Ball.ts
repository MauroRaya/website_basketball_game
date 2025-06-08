import type { Hoop } from "../Hoop/Hoop";

export class Ball {
  position = { x: 100, y: 200, z: 0, prevZ: 0 };
  velocity = { x: 0, y: 0, z: 0 };
  gravity = -0.2;
  friction = 0.98;
  bounceDamping = 0.4;
  radius = 10;
  inMidShot = false;

  maxZ = 0;

  constructor() {}

  update() {
    this.position.prevZ = this.position.z;
    this.maxZ = Math.max(this.maxZ, this.position.z);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;

    this.velocity.z += this.gravity;

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    if (this.position.z < 0) {
      this.inMidShot = false;
      this.position.z = 0;

      console.log("📈 Peak Z height:", this.maxZ.toFixed(2)); // <- LOG HERE
      this.maxZ = 0;

      this.velocity.z = -this.velocity.z * this.bounceDamping;

      if (Math.abs(this.velocity.z) < 0.15) {
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

  checkBackboardCollision(hoop: Hoop) {
    const bbLeft = hoop.position.x - hoop.backboard.width / 2;
    const bbRight = hoop.position.x + hoop.backboard.width / 2;
    const bbTop = hoop.position.y - hoop.backboard.offset;
    const bbBottom = bbTop + hoop.backboard.height;

    if (this.position.z < 15 || this.position.z > 40) return;

    if (
      this.position.x >= bbLeft &&
      this.position.x <= bbRight &&
      this.position.y + this.radius >= bbTop &&
      this.position.y - this.radius <= bbBottom
    ) {
      this.velocity.y = -this.velocity.y * 0.9;
    }
  }

  checkBasket(hoop: Hoop) {
    const dx = this.position.x - hoop.position.x;
    const dy = this.position.y - hoop.position.y;
    const distSq = dx * dx + dy * dy;

    const innerRadiusSq = (hoop.innerRadius + this.radius) ** 2;
    const outerRadiusSq = (hoop.outerRadius + this.radius) ** 2;

    const justPassedHoopHeight = this.position.prevZ > hoop.position.z && this.position.z <= hoop.position.z;
    const isFalling = this.velocity.z < 0;

    if (distSq < innerRadiusSq && justPassedHoopHeight && isFalling) {
      console.log("✅ BASKET");
    } else if (distSq <= outerRadiusSq && justPassedHoopHeight && isFalling) {
      console.log("💥 RIM BOUNCE");
    }
  }
}