const BASE = 'https://pokeapi.co/api/v2';


export const fetchPokemonPage = async (offset = 0, limit = 10) => {
const res = await fetch(`${BASE}/pokemon?offset=${offset}&limit=${limit}`);
if (!res.ok) throw new Error('Gagal mengambil daftar pokemon');
return res.json();
};


export const fetchPokemonDetailByUrl = async (url: string) => {
const res = await fetch(url);
if (!res.ok) throw new Error('Gagal mengambil detail pokemon');
return res.json();
};


export const fetchPokemonDetailByName = async (name: string) => {
const res = await fetch(`${BASE}/pokemon/${name.toLowerCase()}`);
if (!res.ok) throw new Error('Pokemon tidak ditemukan');
return res.json();
};