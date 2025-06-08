import { useEffect, useRef } from "react"
import { KeyboardControls } from "./Controls/Keyboard/KeyboardControls";
import { Player } from "./Player/Player";
import { Ball } from "./Ball/Ball";
import { CollisionUtil } from "./Utils/Collision";
import { DrawUtil } from "./Utils/Draw";
import { MouseControls } from "./Controls/Keyboard/MouseControls";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const input  = new KeyboardControls();
    const mouse  = new MouseControls(canvas);
    const player = new Player();
    const ball   = new Ball();

    let animationId: number;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      player.update(input);
      DrawUtil.drawCircle(ctx, player, "blue");
      DrawUtil.drawCircle(ctx, mouse, "green");
      DrawUtil.drawDirectionLine(ctx, player, mouse);

      const isPlayerTouchingBall = CollisionUtil.isCollidingCircle(player, ball);

      if (isPlayerTouchingBall) {
        ball.hold(player);
      }

      DrawUtil.drawCircle(ctx, ball, "red");

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