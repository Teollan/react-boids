import { useEffect, useRef, type FC } from 'react';
import styles from './BoidsContainer.module.css';
import { World } from '@/modules/boids/model/world/World';
import { Cohesion } from '@/modules/boids/model/behavior/implementations/Cohesion';
import { Separation } from '@/modules/boids/model/behavior/implementations/Separation';
import { Alignment } from '@/modules/boids/model/behavior/implementations/Alignment';
import { EdgeAvoidance } from '@/modules/boids/model/behavior/implementations/EdgeAvoidance';
import { Boid } from '@/modules/boids/model/Boid';
import { Vector } from '@/lib/vector';
import { WorldRenderer } from '@/modules/boids/view/renderer/WorldRenderer';

const world = new World({
  width: 1000,
  height: 1000,
});

world
  .addBehavior(new Cohesion({ perceptionRadius: 100 }))
  .addBehavior(new Separation({ perceptionRadius: 25 }))
  .addBehavior(new Alignment({ perceptionRadius: 75 }))
  .addBehavior(new EdgeAvoidance({ margin: 75 }));

for (let i = 0; i < 50; i++) {
  world.addBoid(new Boid({
    position: new Vector(
      Math.random() * world.size.width,
      Math.random() * world.size.height,
    ),
    velocity: Vector.random(),
    maxSpeed: 15,
  }));
}

export const BoidsContainer: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    
    let lastTime = performance.now();
    let animationFrameId: number | null = null;

    const renderer = new WorldRenderer({ context, world });

    const render = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      world.iterate(deltaTime);

      context.clearRect(0, 0, canvas.width, canvas.height);

      world.forEach((boid) => {
        const position = boid.position;
        const direction = boid.velocity.normalize();

        const beak = position.add(direction.scale(10));
        const leftWing = position.add(direction.rotate((2 * Math.PI) / 3).scale(7));
        const rightWing = position.add(direction.rotate((-2 * Math.PI) / 3).scale(7));

        // Draw boid as a triangle
        context.beginPath();
        context.moveTo(beak.x, beak.y);
        context.lineTo(leftWing.x, leftWing.y);
        context.lineTo(position.x, position.y);
        context.lineTo(rightWing.x, rightWing.y);
        context.closePath();
        context.fillStyle = 'black';
        context.fill();

        // Draw boid position gizmo
        context.beginPath();
        context.moveTo(position.x, position.y);
        context.arc(position.x, position.y, 2, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = 'red';
        context.fill();

        // Draw boid velocity gizmo
        context.beginPath();
        context.moveTo(position.x, position.y);
        context.lineTo(position.x + boid.velocity.x * 20, position.y + boid.velocity.y * 20);
        context.strokeStyle = 'green';
        context.lineWidth = 2;
        context.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    }

    render(lastTime);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={world.size.width}
      height={world.size.height}
      className={styles.canvas}
    />
  );
}