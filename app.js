
const API_KEY = 'api_key=73544e832df67201587a5a12705152b9';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main  = document.getElementById('main');
const form = document.getElementById('form');
const searchBar = document.getElementById('search');

function getMovis (url){

    fetch(url).then(res => res.json()).then(data =>{ //get the API data      
        showMovies(data.results); 
        // console.log(data.results);
    })

}
getMovis(API_URL);



 function showMovies(data){
    main.innerHTML = " ";
    data.forEach(movie => { 
        const {title,poster_path,vote_average,overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
        <img src="${IMAGE_BASE+poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overviw">
        <h3>Overview</h3>

           ${overview}
        </div>
        `

        main.appendChild(movieEl);

    })

 }

const getColor = (vote)=>{
    if(vote>=8){
        return 'green'
    }
    else if(vote>=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm = searchBar.value;
    if (searchTerm) {
        getMovis(SEARCH_URL+'&query='+searchTerm)
    }
    else{
        getMovis(API_URL);
    }
})

