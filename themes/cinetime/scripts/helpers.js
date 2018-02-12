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
			title = (site.data.categories[`${page.category}_Title`] ? site.data.categories[`${page.category}_Title`] : page.category + ' - ' + config.title);
		}
		else if (page.tag) {
			title = page.tag + ' | ' + config.title;
		}
		else {
			title = config.title + ' | ' + config.subtitle;
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

	if (site.data.categories[`${page.category}_Description`]) {
		return site.data.categories[`${page.category}_Description`]; 
	}
		
	if (page.description) {
		description = page.description;
	} else if (page.subtitle || page.author) {
		description = page.title + ", un " + site.data.metadata[categories] + " de " + page.author + ' disponible gratuitement sur ' + ' ' + config.title + ' ' + site.data.metadata.langue;
	} else {
		description = config.subtitle
	}
	return description;
});