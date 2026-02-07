import { Vector } from '@/lib/vector';
import type { BoidBehavior } from '@/modules/boids/model/boidBehavior/BoidBehavior';
import type { Boids } from '@/modules/boids/model/Boids';

interface CohesionOptions {
  perceptionRadius: number;
  affinity: number;
}

const DEFAULT_COHESION_OPTIONS: CohesionOptions = {
  perceptionRadius: 75,
  affinity: 0.1,
};

export class Cohesion implements BoidBehavior {
  private readonly perceptionRadius: number;
  private readonly affinity: number;

  constructor(options: Partial<CohesionOptions> = {}) {
    const {
      perceptionRadius,
      affinity,
    } = { ...DEFAULT_COHESION_OPTIONS, ...options };

    this.perceptionRadius = perceptionRadius;
    this.affinity = affinity;
  }

  getSteering(boidIndex: number, boids: Boids): Vector {
    const currentBoid = boids.at(boidIndex);
    const neighbors = boids.aroundBoid(boidIndex, this.perceptionRadius);

    if (neighbors.length === 0) {
      return Vector.zero();
    }
    
    const centerOfMass = neighbors
      .reduce((vector, boid) => vector.add(boid.position), Vector.zero())
      .divide(neighbors.length);

    const steering = centerOfMass
      .subtract(currentBoid.position)
      .scale(this.affinity);

    return steering;
  }
}