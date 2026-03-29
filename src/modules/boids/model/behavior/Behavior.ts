import type { Vector } from '@/lib/vector';
import type { World } from '@/modules/boids/model/world/World';

export interface Behavior {
  getSteering(boidIndex: number, boids: World): Vector;
}