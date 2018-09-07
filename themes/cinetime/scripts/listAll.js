"use strict";

const path = require("path");
const querystring = require("querystring");

hexo.extend.tag.register('listMovies', site => {

  let allMovies = '';
  let categories = hexo.locals.get('categories')
  // console.log(hexo.model('Post').toArray())
  hexo.model('Post').toArray().forEach(movie => {
    if (typeof movie.categories.data[0] === 'undefined') return
    let categoryName = movie.categories.data[0].name; // Films || Documentaires || Dessins Animés
    if (categoryName !== 'Films') return
    if (typeof movie.title === 'undefined') return

    let originalTitle = typeof movie.original_title === 'undefined' ? '' : ` - (${movie.original_title})`;
    let author = typeof movie.author === 'undefined' ? '' : `Réalisé par <em>${movie.author}</em>.`;
    
    let release = new Date(`'${movie.release_date}'`);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = release.toLocaleDateString('fr-FR', options);
    let year = isNaN(release.getFullYear()) ? '' : `Sorti en ${release.getFullYear()}`;

    allMovies = allMovies + `
    <p> 
      <a href="/${movie.path}"> <strong> ${movie.title} </strong> </a> <em>${originalTitle}</em> 
      <br />
      <span class="font-weight-light"> 
      ${movie.synopsis}  
      <br />
      ${author} 
      ${year} 
      </span>
    </p>
    `;
  });

  return (`
  <div> ${allMovies}</div>
  `);
},{async: true});