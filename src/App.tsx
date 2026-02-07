import { type FC } from 'react';
import { BoidsContainer } from '@/modules/boids/view/components/BoidsContainer';
import './App.css'

const App: FC = () => {
  return (
    <div className="app">
      <div className='boids-container'>
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
