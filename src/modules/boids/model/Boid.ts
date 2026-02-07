import { Vector } from '@/lib/vector';

interface BoidOptions {
  position: Vector;
  velocity: Vector;
  maxSpeed: number;
}

export class Boid {
  position: Vector;
  velocity: Vector;
  maxSpeed: number;

  constructor(options: BoidOptions) {
    this.position = options.position;
    this.velocity = options.velocity;
    this.maxSpeed = options.maxSpeed;
  }

  steer(steering: Vector) {
    this.velocity = this.velocity.add(steering);

    if (this.velocity.magnitude() > this.maxSpeed) {
      this.velocity = this.velocity
        .normalize()
        .scale(this.maxSpeed);
    }

    this.position = this.position.add(this.velocity);
  }
};