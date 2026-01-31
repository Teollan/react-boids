import { type FC } from 'react';
import { BoidsContainer } from '@/modules/boids/view/components/BoidsContainer';
import { Boids } from '@/modules/boids/model/Boids';
import { Cohesion } from '@/modules/boids/model/boidBehavior/Cohesion';
import { Separation } from '@/modules/boids/model/boidBehavior/Separation';
import { Alignment } from '@/modules/boids/model/boidBehavior/Alignment';
import { Vector } from '@/lib/vector';
import { Boid } from '@/modules/boids/model/Boid';
import './App.css'

const boids = new Boids({
  width: 100,
  height: 100,
});

boids.addBehavior(new Cohesion());
boids.addBehavior(new Separation());
boids.addBehavior(new Alignment());

for (let i = 0; i < 50; i++) {
  boids.addBoid(new Boid({
    position: Vector.random().multiply(100),
    velocity: Vector.random().multiply(2).subtract(new Vector(1, 1)),
    maxSpeed: 1,
  }));
}


const App: FC = () => {
  return (
    <div className="app">
      <div className='boid-container'>
        <BoidsContainer />
      </div>

      <div className="buttons">
        <button>
          Add Boid
        </button>

        <button>
          Iterate
        </button>
      </div>
    </div>
  );
}

export default App
