import React, { useState, useEffect } from "react";

import { Link, Routes, Route } from "react-router-dom";
import PokemonDetailPage from "./PokemonDetailPage";
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPokemonList(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchPokemonList();
  }, []);

  return (
    <div className="App">
      <h1>Pokemon List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>
              <Link to={`/${pokemon.name}`}>
                {pokemon.name} (#{pokemon.url.split("/")[6]})
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Routes>
        {pokemonList.map((pokemon) => (
          <Route
            key={pokemon.name}
            path={`/${pokemon.name}`}
            element={<PokemonDetailPage url={pokemon.url} />}
          />
        ))}
      </Routes>
    </div>
  );
}
export default App;
