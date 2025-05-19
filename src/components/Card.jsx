import '../index.css';

function Card({ name, sprite }) {
  return (
    <div className="card bg-primary w-96 shadow-sm">
      <figure>
        <img src={sprite} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-center align-middle">{name}</h2>
      </div>
    </div>
  );
}

export default Card;
