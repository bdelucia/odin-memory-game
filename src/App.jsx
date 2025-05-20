import './index.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cards, setCards] = useState([]);
  const [areAllFlipped, setAreAllFlipped] = useState(false);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function cleanPokemonName(name) {
    // Remove form suffixes like "-incarnate", "-ordinary", etc.
    return name.split('-')[0];
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

  function handleCardFlip() {
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

  useEffect(() => {
    async function fetchRandomPokemons() {
      const cardCount = 10;
      const randomIds = new Set();

      // Gen V Pokémon IDs range from 494 to 649
      const genVMinId = 494;
      const genVMaxId = 649;

      while (randomIds.size < cardCount) {
        randomIds.add(
          Math.floor(Math.random() * (genVMaxId - genVMinId + 1)) + genVMinId
        );
      }

      const promises = Array.from(randomIds).map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
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
        console.error('Failed to fetch Pokemon API data, error:', err);
      }
    }

    fetchRandomPokemons();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />

      <div className="flex flex-1 justify-center items-center pt-4 pb-4">
        <div className="grid grid-cols-5 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              sprite={card.sprite}
              isFlipped={areAllFlipped}
              onFlip={handleCardFlip}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
