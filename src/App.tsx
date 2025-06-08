import { useEffect, useRef } from "react"
import { KeyboardControls } from "./Controls/Keyboard/KeyboardControls";
import { Player } from "./Player/Player";
import { Ball } from "./Ball/Ball";
import { MouseControls } from "./Controls/Keyboard/MouseControls";
import { Hoop } from "./Hoop/Hoop";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const hoop   = new Hoop();
    const ball   = new Ball();
    const player = new Player();
    const input  = new KeyboardControls();
    const mouse  = new MouseControls(canvas, player, ball);

    let animationId: number;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hoop.draw(ctx);

      player.update(input, ball);
      player.draw(ctx, "blue");

      ball.update();
      ball.draw(ctx, "red");

      animationId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      input.destroy();
    }
  });
  
  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ border: "1px solid black" }}
    />
  );
}