import './index.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([]);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    async function fetchRandomPokemons() {
      const cardCount = 6;
      const randomIds = new Set();

      // Ensure no duplicates (rare but could happen)
      while (randomIds.size < cardCount) {
        randomIds.add(Math.floor(Math.random() * 1025) + 1);
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
          name: capitalize(data.name),
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
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.id} name={card.name} sprite={card.sprite} />
      ))}
    </div>
  );
}

export default App;
