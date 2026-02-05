import React from 'react'
import Image from 'next/image'
import Link from "next/link";

type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
}
type PokemonDetailResponse = {
  name: string;
  sprites: {
    front_default: string | null;
  } 
}

async function getPokemons(){
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=12",
    {cache: 'no-store'}
  )

  const data: PokemonListResponse = await res.json()

  const pokemones = await Promise.all(
    data.results.map(async (pokemon) => {
      return await getPokemon(pokemon.url)
    })
  )

  return pokemones.filter(Boolean)
}

async function getPokemon(url: string) {
    const res = await fetch(
        url,
        { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data: PokemonDetailResponse = await res.json();
    return {
      name: data.name,
      image: data.sprites.front_default
    };
}




export default async function PokemonPage() {

    const pokemones = await getPokemons()

    return (
        <div className="grid  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 min-h-svh bg-slate-900/10">
          {pokemones.map((pokemon) => (
            <Link key={pokemon?.name} href={`/pokemones/${pokemon?.name}`} className="min-w-62.5 shrink-0 m-4">
                <div key={pokemon?.name} className=" text-center flex flex-col gap-2 justify-center bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow transform  hover:scale-105 duration-200">
                {pokemon?.image ? (
                    <div className="relative h-70 w-full overflow-hidden rounded-2xl">
                        <Image src={pokemon.image} alt={pokemon.name} fill className="p-4 object-cover rounded-4xl"/>
                    </div>
                ) : (
                    <span>Imagen no disponible</span>
                )}
                <h3 className='capitalize'>{pokemon?.name}</h3>
                </div>
            </Link>
          ))}
        </div>
    )
}
