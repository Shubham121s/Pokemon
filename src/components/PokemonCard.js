import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  return (
    <Card className="pokemon-card">
      <CardMedia
        component="img"
        height="140"
        image={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {pokemon.id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
