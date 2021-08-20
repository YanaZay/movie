const APIURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c';
const IMGPATH = 'https://image.tmdb.org/t/p/w342';
const MAIN = document.querySelector('.main');
const MOVIES = document.querySelector('.movies');
const MOVIE__CONTAINER = document.querySelector('.movie__container');
let ALL__MOVIES;

async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData)

    respData.results.forEach( movie => {
        const movieElem = document.createElement('div');
        movieElem.classList = 'movie';
        movieElem.id = movie.id;
        movieElem.style.backgroundImage = `url(${IMGPATH + movie.poster_path})`;
        MOVIE__CONTAINER.insertAdjacentElement('beforeend', movieElem);

    })

    ALL__MOVIES = respData;
    console.log(ALL__MOVIES)
    return respData;
}
getMovies()

MOVIE__CONTAINER.addEventListener('mouseover', (event) => {
    if (!event.target.classList.contains('movie__container')) {
        for (let i = 0; i < MOVIE__CONTAINER.children.length; i++) {
            const currentElem = event.target;
            currentElem.style.opacity = 0.5;
        }
    }

})
MOVIE__CONTAINER.addEventListener('mouseout', (event) => {
    if (!event.target.classList.contains('movie__container')) {
        for (let i = 0; i < MOVIE__CONTAINER.children.length; i++) {
            const currentElem = event.target;
            currentElem.style.opacity = 1;
        }
    }
})


MOVIES.addEventListener('click', (event) => {
    if (!event.target.classList.contains('movie__container') && !event.target.classList.contains('main__title')) {
        const currentId = +event.target.id;
        console.log(currentId)

        MOVIES.style.display = 'none';

        const currentMovie = ALL__MOVIES.results.find(movie => movie.id === currentId);
        console.log(currentMovie)

        MAIN.style.backgroundImage = `url(${IMGPATH + currentMovie.backdrop_path})`;
        MAIN.innerHTML = `
            <div class="current__movie">
<!--                <div class="current__back" style="background-image: url('${IMGPATH + currentMovie.backdrop_path}')"></div>-->
                
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




