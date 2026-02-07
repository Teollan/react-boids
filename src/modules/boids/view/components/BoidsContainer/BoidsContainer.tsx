import { useEffect, useRef, type FC } from 'react';
import styles from './BoidsContainer.module.css';
import { Boids } from '@/modules/boids/model/Boids';
import { Cohesion } from '@/modules/boids/model/boidBehavior/Cohesion';
import { Separation } from '@/modules/boids/model/boidBehavior/Separation';
import { Alignment } from '@/modules/boids/model/boidBehavior/Alignment';
import { Boid } from '@/modules/boids/model/Boid';
import { Vector } from '@/lib/vector';
import { EdgeAvoidance } from '@/modules/boids/model/boidBehavior/EdgeAvoidance';

const boids = new Boids({
  width: 1000,
  height: 1000,
});

boids
  .addBehavior(new Cohesion({ perceptionRadius: 250, affinity: 0.1 }))
  .addBehavior(new Separation({ perceptionRadius: 50 }))
  .addBehavior(new Alignment({ perceptionRadius: 250, affinity: 0.1 }))
  .addBehavior(new EdgeAvoidance());

for (let i = 0; i < 50; i++) {
  boids.addBoid(new Boid({
    position: new Vector(
      Math.random() * boids.size.width,
      Math.random() * boids.size.height,
    ),
    velocity: Vector.random(),
    maxSpeed: 5,
  }));
}

export const BoidsContainer: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    
    let lastTime = performance.now();
    let animationFrameId: number | null = null;

    const render = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      boids.iterate(deltaTime);

      context.clearRect(0, 0, canvas.width, canvas.height);

      boids.forEach((boid) => {
        context.beginPath();
        context.arc(boid.position.x, boid.position.y, 5, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();
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
      width={boids.size.width}
      height={boids.size.height}
      className={styles.canvas}
    />
  );
}