import "../index.css";
import Tilt from "react-parallax-tilt";
import ReactCardFlip from "react-card-flip";
import PokeBall from "../assets/pokeball.svg";

function Card({ name, sprite, isFlipped, onFlip }) {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div onClick={onFlip} key="front">
        <Tilt className="cursor-pointer">
          <div className="card bg-secondary w-48 h-64">
            <figure className="pt-2">
              <img src={sprite} alt={name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-center">{name}</h2>
            </div>
          </div>
        </Tilt>
      </div>

      <div onClick={onFlip} key="back">
        <Tilt className="cursor-pointer">
          <div className="card bg-primary w-48 h-64">
            <figure>
              <img src={PokeBall} className="w-24 h-24" />
            </figure>
          </div>
        </Tilt>
      </div>
    </ReactCardFlip>
  );
}

export default Card;
