import { Vector } from '@/lib/vector';
import type { BoidBehavior } from '@/modules/boids/model/boidBehavior/BoidBehavior';
import type { Boids } from '@/modules/boids/model/Boids';

interface EdgeAvoidanceOptions {
  margin: number,
  turnForce: number,
}

const DEFAULT_EDGE_AVOIDANCE_OPTIONS: EdgeAvoidanceOptions = {
  margin: 50,
  turnForce: 0.5,
}

export class EdgeAvoidance implements BoidBehavior {
  private readonly margin: number;
  private readonly turnForce: number;

  constructor(options: Partial<EdgeAvoidanceOptions> = {}) {
    const {
      margin,
      turnForce,
    } = { ...DEFAULT_EDGE_AVOIDANCE_OPTIONS, ...options }

    this.margin = margin;
    this.turnForce = turnForce;
  }

  getSteering(boidIndex: number, boids: Boids): Vector {
    const currentBoid = boids.at(boidIndex);
    const { width, height } = boids.size;

    let steering = Vector.zero();

    if (currentBoid.position.x < this.margin) {
      steering = steering.add(new Vector(this.turnForce, 0));
    } else if (currentBoid.position.x > width - this.margin) {
      steering = steering.add(new Vector(-this.turnForce, 0));
    }

    if (currentBoid.position.y < this.margin) {
      steering = steering.add(new Vector(0, this.turnForce));
    } else if (currentBoid.position.y > height - this.margin) {
      steering = steering.add(new Vector(0, -this.turnForce));
    }

    return steering;
  }
}