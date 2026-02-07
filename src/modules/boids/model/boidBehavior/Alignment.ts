import { Vector } from '@/lib/vector';
import type { BoidBehavior } from '@/modules/boids/model/boidBehavior/BoidBehavior';
import type { Boids } from '@/modules/boids/model/Boids';

interface AlignmentOptions {
  perceptionRadius: number;
  affinity: number;
}

const DEFAULT_ALIGNMENT_OPTIONS: AlignmentOptions = {
  perceptionRadius: 50,
  affinity: 0.1,
};

export class Alignment implements BoidBehavior {
  private readonly perceptionRadius: number;
  private readonly affinity: number;

  constructor(options: Partial<AlignmentOptions> = {}) {
    const {
      perceptionRadius,
      affinity
    } = { ...DEFAULT_ALIGNMENT_OPTIONS, ...options };

    this.perceptionRadius = perceptionRadius;
    this.affinity = affinity;
  }

  getSteering(boidIndex: number, boids: Boids): Vector {
    const currentBoid = boids.at(boidIndex);
    const neighbors = boids.aroundBoid(boidIndex, this.perceptionRadius);

    if (neighbors.length === 0) {
      return Vector.zero();
    }

    const averageVelocity = neighbors
      .reduce((vector, boid) => vector.add(boid.velocity), Vector.zero())
      .divide(neighbors.length);

    const steering = averageVelocity
      .subtract(currentBoid.velocity)
      .scale(this.affinity);

    return steering;
  }
}