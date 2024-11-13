import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';  

export default function PokemonCard({ name, image, types }) {
  const typeHandler = () => {
    if(types[1]) {
      return types[0].type.name +" | "+types[1].type.name;
    }
    return types[0].type.name;
  };

  return (
    <Card className='pokemon-card'>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt="pokemons"
          className='pokemon-image'
        />
        <CardContent>
          <Box className='pokemon-box'>
          <Typography gutterBottom variant="h5" component="div" className='pokemon-name'>
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div" className='pokemon-types'>
            {typeHandler()}
          </Typography>
          </Box>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
}
