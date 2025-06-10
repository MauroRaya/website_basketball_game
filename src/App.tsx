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

    const DEBUG = true;
    let animationId: number;

    const keyboard = new Keyboard();
    const mouse = new Mouse(canvas);

    const player = new Player({ x: 300, y: 250, z: 0 }, 16);
    const ball = new Ball({ x: 350, y: 250, z: 0 }, 12);

    const loop = () => {
      Utils.Draw.clear(ctx, canvas, "white");

      Utils.Draw.circle(ctx, ball.getPosition(), ball.getRadius(), "red");
      Utils.Draw.circle(ctx, player.getPosition(), player.getRadius(), "blue");

      player.update(keyboard, mouse, ball);
      ball.update(player);

      animationId = requestAnimationFrame(loop);

      if (DEBUG) {
        Utils.Draw.arrow(ctx, {x: 0, y: 0, z: 0}, player.getPosition(), "black");
        Utils.Draw.arrow(ctx, player.getPosition(), player.getDirection(), "black");
      }
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
      height={500}
      style={{ border: "1px solid black" }}
    />
  );
}