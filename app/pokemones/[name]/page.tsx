import React from "react";

type PokemonApiResponse = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
};

interface PokemonProps {
  params: {
    name: string;
  };
}

export default async function PokemonPage(props: PokemonProps) {
  const { name } = await props.params;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="text-red-600 text-center p-6">
        Pokémon no encontrado.
      </div>
    );
  }

  const pokemon: PokemonApiResponse = await res.json();

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-3xl font-bold capitalize">
        {pokemon.name}
      </h2>

      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={`Imagen de ${pokemon.name}`}
          className="w-48 h-48 rounded-lg shadow-md"
        />
      )}

      <div className="bg-gray-800 text-white px-6 py-4 rounded-lg shadow-md space-y-1">
        <p>
          <span className="font-semibold">Altura:</span>{" "}
          {pokemon.height}
        </p>
        <p>
          <span className="font-semibold">Peso:</span>{" "}
          {pokemon.weight}
        </p>
      </div>
    </div>
  );
}
