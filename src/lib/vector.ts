export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static zero(): Vector {
    return new Vector(0, 0);
  }

  static random(): Vector {
    const angle = Math.random() * 2 * Math.PI;
    
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  add(other: Vector): Vector {
    return new Vector(
      this.x + other.x,
      this.y + other.y,
    );
  }

  subtract(other: Vector): Vector {
    return new Vector(
      this.x - other.x,
      this.y - other.y,
    );
  }

  scale(scalar: number): Vector {
    return new Vector(
      this.x * scalar,
      this.y * scalar,
    );
  }

  divide(scalar: number): Vector {
    return new Vector(
      this.x / scalar,
      this.y / scalar,
    );
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector {
    const mag = this.magnitude();

    if (mag === 0) {
      return new Vector(0, 0);
    }

    return this.divide(mag);
  }
}