'use strict';
const util = require('hexo-util');

hexo.extend.generator.register('json-content', site => {

  var json = [];
  // Iterate through all posts in the site saving the wanted data in an array of objects.
  site.posts.forEach((post) => {
    var item = {
      // Default and custom variables
			title: post.title,
			author: post.author,
			img: post.img_name,
      url: post.permalink,
      tmdb_id: post.tmdb_id,
    };
    json.push(item);
  })

	return {
		path: 'content.json',
		data: JSON.stringify(json)
	}
})
