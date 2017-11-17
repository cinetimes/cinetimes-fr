(() => {

    var images = document.querySelectorAll('.card-img-top');

    if(!('IntersectionObserver' in window)) {
      images.forEach((image) => {
        image.setAttribute("src",image.getAttribute('data-src'));
      });
    } else {
      lazyLoadImages(images);
    }

})();

function lazyLoadImages(images) {
  var options = {
    rootMargin: "50px 20px",
    threshold: 0.01
  };

  var io = new IntersectionObserver((entries) => {

    entries.forEach(function(entry) {
      if(entry.intersectionRatio <= 0 ) return;
      // if(entry.target.hasAttribute("src")) return;
      entry.target.setAttribute("src",entry.target.getAttribute('data-src'));
      // console.log('src changed');
      io.unobserve(entry.target);
    });
    },options);

  images.forEach((image) => {
    io.observe(image);
  });


}
