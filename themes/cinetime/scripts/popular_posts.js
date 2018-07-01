'use strict';
const gaAnalytics = require("ga-analytics");
const _ = require('lodash');

// Send back the X most popular posts ordered by pageViews

function buildPopularPosts(pathAndViews, site) {
    var posts = [];
    site.posts.forEach((post) => {
        pathAndViews.forEach((pathAndView) => {
            // If the path fetched from GA match actual post path in loop
            if(pathAndView[0].includes(post.path)) {
                // Exclude blog posts and pages
                if (post.layout === 'post' ) {
                    posts.push({
                        title: post.title,
                        author: post.author,
                        img_name: post.img_name,
                        path: post.path,
                        viewCount: pathAndView[1]
                    })
                    // console.log(pathAndView[0], ' = ', post.path);
                    // console.log('viewCount: ', pathAndView[1]);
                }
            }
            // console.log(pathAndView[0], 'DO NOT MATCH', post.path)
        })
    })
    // Sort posts by viewCount
    let sortedPosts = posts.sort((a,b) => {
        return parseInt(b.viewCount) - parseInt(a.viewCount);
    }) 
    return sortedPosts;
}

// function getPopularPosts(site) {
//     return new Promise((resolve, reject) => {
//         gaAnalytics({
//             dimensions: 'ga:pagePath',
//             metrics: 'ga:pageviews',
//             clientId: "478641186577-u9imt84nv881kkunp3iamgtmhcpat76j.apps.googleusercontent.com",
//             serviceEmail: "hexo-popular-posts@subtle-display-148714.iam.gserviceaccount.com",
//             key: "./google-services-private-key.pem",
//             ids: "ga:123133649"
//         }, function(err, res) {	
//             if(err) console.log('error = ', err);
    
//             var response = res.rows;
//             // console.log('response = ', response);
//             var posts = buildPopularPosts(response, site);
//             // console.log(posts);
//             if (posts != undefined) {
//                 // console.log(posts);
//                 resolve(posts);
//             } else {
//                 reject(Error('Everything works against me :('));
//             }
//         });
//     });
// }

// var requestPopularPosts = (site) => {
//     var posts = undefined;
//     getPopularPosts(site).then(res => {
//         return res;
//     })
// }


hexo.extend.helper.register('build_popular_posts', buildPopularPosts);

hexo.extend.filter.register('after_init', () => {
    // Save in an environment variable the url and viewCount of posts
    return new Promise((resolve, reject) => {
        gaAnalytics({
            dimensions: 'ga:pagePath',
            metrics: 'ga:pageviews',
            clientId: "478641186577-u9imt84nv881kkunp3iamgtmhcpat76j.apps.googleusercontent.com",
            serviceEmail: "hexo-popular-posts@subtle-display-148714.iam.gserviceaccount.com",
            key: "./google-services-private-key.pem",
            ids: "ga:123133649"
        }, function(err, res) {	
            if(err) console.log('error = ', err);
    
            var response = res.rows;
            // console.log('response = ', response);
            // var posts = buildPopularPosts(response, this.site.data);
            // console.log(posts);
            if (response != undefined) {
                // console.log(posts);
                hexo.env.popularPosts = response;
                // console.log(hexo.env)
                resolve(response);
            } else {
                reject(Error('Everything works against me :('));
            }
        });
    });

}, {async: true});