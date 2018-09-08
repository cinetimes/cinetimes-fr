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

function showToast(content = "succès", icon = null, error = false) {
	var toast = document.createElement('div');
	toast.id ='snackbar';
	if (icon !== null) {
		toast.innerHTML = icon + content
	} else {
		toast.textContent = content;
	}
	if (error) toast.style.backgroundColor = '#db3737';
	document.body.appendChild(toast);
	toast.className = "show";
	setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 5000);
}

// const submitComment = async (event) => {
// 	event.preventDefault();
// 	try {
// 		const response = await fetch('https://api.staticman.net/v2/entry/cinetimes/cinetimes-fr/source/comments', {
// 			method: 'POST',
// 			body:  event.target,
// 		});
// 		const result = await response.json();
// 		if (result.success !== true) {
// 			console.log(result)
// 			console.log(event.target.elements)
// 			return
// 		}
// 		showToast('Merci ! Votre commentaire apparaîtra bientôt sur le site');

// 	} catch(err) {
// 		console.log(err)
// 	}
// } 

$('#commentForm').submit(function () {
	var formData = $(this).serializeArray();
	var fieldsWithErrors = [];

	$(formData).each((function (index, element) {
		var required = $(this).find('[name="' + element.name + '"]').attr('required');
		var empty = (element.value.trim().length === 0);

		if (required && empty) {
			fieldsWithErrors.push(element.name);
		}
	}).bind(this));

	if (fieldsWithErrors.length === 0) {
		var postUrl = $(this).attr('action');
		var payload = $.param(formData);

		showToast('', '<i class="fas fa-spinner fa-spin"></i>');

		$.ajax({
			type: 'POST',
			url: postUrl,
			data: payload,
			success: function (response) {
				if (response.success) {
					showToast('Merci pour votre commentaire ! Il apparaîtra bientôt sur le site')
				} else {
					showToast('Oops! Une erreur s\'est produite. Réessayez dans un momment', null, true)
				}
			},
			error: function (response) {
				console.log('** ERROR!');
				console.log(response);
				showToast('Il faut remplir le formulaire...', null, true);
			}
		});

		$(this).get(0).reset();
	}
	// showToast('Il faut remplir le formulaire...', null, true);
	return false;
});


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