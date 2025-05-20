import "../index.css";

function Score({ score }) {
  return (
    <div className="flex justify-center mb-2">
      <div className="badge badge-secondary badge-lg">
        Score: <span id="score">{score}</span>
      </div>
    </div>
  );
}

export default Score;
