import "./index.css";
import { useEffect, useState, useRef } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Score from "./components/Score";

function App() {
  const [cards, setCards] = useState([]);
  const [areAllFlipped, setAreAllFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedOn, setClickedOn] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [gameWon, setGameWon] = useState(false);
  const modalRef = useRef(null);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function cleanPokemonName(name) {
    // Remove form suffixes like "-incarnate", "-ordinary", etc.
    return name.split("-")[0];
  }

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function handleCardFlip(cardId) {
    if (clickedCards.has(cardId)) {
      if (score > bestScore) {
        setBestScore(score);
      }

      setScore(0);
      setClickedCards(new Set());
    } else {
      const newClicked = new Set(clickedCards);
      newClicked.add(cardId);
      setClickedCards(newClicked);
      setScore((prev) => prev + 1);
      if (newClicked.size === cards.length) {
        setGameWon(true);
      }
    }
    // First flip all cards to back side
    setAreAllFlipped(true);

    // After showing backs, wait before shuffling and flipping back
    setTimeout(() => {
      // First flip all cards back
      setAreAllFlipped(false);

      // Then after the flip-back animation completes, shuffle the cards
      setTimeout(() => {
        setCards(shuffleArray(cards));
      }, 325); // Wait for flip animation to complete before shuffling
    }, 750);
  }

  async function fetchRandomPokemons() {
    setIsLoading(true);

    const cardCount = 10;
    const randomIds = new Set();
    const genVMinId = 494;
    const genVMaxId = 649;

    while (randomIds.size < cardCount) {
      randomIds.add(
        Math.floor(Math.random() * (genVMaxId - genVMinId + 1)) + genVMinId
      );
    }

    const promises = Array.from(randomIds).map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
    );

    try {
      const results = await Promise.all(promises);
      const cardData = results.map((data) => ({
        id: data.id,
        name: capitalize(cleanPokemonName(data.name)),
        sprite: data.sprites.front_default,
      }));
      setCards(cardData);
    } catch (err) {
      console.error("Failed to fetch Pokemon API data, error:", err);
    } finally {
      setIsLoading(false); // Hide loader
    }
  }

  useEffect(() => {
    if (gameWon && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [gameWon]);

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">You won!</h3>
          <p className="py-4">Great job!</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success"
                onClick={() => window.location.reload()}
              >
                Replay
              </button>
            </form>
            <form method="dialog">
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <Header />

      <div className="flex flex-1 flex-col justify-center items-center pt-8 pb-8 gap-16">
        <div className="flex flex-col bg- items-center">
          <Score score={score} bestScore={bestScore} />
        </div>
        {isLoading ? (
          <span className="loading loading-infinity loading-xl"></span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                name={card.name}
                sprite={card.sprite}
                isFlipped={areAllFlipped}
                onFlip={() => handleCardFlip(card.id)}
                clickedOn={clickedOn}
                setClickedOn={setClickedOn}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
