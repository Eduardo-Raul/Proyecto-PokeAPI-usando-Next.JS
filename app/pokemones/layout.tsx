import Link from "next/link";

const pokemons = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
];



export default function PokemonLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="min-h-screen flex flex-col" >
          <nav className="w-full flex items-center justify-center bg-gray-800/75 p-4 gap-4 mb-1 sm:px-4 lg:px-8">
            <div className="flex flex-1 items-center sm:flex-col lg:flex-row lg:justify-center gap-2 sm:items-stretch sm:justify-start  ">
              {
                pokemons.map((pokemon) => (
                  <Link key={pokemon} href={`/pokemones/${pokemon}`} className="px-3 py-2 text-sm rounded-md bg-slate-700 text-white hover:bg-slate-600 transition">
                    {pokemon}
                  </Link>
                ))
              }
            </div>
          </nav>

          <div>
            {children}
          </div>

          <footer className="bg-gray-800 border-t">
            <div className="w-full mx-auto px-6 py-3 text-md text-gray-200 text-center ">
              {new Date().getFullYear()} Pokedex  - <Link href="https://pokeapi.co/" className="hover:underline">PokeAPI</Link>
            </div>
          </footer>
        </div>
  );
}
