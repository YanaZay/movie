const APIURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c';
const IMGPATH = 'https://image.tmdb.org/t/p/w342';

async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData)

    // respData.results.forEach( movie => {
    //     const img = document.createElement('img');
    //     img.src = IMGPATH + movie.poster_path;
    //
    //     document.body.appendChild(img)
    // })

    return respData;
}
getMovies()

