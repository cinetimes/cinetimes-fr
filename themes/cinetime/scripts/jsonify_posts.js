'use strict';
const util = require('hexo-util');
const gaAnalytics = require("ga-analytics");

function getAnalyticsData() {
  gaAnalytics({
      dimensions: 'ga:pagePath',
      metrics: 'ga:pageviews',
      clientId: "478641186577-u9imt84nv881kkunp3iamgtmhcpat76j.apps.googleusercontent.com",
      serviceEmail: "hexo-popular-posts@subtle-display-148714.iam.gserviceaccount.com",
      key: "./google-services-private-key.pem",
      ids: "ga:123133649"
  }, function(err, res) {	
      if(err) console.log('error = ', err);
      console.log('response = ', res.rows);
      return res.rows;
  });
}

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
      // pageViews: 
    };
    json.push(item);
  })

	return {
		path: 'content.json',
		data: JSON.stringify(json)
	}
})
