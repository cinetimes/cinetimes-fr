'use strict';

hexo.extend.helper.register('raw_link', function(path) {
    return 'https://github.com/cinetimes/cinetimes-fr/edit/source/source/' + path;
});

hexo.extend.helper.register('get_title', function (page, config, site) {
	var title = '';
	if (page.serp) {
		title = page.serp
	}
	else {
		if (page.title) {
			title = page.title + (page.author ? ' - ' + page.author + ' | ' + config.title : ' | ' + config.title);
		}
		else if (page.category) {
			title = (site.data.metadata[`${page.category}_Title`] ? site.data.metadata[`${page.category}_Title`] : page.category + ' - ' + config.title); 
		}
		else if (page.tag) {
			title = page.tag + ' - ' + config.title;
		}
		else {
			title = config.subtitle + ' - ' + config.title;
		}
	}
	return title;
});

hexo.extend.helper.register('get_description', function(page, config, site) {
	if (page.layout == "post") {
		var categories = [];
		page.categories.forEach(function (cat) {
			categories.push(cat.name);
		});
		categories = categories[0];
	}
	var description = '';

	if (site.data.metadata[`${page.category}_Description`]) {
		return site.data.metadata[`${page.category}_Description`]; 
	}
		
	if (page.description) {
		description = page.description;
	} else if (page.subtitle || page.author) {
		description = page.title + ", un " + site.data.metadata[categories] + " de " + page.author + ' disponible gratuitement sur ' + ' ' + config.title + ' ' + site.data.metadata.langue;
	} else {
		description = config.description;
	}
	return description;
});

hexo.extend.helper.register('get_latest_releases', (site, maxCount) => {
	var posts = []
	// Remove posts without release date from the array
	site.posts.forEach( post => {
		post.release_date === undefined 
		? '' 
		: posts.push(post) ;
	})

	// Return sorted array by release date and sliced
	return posts.sort((a,b) => {
		return new Date(b.release_date) - new Date(a.release_date)
	}).slice(0, maxCount);
});