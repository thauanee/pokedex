import { Button, Grid2, Typography } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Skeletons } from '../components/Skeletons';
import '../style.css';

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0); 
    const [errorMensage, setErrorMensage] = useState("")
    const [types, setTypes] = useState([]);
    const [pokemonCache, setPokemonCache] = useState({});
    console.log(pokemonCache);

    useEffect(() => {
        getPokemon();
        getPokemonTypes();
    }, [offset]);

    const getPokemonTypes = () => {
        axios.get('https://pokeapi.co/api/v2/type/')
            .then((response) => {
                setTypes(response.data.results);
            })
            .catch((error) => console.error(error));
    }

    const getPokemon = () => {
        setErrorMensage("");
        var endpoints = [];
        for(var i = offset + 1; i <= offset + 10; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
    axios
    .all(endpoints.map((endpoint) => axios.get(endpoint)))
    .then((response) => setPokemons(response))
};

    const pokemonFilter = (name) => {
        if (name==="") {
        } else {
            var FilteredPokemons = [];
            for (var i in pokemons) {
                if(pokemons[i].data.name.includes(name.toLowerCase())) {
                    FilteredPokemons.push(pokemons[i]);
                }
            }
            if (FilteredPokemons.length === 0) {
                setErrorMensage(`Nenhum Pokémon com o nome ${name}`);
            } else { 
                setErrorMensage("");
            }
            setPokemons(FilteredPokemons);
        };
    }   

        const filterByType = (type) => {
            setErrorMensage("");

            if (pokemonCache[type]) {
                setPokemons(pokemonCache[type]);
                return;
            }

        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
            .then((response) => {
                const FilteredPokemonsUrls = response.data.pokemon.map(p => p.pokemon.url);

                axios.all(FilteredPokemonsUrls.map((url) => axios.get(url)))
                    .then((response) => {
                        setPokemons(response);

                        setPokemonCache((prevCache) => ({
                           ...prevCache,
                           [type]: response, 
                        }));
                    })
                    .catch((error) => console.error(error));
                })
                .catch((error) => console.error(error));
        }

        const showMorePokemons = () => {
        setOffset(offset + 10);
        setPokemons([]);
    }
    const showLessPokemons = () => {
        setOffset(offset - 10);
        setPokemons([]);
    }

  return (
    <div className='container'> 
        <Navbar pokemonFilter={pokemonFilter}/> 
            
            <div className='filter-buttons'>
                {types.map((type, index) => (
                <Button key={index} variant='outlined' onClick={() => filterByType(type.name)}>
                    {type.name}
                </Button>
                ))}
            </div>
           <Grid2 container spacing={3}>
                {errorMensage ? (
                    <Typography variant="h6" color="error">
                        {errorMensage}
                    </Typography>
                ) : pokemons.length === 0 ? (
                    <Skeletons />
                ) : (
                    pokemons.map((pokemon, key) => (
                        <Grid2 size xs={12} sm={6} md={4} lg={2} key={key}>
                            <PokemonCard
                                name={pokemon.data.name}
                                image={pokemon.data.sprites.front_default}
                                types={pokemon.data.types}
                            />
                        </Grid2>
                    ))
                )}
            </Grid2>
            <Button variant="contained" onClick={showLessPokemons}>
             {'<'}
            </Button>
            <Button variant="contained" onClick={showMorePokemons}>
             {'>'}
            </Button>
        </div>
    );
};