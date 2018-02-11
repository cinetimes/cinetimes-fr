$(function () {

  var medias = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title', 'author'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: movies
  });

  $('#q .typeahead').typeahead({
    highlight: true,
    minLength: 1
  },
  {
    limit: 10,
    source: medias.ttAdapter(),
    display: 'title',
    templates: {
      // header: '<h3 class="league-name">NBA Teams</h3>',
      suggestion: Handlebars.compile(
        '<div><a href="{{url}}"> {{title}} – {{author}}</div></a>'
      )
    }
  });


  var input = document.getElementById("tmdb-search");
  // Let the filter be done by TMDB API.
  var awesomeplete = new Awesomplete(input);

  $('#tmdb-search').on('input', () => {
    let value = document.getElementById("tmdb-search").value;
    var request = new Request(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${value}&language=fr-FR&api_key=ef1989df4882fcb115198b492739c7d2`, {method: 'GET', mode: 'cors',})
  
    fetch(request)
    .then(res => res.json())
    .then(
      (result) => {

        var list = result.results.map((i) => {
          return [i.title, i.id];
          // return {label: i.title, value: i.id}
        });

        // Update the list to sort through
        awesomeplete.list = list
        // if the list contain less than five items, jsut show them all
        list.length > 5 || (awesomeplete.filter = function(text, input) {
           return true; 
          })
        awesomeplete.evaluate();
      },
      (error) => {
        console.log(error.message)
      }
    )
  });

  document.getElementById("tmdb-search").addEventListener("awesomplete-select", (event) => {
    console.log( event.text.label, event.text.value );
    // Select all inputs i want to fill
    var title = document.getElementById("input-title");
    var original_title = document.getElementById("input-original_title");
    var tmdb_id = document.getElementById("input-tmdb_id");
    var author = document.getElementById("input-author");
    var synopsis = document.getElementById("input-synopsis");
    var poster_path = document.getElementById("input-poster_path");
    var backdrop_path =document.getElementById("input-backdrop_path");
    var tags = document.getElementById("input-tags");
    var release_date = document.getElementById("input-release_date");
    
    var cast = document.getElementById("input-cast");
    var crew = document.getElementById("input-crew");
    var imdb_id = document.getElementById("input-imdb_id");
    var adult = document.getElementById("input-adult");

    fetch(`https://api.themoviedb.org/3/movie/${event.text.value}?api_key=ef1989df4882fcb115198b492739c7d2&language=fr-FR&append_to_response=credits`, {method:"GET"})
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        title.value = result.title;
        original_title.value = result.original_title;
        synopsis.value = result.overview;
        poster_path.value = `https://image.tmdb.org/t/p/original${result.poster_path}`;
        backdrop_path.value = `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
        author.value = result.credits.crew[0].name;
        release_date.value = result.release_date;
        tags.value = result.genres.map((genre) => {return genre.name});

        cast.value = result.credits.cast.map((actor) => { return actor.name }).slice(0, 5);
        crew.value = result.credits.crew.map((member) => { return member.name }).slice(0, 5);
        imdb_id.value = result.imdb_id;
        adult.value = result.adult;
      }
    )
  });
});

