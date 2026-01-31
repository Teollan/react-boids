import type { Vector } from '@/lib/vector';
import type { Boids } from '@/modules/boids/model/Boids';

export interface BoidBehavior {
  getSteering(boidIndex: number, boids: Boids): Vector;
}