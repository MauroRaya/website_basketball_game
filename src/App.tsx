import { useEffect, useRef } from "react"
import * as Utils from "./Utils/Draw";
import { Player } from "./Entities/Player";
import { Mouse } from "./Controls/Mouse";
import { Keyboard } from "./Controls/Keyboard";
import { Ball } from "./Entities/Ball";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let animationId: number;

    const keyboard = new Keyboard();
    const mouse = new Mouse(canvas);

    const player = new Player({ x: 300, y: 400, z: 0 }, 16, "blue");
    const ball = new Ball({ x: 300, y: 350, z: 0 }, 12, "red");

    const loop = () => {
      Utils.Draw.clear(ctx, canvas, "white");

      Utils.Draw.halfCircle(ctx, { x: canvas.width / 2, y: 0, }, 225, 0, Math.PI, "blue");
      Utils.Draw.halfCircle(ctx, { x: canvas.width / 2, y: canvas.height }, 225, Math.PI, 0, "blue");

      player.update(keyboard, mouse);

      if (player.isTouching(ball)) {
        ball.follow(player);
      }

      const strength = player.getShotStrength();
      if (strength !== 0) {
        ball.shoot(strength, player);
      }

      if (player.getPosition().z > 0) {
        player.draw(ctx);
        ball.draw(ctx, player);
      } else {
        ball.draw(ctx, player);
        player.draw(ctx);
      }

      animationId = requestAnimationFrame(loop);
    }

    loop();

    return(() => {
      mouse.destroy(canvas);
      keyboard.destroy();
      cancelAnimationFrame(animationId);
    })
  });
  
  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={800}
      style={{ border: "1px solid black" }}
    />
  );
}