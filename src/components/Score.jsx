import "../index.css";

function Score() {
  return (
    <div className="flex justify-center mb-2">
      <div className="badge badge-secondary badge-lg">
        Score: <span id="score">0</span>
      </div>
    </div>
  );
}

export default Score;
