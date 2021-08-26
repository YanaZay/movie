const APIURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c';
const IMGPATH = 'https://image.tmdb.org/t/p/w342';
const LOGO = document.querySelector('.logo');
const MAIN = document.querySelector('.main');
const MOVIES = document.querySelector('.movies');
const MAIN_TITLE = document.querySelector('.main__title');
const MOVIE__CONTAINER = document.querySelector('.movie__container');
let ALL__MOVIES;
let MOVIE__INFO = [];
const ACCOUNT__BUTTON = document.querySelector('.account__button');
const FAVORITE__BUTTON = document.querySelector('.favorite__button');

async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    respData.results.forEach( movie => {
        const movieElem = document.createElement('div');
        movieElem.classList = 'movie';
        movieElem.id = movie.id;
        movieElem.style.backgroundImage = `url(${IMGPATH + movie.poster_path})`;
        MOVIE__CONTAINER.insertAdjacentElement('beforeend', movieElem);

        movieElem.innerHTML = `
            <div class="movie__info">
                <h3 class="movie__title">${movie.original_title}</h3>
                <span class="movie__rating">${movie.vote_average}</span>
            </div>
        `
        MOVIE__INFO.push(movieElem.children[0])
    })
    ALL__MOVIES = respData;
    return respData;
}
getMovies()

MOVIES.addEventListener('click', (event) => {
    if (!event.target.classList.contains('movie__container')
        && !event.target.classList.contains('main__title')) {
        const currentId = +event.target.id;

        MOVIES.style.display = 'none';

        const currentMovie = ALL__MOVIES.results.find(movie => movie.id === currentId);

        MAIN.innerHTML = `
            <div class="current__back" style="background-image: url(${IMGPATH + currentMovie.backdrop_path})"></div>
            <div class="current__movie">
                <div class="current__poster">
                    <img src= ${IMGPATH + currentMovie.poster_path} alt="">
                </div>
                <div class="current__info">
                    <div class="current__title"><h2>${currentMovie.title}</h2></div>
                    <span class="current__score">Score: ${currentMovie.vote_average}</span>
                    <span class="current__release__date">Release date: ${currentMovie.release_date}</span>
                    <div class="current__overview">${currentMovie.overview}</div>
                </div>
            </div>
        `
    }
})

LOGO.addEventListener('click', () => {
    MOVIES.style.display = 'block';

    MAIN.innerHTML = '';
    MOVIE__CONTAINER.innerHTML = '';
    ALL__MOVIES.results.forEach( movie => {
        const movieElem = document.createElement('div');
        movieElem.classList = 'movie';
        movieElem.id = movie.id;
        movieElem.style.backgroundImage = `url(${IMGPATH + movie.poster_path})`;
        movieElem.innerHTML = `
            <div class="movie__info">
                <h3 class="movie__title">${movie.original_title}</h3>
                <span class="movie__rating">${movie.vote_average}</span>
            </div>
        `
        MOVIE__CONTAINER.insertAdjacentElement('beforeend', movieElem);
        MOVIES.insertAdjacentElement('beforeend', MOVIE__CONTAINER);
        MAIN.insertAdjacentElement('beforeend', MOVIES)
        MAIN.insertAdjacentElement('afterbegin', MAIN_TITLE)
    })
})

MOVIE__CONTAINER.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('movie')) {
        event.target.children[0].style.display = 'flex';
    }
})

MOVIE__CONTAINER.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('movie')) {
        event.target.children[0].style.display = 'none'
    }
})

ACCOUNT__BUTTON.addEventListener('click', () => {
    if (FAVORITE__BUTTON.style.display === 'block') {
        FAVORITE__BUTTON.style.display = 'none'
    } else (FAVORITE__BUTTON.style.display = 'block')
})


