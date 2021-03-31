import React, { useState, useEffect } from 'react';
import Card from '../CardMyPokemonList';
import { getPokemon, getAllPokemon } from '../../apiservices/ServicePokemonList';
import '../../App.css';

        function MyPokemonList(){
            const [pokemonData, setPokemonData] = useState([])
            const [nextUrl, setNextUrl] = useState('');
            const [prevUrl, setPrevUrl] = useState('');
            const [loading, setLoading] = useState(true);
            const initialURL = 'https://pokeapi.co/api/v2/pokemon'
          
            useEffect(() => {
              async function fetchData() {
                let response = await getAllPokemon(initialURL)
                setNextUrl(response.next);
                setPrevUrl(response.previous);
                await loadPokemon(response.results);
                setLoading(false);
              }
              fetchData();
            }, [])
          
            const next = async () => {
              setLoading(true);
              let data = await getAllPokemon(nextUrl);
              await loadPokemon(data.results);
              setNextUrl(data.next);
              setPrevUrl(data.previous);
              setLoading(false);
            }
          
            const prev = async () => {
              if (!prevUrl) return;
              setLoading(true);
              let data = await getAllPokemon(prevUrl);
              await loadPokemon(data.results);
              setNextUrl(data.next);
              setPrevUrl(data.previous);
              setLoading(false);
            }
          
            const loadPokemon = async (data) => {
              let _pokemonData = await Promise.all(data.map(async pokemon => {
                let pokemonRecord = await getPokemon(pokemon)
                return pokemonRecord
              }))
              setPokemonData(_pokemonData);
            }
        return (
            <div className="pl-container">
                {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            
            <div className="view-container">
              {pokemonData.map((ServicePokemonList, i) => {
                return <Card key={i} pokemon={ServicePokemonList} />
              })}
            </div>
          
          </>
        )}
            </div>

        );
              
    }

export default MyPokemonList