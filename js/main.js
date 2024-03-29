$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

const API_LINK = 'http://www.omdbapi.com/?apikey=3cead811';

 getMovies = (searchText) =>{
  console.log(searchText);
   axios.get( API_LINK + '&s=' + searchText)
       .then((response) => {
         let movies = response.data.Search;
         let output = '';

         $.each(movies,(index, movie) => {
           output += `
            <div class="col-md-3">
                <div class="card  bg-secondary  text-center">
                    <img src="${movie.Poster}"> 
                    <h5>${movie.Title}</h5>
                    <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" >Movie Details</a>
                </div>
            </div>
           `;
         });

         $('#movies').html(output);
       })
       .catch((error) => {
         console.log(error);
       })
};

 movieSelected = (id) => {
   sessionStorage.setItem('movieId',id);
   window.location = 'movie.html';
   return false;
 };

 getMovie = () => {
   let movieId = sessionStorage.getItem('movieId');

   axios.get( API_LINK + '&i=' + movieId)
     .then((response) => {
       let movie = response.data;

       let output = `
        <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail"/>  
            </div>
            <div class="col-md-8">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
            </div>
        </div> 
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" target="_blank" class="btn btn-default">Go back to Search</a>
          </div>
        </div>
       `;
        $('#movie').html(output);
     })
     .catch((error) => {
       console.log(error);
     })
 }