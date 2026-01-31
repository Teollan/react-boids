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

  multiply(scalar: number): Vector {
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

  rotateRadians(angle: number): Vector {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return new Vector(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos,
    );
  }

  rotateDegrees(angle: number): Vector {
    const radians = (angle * Math.PI) / 180;

    return this.rotateRadians(radians);
  }
}