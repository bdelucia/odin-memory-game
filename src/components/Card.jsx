import '../index.css';
import Tilt from 'react-parallax-tilt';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import PokeBall from '../assets/pokeball.svg';

function Card({ name, sprite }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div onClick={() => setIsFlipped(true)} key="front">
        <Tilt className="cursor-pointer">
          <div className="card bg-primary w-96 h-48 shadow-sm">
            <figure>
              <img src={sprite} alt={name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-center align-middle">
                {name}
              </h2>
            </div>
          </div>
        </Tilt>
      </div>

      <div onClick={() => setIsFlipped(false)} key="back">
        <Tilt className="cursor-pointer">
          <div className="card bg-primary w-96 h-48 shadow-sm">
            <figure>
              <img src={PokeBall} className="w-24 h-24" />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-center align-middle italic">
                Bobbeh's Pokemon Memory Game
              </h2>
            </div>
          </div>
        </Tilt>
      </div>
    </ReactCardFlip>
  );
}

export default Card;
