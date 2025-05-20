import "../index.css";

function Score({ score, bestScore }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {bestScore ? (
        <div className="badge badge-accent badge-lg">
          Best Score: <span id="bestScore">{bestScore}</span>
        </div>
      ) : (
        <></>
      )}
      <div className="badge badge-success badge-lg">
        Score: <span id="score">{score}</span>
      </div>
    </div>
  );
}

export default Score;
