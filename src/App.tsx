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

    const hoop   = new Hoop(300, 40, 18);
    const hoop2  = new Hoop(300, 460, -28);

    const ball   = new Ball();
    const player = new Player();
    const input  = new KeyboardControls();
    new MouseControls(canvas, player, ball);

    let animationId: number;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hoop.draw(ctx);
      hoop2.draw(ctx);

      if (player.isHoldingBall && !player.isJumping) {
        ball.draw(ctx, "orange");
        player.draw(ctx, "blue");
      } else {
        player.draw(ctx, "blue");
        ball.draw(ctx, "orange");
      }

      player.update(input, ball);
      ball.update();

      ball.checkBackboardCollision(hoop);
      ball.checkBackboardCollision(hoop2);

      ball.checkBasket(hoop);
      ball.checkBasket(hoop2);

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
      height={500}
      style={{ border: "1px solid black" }}
    />
  );
}