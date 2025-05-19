import './index.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([]);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function cleanPokemonName(name) {
    // Remove form suffixes like "-incarnate", "-ordinary", etc.
    return name.split('-')[0];
  }

  useEffect(() => {
    async function fetchRandomPokemons() {
      const cardCount = 8;
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
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id} name={card.name} sprite={card.sprite} />
        ))}
      </div>
    </div>
  );
}

export default App;
