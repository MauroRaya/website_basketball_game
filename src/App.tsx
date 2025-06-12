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

    const player = new Player({ x: 300, y: 400, z: 0 }, 16, "blue");
    const ball = new Ball({ x: 300, y: 350, z: 0 }, 12, "red");

    const keyboard = new Keyboard();
    const mouse = new Mouse(canvas);

    const loop = () => {
      Utils.Draw.clear(ctx, canvas);
      Utils.Draw.court(ctx, canvas);

      player.update(keyboard, mouse);

      if (player.canGrab(ball)) {
        ball.follow(player);
      }

      if (player.canShoot(mouse)) {
        const power = player.getShotPower();
        const height = player.getShotHeight();

        if (power === 0 || height === 0) return;

        ball.shoot(power, height, player);
        mouse.clearHold();
      }

      ball.update();

      if (player.getPosition().z > 0 && !player.isTouching(ball)) {
        ball.draw(ctx, player);
        player.draw(ctx);
      } else if (player.getPosition().z > 0) {
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