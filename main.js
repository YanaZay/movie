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
        MOVIE__CONTAINER.insertAdjacentElement('beforeend', movieElem);

        // const movieTitle = document.createElement('div');
        // movieTitle.className = 'movie:hover';
        // movieTitle.innerHTML = movie.original_title;
        // movieTitle.style.display = 'none';
        // movieElem.insertAdjacentElement('beforeend', movieTitle);

    })

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

