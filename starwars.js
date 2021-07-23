// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import { play } from './music.js';
import { friendlyFetch } from './friendly-fetch.js';
import { toRoman } from './roman.js';
import { restartAnimation } from './restart-animation.js';

const API_ENDPOINT = 'https://swapi.dev/api'

const musicData = {
    audioUrl: "audio/tema-sw.mp3",
    coverImageUrl: "imgs/logo.svg",
    title: "intro",
    artist: "John Williams"
}

// Elementos estáticos da página
const movieListElement = document.querySelector('#filmes ul');
const movieIntroElement = document.querySelector('pre.introducao');

const handleEpisodeClick = (movie) => {
    const content = `Episode ${toRoman(movie.episode_id)}
    ${movie.title}
    
    ${movie.opening_crawl}
    `;

    movieIntroElement.innerHTML = content;
    restartAnimation(movieIntroElement);
}

const insereFilmeNaPagina = (movie) => {
    const movieElement = document.createElement('li')

    const episodeNumber = toRoman(movie.episode_id);
    const title = `Episode ${episodeNumber} - ${movie.title}`;

    movieElement.addEventListener('click', () => {
        handleEpisodeClick(movie);
    })

    const textElement = document.createElement('p');
    textElement.innerHTML = title;

    movieElement.appendChild(textElement);
    movieListElement.appendChild(movieElement);
}

const main = async () => {
    const filmsResponse = await friendlyFetch(`${API_ENDPOINT}/films`);
    const movies = filmsResponse.results;    

    movieListElement.innerHTML = '';
    Object.values(movies).forEach( insereFilmeNaPagina );
}

play(musicData, document.body);
main();