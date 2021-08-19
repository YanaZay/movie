const APIURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c';
const IMGPATH = 'https://image.tmdb.org/t/p/w342';
const MOVIE__CONTAINER = document.querySelector('.movie__container');

async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData)

    respData.results.forEach( movie => {
        const movieElem = document.createElement('div');
        movieElem.classList = 'movie';
        movieElem.style.backgroundImage = `url(${IMGPATH + movie.poster_path})`;

        MOVIE__CONTAINER.insertAdjacentElement('beforeend', movieElem)
    })
    console.log(respData)

    return respData;
}
getMovies()

