import fetch from 'node-fetch';
import fs from 'fs';
import crypto from 'crypto';

const PUBLIC_KEY = 'afbe2d9e81034de9cb0699ada361d686';
const PRIVATE_KEY = '4831beb4ae9be490bc1d68aa6e0144bc091a5a36';
const ts = Date.now().toString();
const hash = crypto
  .createHash('md5')
  .update(ts + PRIVATE_KEY + PUBLIC_KEY)
  .digest('hex');

const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';
const LIMIT = 100;

async function fetchAllCharacters() {
  let allCharacters = [];
  let offset = 0;
  let total = null;

  console.log('⏳ Iniciando o download dos personagens...');

  while (total === null || offset < total) {
    const url = `${BASE_URL}?limit=${LIMIT}&offset=${offset}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    console.log(`📦 Buscando personagens... offset: ${offset}`);

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (!json.data) {
        console.error('❌ Erro na resposta da API:', json);
        break;
      }

      const { results, total: totalFromAPI } = json.data;

      if (total === null) {
        total = totalFromAPI;
      }

      allCharacters.push(...results);
      offset += LIMIT;

    } catch (err) {
      console.error('❌ Erro ao buscar os dados:', err);
      break;
    }
  }

  fs.writeFileSync('personagensMarvel.json', JSON.stringify(allCharacters, null, 2));
  console.log(`✅ Salvo com sucesso! Total: ${allCharacters.length} personagens.`);
}

fetchAllCharacters();
