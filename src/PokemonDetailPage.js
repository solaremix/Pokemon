import React, { useState, useEffect } from 'react';

function PokemonDetailPage({ url }) {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [url]);

  return (
    <div className="PokemonDetail">
      <h2>Pokemon Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Name: {pokemonDetails.name}</p>
          <p>Order: {pokemonDetails.order}</p>
          <p>Base Experience: {pokemonDetails.base_experience}</p>
          <p>Height: {pokemonDetails.height}</p>
          <p>Abilities: {pokemonDetails.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonDetailPage;