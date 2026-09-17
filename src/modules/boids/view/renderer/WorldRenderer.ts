import type { Boid } from '@/modules/boids/model/Boid';
import type { World } from '@/modules/boids/model/world/World';


interface WorldRendererOptions {
  world: World;
  context: CanvasRenderingContext2D;
}

export class WorldRenderer {
  readonly world: World;
  readonly ctx: CanvasRenderingContext2D;

  constructor(options: WorldRendererOptions) {
    this.world = options.world;
    this.ctx = options.context;
  }

  render() {
    this.clear();

    this.world.boids.forEach((boid) => {
      this.drawBoid(boid);
    });
  }

  clear() {
    const { ctx, world } = this;
    const { width, height } = world.size;

    ctx.clearRect(0, 0, width, height);
  }

  drawBoid({
    position,
    velocity,
  }: Boid) {
    const { ctx } = this;

    const direction = velocity.normalize();
    const beak = position.add(direction.scale(10));
    const leftWing = position.add(direction.rotate((2 * Math.PI) / 3).scale(7));
    const rightWing = position.add(direction.rotate((-2 * Math.PI) / 3).scale(7));

    ctx.beginPath();
    ctx.moveTo(beak.x, beak.y);
    ctx.lineTo(leftWing.x, leftWing.y);
    ctx.lineTo(position.x, position.y);
    ctx.lineTo(rightWing.x, rightWing.y);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  drawBoidPositionGizmo({ position }: Boid) {
    const { ctx } = this;

    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  drawBoidVelocityGizmo({ position, velocity }: Boid) {
    const { ctx } = this;

    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x + velocity.x * 20, position.y + velocity.y * 20);
    ctx.closePath();
    ctx.strokeStyle = 'blue';
    ctx.fill();
  }
}