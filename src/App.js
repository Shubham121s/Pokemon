import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Typography } from '@mui/material';
import PokemonCard from './components/PokemonCard';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const results = response.data.results;
        const detailedResults = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return pokemonDetails.data;
          })
        );
        setPokemons(detailedResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPokemons();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search)
  );

  return (
    <Container maxWidth="lg" className="app">
      <Typography variant="h2" component="h1" gutterBottom>
        Pokémon List
      </Typography>
      <TextField
        label="Search Pokémon"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />
      <Grid container spacing={3}>
        {filteredPokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;

