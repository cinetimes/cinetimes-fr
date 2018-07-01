if('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/service-worker.js').then(function(registration){
			// Registration was successfull
			console.log('Service Worker registration was successfull with scope: ', registration.scope);
		}, function(err) {
			// Registration failed :<
			console.log('Service Worker registration failed: ', err);
		});
	});
}


// Lazy load images with the intersection observer
(() => {
	var images = document.querySelectorAll('.card-img-top, .lazy');

	if (!('IntersectionObserver' in window)) {
		images.forEach((image) => {
			image.setAttribute("src", image.getAttribute('data-src'));
		});
	} else {
		lazyLoadImages(images);
	}

})();

function lazyLoadImages(images) {
	var options = {
		rootMargin: "50px 100px",
		threshold: 0.01
	};

	var io = new IntersectionObserver((entries) => {

		entries.forEach(function (entry) {
			if (entry.intersectionRatio <= 0) return;
			// if(entry.target.hasAttribute("src")) return;
			entry.target.setAttribute("src", entry.target.getAttribute('data-src'));
			// console.log('src changed');
			io.unobserve(entry.target);
		});
	}, options);

	images.forEach((image) => {
		io.observe(image);
	});
}

// Google Anlaytics Events
(() => {
	// Play webtorrent video
	setTimeout(() => {
		document.querySelector("#video_webtorrent video").onplay = () => {
			console.log("Webtorrent event sent");
			ga('send', {
				hitType: 'event',
				eventCategory: 'Videos',
				eventAction: 'play',
				eventLabel: 'webtorrent'
			  });
		} 
	}, 5000)
})();


// Get country code from cloudflare server headers and do something accordingly
// function parseTrace(url){
//     let trace = [];
//     $.ajax(url,
//         {
//             success: function(response){
//                 let lines = response.split('\n');
//                 let keyValue;

//                 lines.forEach(function(line){
//                     keyValue = line.split('=');
//                     trace[keyValue[0]] = decodeURIComponent(keyValue[1] || '');

//                     if(keyValue[0] === 'loc' && trace['loc'] !== 'XX'){
//                         alert(trace['loc']);
//                     }

//                     if(keyValue[0] === 'ip'){
//                         alert(trace['ip']);
//                     }

//                 });

//                 return trace;
//             },
//             error: function(){
//                 return trace;
//             }
//         }
//     );
// };

// let cfTrace = parseTrace('/cdn-cgi/trace');