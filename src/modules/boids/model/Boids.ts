import type { Size } from '@/lib/size';
import { Vector } from '@/lib/vector';
import type { Boid } from '@/modules/boids/model/Boid';
import type { BoidBehavior } from '@/modules/boids/model/boidBehavior/BoidBehavior';

export class Boids {
  readonly boids: Boid[] = [];
  readonly behaviors: BoidBehavior[] = [];
  readonly size: Size;

  get length(): number {
    return this.boids.length;
  }

  constructor(size: Size) {
    this.size = size;
  }

  iterate(deltaTime: number): void {
    const updates = this.map((boid, index) => {
      const steeringVectors = this.behaviors
        .map((behavior) => behavior.getSteering(index, this));

      const steering = steeringVectors
        .reduce((total, vector) => total.add(vector), Vector.zero())
        .scale(deltaTime / 1000);

      return {
        boid,
        steering,
      };
    });

    updates.forEach(({ boid, steering }) => {
      boid.steer(steering);
    });
  }

  at(index: number): Boid {
    return this.boids[index];
  }

  map<T>(fn: (boid: Boid, index: number) => T): T[] {
    return this.boids.map(fn);
  }

  find(fn: (boid: Boid, index: number) => boolean): Boid | undefined {
    return this.boids.find(fn);
  }

  findIndex(fn: (boid: Boid, index: number) => boolean): number {
    return this.boids.findIndex(fn);
  }

  forEach(fn: (boid: Boid, index: number) => void): void {
    this.boids.forEach(fn);
  }

  filter(fn: (boid: Boid, index: number) => boolean): Boid[] {
    return this.boids.filter(fn);
  }

  some(fn: (boid: Boid, index: number) => boolean): boolean {
    return this.boids.some(fn);
  }

  every(fn: (boid: Boid, index: number) => boolean): boolean {
    return this.boids.every(fn);
  }

  reduce<T>(fn: (acc: T, boid: Boid, index: number) => T, initial: T): T {
    return this.boids.reduce(fn, initial);
  }

  aroundPoint(position: Vector, radius: number): Boid[] {
    return this.boids.filter((boid) => {
      const delta = boid.position.subtract(position);

      return delta.magnitude() <= radius;
    });
  }

  aroundBoid(boidIndex: number, radius: number): Boid[] {
    const currentBoid = this.boids[boidIndex];

    return this.boids.filter((boid, index) => {
      if (index === boidIndex) return false;
      const delta = boid.position.subtract(currentBoid.position);

      return delta.magnitude() <= radius;
    });
  }

  addBehavior(behavior: BoidBehavior) {
    this.behaviors.push(behavior);

    return this;
  }

  addBoid(boid: Boid): void {
    this.boids.push(boid);
  }
}