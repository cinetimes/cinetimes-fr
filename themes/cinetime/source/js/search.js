$(function () {

  var medias = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title', 'author'),
    // datumTokenizer: Bloodhound.tokenizers.obj.whitespace('author'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // identify: function(obj) { return obj.title; },
    // prefetch: '/content.json'
    local: movies
  });
  // console.log('medias initialisated !');


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
  // },
  // {
  //
  // },
  // {
  });
});
