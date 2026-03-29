import { Vector } from '@/lib/vector';
import type { Behavior } from '@/modules/boids/model/behavior/Behavior';
import type { World } from '@/modules/boids/model/world/World';

interface SeparationOptions {
  perceptionRadius: number;
}

const DEFAULT_SEPARATION_OPTIONS: SeparationOptions = {
  perceptionRadius: 25,
};

export class Separation implements Behavior {
  private readonly perceptionRadius: number;

  constructor(options: Partial<SeparationOptions> = {}) {
    const {
      perceptionRadius
    } = { ...DEFAULT_SEPARATION_OPTIONS, ...options };

    this.perceptionRadius = perceptionRadius;
  }

  getSteering(boidIndex: number, boids: World): Vector {
    const currentBoid = boids.at(boidIndex);
    const neighbors = boids.aroundBoid(boidIndex, this.perceptionRadius);

    let steering = Vector.zero();

    for (const boid of neighbors) {
      const offset = boid.position.subtract(currentBoid.position);
      const weight = 1 / offset.magnitude();
      const delta = offset.scale(weight);

      steering = steering.subtract(delta);
    }

    return steering;
  }
}